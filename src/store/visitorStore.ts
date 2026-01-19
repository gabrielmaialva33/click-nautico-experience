import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type VisitorRole = 'visitor' | 'student' | 'tourist' | 'admin'

export interface VisitorState {
  visitorId: string
  name: string | null
  role: VisitorRole
  context: {
    lastSection: string
    sessionCount: number
    lastVisit: number
  }

  // Actions
  setName: (name: string) => void
  setRole: (role: VisitorRole) => void
  updateContext: (context: Partial<VisitorState['context']>) => void
  incrementSession: () => void
}

const generateId = () => Math.random().toString(36).substring(2, 9)

export const useVisitorStore = create<VisitorState>()(
  persist(
    (set) => ({
      visitorId: generateId(), // Will be overwritten by persisted value if exists
      name: null,
      role: 'visitor',
      context: {
        lastSection: 'home',
        sessionCount: 0, // Will be incremented on hydration
        lastVisit: Date.now(),
      },

      setName: (name) => set({ name }),
      setRole: (role) => set({ role }),
      updateContext: (newContext) =>
        set((state) => ({
          context: { ...state.context, ...newContext }
        })),

      incrementSession: () =>
        set((state) => ({
          context: {
            ...state.context,
            sessionCount: state.context.sessionCount + 1,
            lastVisit: Date.now()
          }
        }))
    }),
    {
      name: 'click-nautico-visitor-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        // Increment session count on load
        state?.incrementSession()
      }
    }
  )
)
