export {}

declare global {
    interface Window {
        // Meta Pixel
        fbq?: (...args: any[]) => void
        _fbq?: unknown

        // TikTok Pixel
        ttq?: {
            load: (pixelId: string) => void
            page: () => void
            track: (event: string, params?: Record<string, any>) => void
            push?: (...args: any[]) => void
            methods?: string[]
            setAndDefer?: (target: any, method: string) => void
        }

        TiktokAnalyticsObject?: string
    }

    interface FbqFunction {
        (...args: any[]): void
        callMethod?: (...args: any[]) => void
        queue?: any[]
        loaded?: boolean
        version?: string
        push?: (...args: any[]) => void
    }
}
