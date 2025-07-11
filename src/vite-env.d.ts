/// <reference types="vite/client" />
export {}

declare global {
  interface Window {
    scBotHandler?: {
      expand: (options?: { message?: string }) => void
      collapse: () => void
      enable: () => void
      disable: () => void
    }
  }
}