export interface NvidiaModel {
  id: string
  name: string
  provider: 'nvidia' | 'deepseek' | 'meta' | 'mistral' | 'google' | 'microsoft'
  type: 'chat' | 'vision' | 'embedding' | 'rerank' | 'folding'
  contextWindow: number
  description: string
  family?: string
}

export const NVIDIA_MODELS: NvidiaModel[] = [
  // --- CHAT / REASONING ---
  {
    id: 'deepseek-ai/deepseek-v3.2',
    name: 'DeepSeek v3.2 (685B)',
    provider: 'deepseek',
    type: 'chat',
    contextWindow: 128000,
    description: 'State-of-the-art 685B reasoning LLM with sparse attention and integrated agentic tools.',
  },
  {
    id: 'deepseek-ai/deepseek-r1-0528',
    name: 'DeepSeek R1 (Updated)',
    provider: 'deepseek',
    type: 'chat',
    contextWindow: 128000,
    description: 'Enhanced reasoning, coding, math, and reduced hallucination.',
  },
  {
    id: 'mistralai/mistral-large-3-675b-instruct-2512',
    name: 'Mistral Large 3 (675B)',
    provider: 'mistral',
    type: 'chat',
    contextWindow: 128000,
    description: 'General purpose MoE VLM ideal for chat, agentic and instruction based use cases.',
  },

  // --- CODING ---
  {
    id: 'qwen/qwen3-coder-480b-a35b-instruct',
    name: 'Qwen 3 Coder (480B)',
    provider: 'nvidia',
    type: 'chat',
    contextWindow: 262144, // 256k
    description: 'Excels in agentic coding and browser use, delivering top results.',
  },

  // --- VISION / MULTIMODAL ---
  {
    id: 'nvidia/nemotron-parse',
    name: 'Nemotron Parse',
    provider: 'nvidia',
    type: 'vision',
    contextWindow: 16000,
    description: 'Cutting-edge vision-language model exceling in retrieving text and metadata from images.',
  },
  {
    id: 'nvidia/cosmos-reason2-8b',
    name: 'Cosmos Reason 2',
    provider: 'nvidia',
    type: 'vision',
    contextWindow: 32000,
    description: 'Vision language model that excels in understanding the physical world using structured reasoning.',
  },

  // --- RAG / EMBEDDING ---
  {
    id: 'nvidia/llama-3_2-nemoretriever-300m-embed-v2',
    name: 'NemoRetriever Embed 300M',
    provider: 'nvidia',
    type: 'embedding',
    contextWindow: 8192,
    description: 'Multilingual, cross-lingual embedding model for long-document QA retrieval.'
  }
]

export const DEFAULT_CHAT_MODEL = 'mistralai/mistral-large-3-675b-instruct-2512'
export const CODING_MODEL = 'qwen/qwen3-coder-480b-a35b-instruct'
export const REASONING_MODEL = 'deepseek-ai/deepseek-v3.2'
export const VISION_MODEL = 'nvidia/nemotron-parse'
