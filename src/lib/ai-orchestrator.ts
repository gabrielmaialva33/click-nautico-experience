import { streamNvidiaChat, type NvidiaMessage, type Locale } from './ai'
import { NVIDIA_MODELS } from './nvidia-models'

export type Intent = 'general' | 'coding' | 'reasoning' | 'vision' | 'biology'

// The "Router" model - fast and efficient
const ROUTER_MODEL = 'nvidia/llama-3.1-nemotron-nano-4b-v1.1'

export class AIOrchestrator {

  constructor(private locale: Locale) { }

  /**
   * Determines the intent of the user message using a fast 4B model.
   * If there's an image attachment, it defaults to 'vision'.
   */
  async classifyIntent(message: string, hasAttachments: boolean): Promise<Intent> {
    if (hasAttachments) return 'vision'

    // Fast heuristic for code to save a round trip for obvious cases
    if (message.match(/(code|function|bug|error|typescript|react|python|fix)/i)) {
      return 'coding'
    }

    // Use lightweight model for nuanced routing
    try {
      const routingSystem: NvidiaMessage = {
        role: 'system',
        content: `Classify the user intent into one of: 'general', 'coding', 'reasoning', 'biology'.
        - 'coding': Software development, bugs, scripts.
        - 'reasoning': Math, logic puzzles, complex analysis.
        - 'biology': Protein folding, DNA, medical.
        - 'general': Everything else (chat, greetings, facts).

        Return ONLY the category name. Lowercase.`
      }

      const response = await this.quickCall([routingSystem, { role: 'user', content: message }])
      const intent = response.trim().toLowerCase()

      if (['general', 'coding', 'reasoning', 'biology'].includes(intent)) {
        return intent as Intent
      }
      return 'general'
    } catch (e) {
      console.warn('Router model failed, defaulting to general', e)
      return 'general'
    }
  }

  /**
   * Selects the best model ID based on intent.
   */
  selectModel(intent: Intent): string {
    switch (intent) {
      case 'coding':
        return 'qwen/qwen2.5-coder-32b-instruct'
      case 'reasoning':
        return 'deepseek-ai/deepseek-r1' // or 'nvidia/llama-3.3-nemotron-super-49b-v1.5'
      case 'vision':
        return 'nvidia/nemotron-parse' // or 'nvidia/nemotron-nano-12b-v2-vl'
      case 'biology':
        return 'nvidia/llama-3.3-nemotron-super-49b-v1.5' // Use super for bio context unless specific folding model needed
      case 'general':
      default:
        // The big gun for general chat
        return 'nvidia/llama-3.3-nemotron-super-49b-v1.5'
    }
  }

  async getModelForIntent(intent: Intent) {
    const id = this.selectModel(intent)
    return NVIDIA_MODELS.find(m => m.id === id) || NVIDIA_MODELS[0]
  }

  /**
   * Helper for non-streaming calls (used by Router)
   */
  private async quickCall(messages: NvidiaMessage[]): Promise<string> {
    let result = ''
    try {
      const generator = streamNvidiaChat(messages, this.locale, ROUTER_MODEL)
      for await (const chunk of generator) {
        result += chunk
      }
    } catch (error) {
      console.error('Quick call error:', error)
      throw error // Let caller handle fallback
    }
    return result
  }

  /**
   * Main execution method that handles streaming, model selection, and Visitor Context injection.
   */
  async *executeWithContext(
    intent: Intent,
    messages: NvidiaMessage[],
    visitorContext?: any
  ): AsyncGenerator<string, void, unknown> {
    const modelId = this.selectModel(intent)

    // Inject Visitor Context if present
    const contextPrompt = visitorContext ? `
    [VISITOR CONTEXT]
    Name: ${visitorContext.name || 'Unknown'}
    Role: ${visitorContext.role}
    Sessions: ${visitorContext.context.sessionCount}
    Last Section: ${visitorContext.context.lastSection}

    [INSTRUCTIONS]
    - If the user introduces themselves, reply normally BUT include this tag at the end: [SAVE_NAME: Full Name]
    - If the user says they are a student/tourist, include: [SAVE_ROLE: student|tourist]
    - Personalize based on their role/name (e.g. "Welcome back, Gabriel!").
    - Be concise and helpful.
    ` : ''

    // Patch the system message if it exists, otherwise add one
    const systemMessageIndex = messages.findIndex(m => m.role === 'system')
    if (systemMessageIndex !== -1) {
      messages[systemMessageIndex].content += `\n${contextPrompt}`
    } else {
      messages.unshift({
        role: 'system',
        content: `You are the Click Náutico AI Assistant. ${contextPrompt}`
      })
    }

    const generator = streamNvidiaChat(messages, this.locale, modelId)
    for await (const chunk of generator) {
      yield chunk
    }
  }

  /**
   * Parses the AI response for client-side tool triggers.
   * Returns cleaned text (hidden tags removed) and a list of actions.
   */
  processClientTools(response: string): { cleanedResponse: string, actions: any[] } {
    let text = response
    const actions: any[] = []

    // Regex for [SAVE_NAME: ...]
    const nameMatch = text.match(/\[SAVE_NAME:\s*(.*?)\]/)
    if (nameMatch) {
      actions.push({ type: 'SAVE_NAME', payload: nameMatch[1].trim() })
      text = text.replace(nameMatch[0], '')
    }

    // Regex for [SAVE_ROLE: ...]
    const roleMatch = text.match(/\[SAVE_ROLE:\s*(.*?)\]/)
    if (roleMatch) {
      actions.push({ type: 'SAVE_ROLE', payload: roleMatch[1].trim().toLowerCase() })
      text = text.replace(roleMatch[0], '')
    }

    return { cleanedResponse: text, actions }
  }
}
