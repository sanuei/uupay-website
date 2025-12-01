import { defineStore } from 'pinia'

export interface Announcement {
    id: string
    title: string
    excerpt: string
    category?: string
    content: string
    date: string
    author: string
    file: string
}

export const useAnnouncementStore = defineStore('announcement', {
    state: () => ({
        current: null as Announcement | null
    }),
    actions: {
        setCurrent(data: Announcement) {
            this.current = data
        },
        clearCurrent() {
            this.current = null
        }
    }
})
