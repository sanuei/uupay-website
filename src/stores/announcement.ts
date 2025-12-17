// stores/announcement.ts
import { defineStore } from 'pinia'

const fallbackAnnouncementsData = [
    {
        "id": "welcome-to-uupay-2025",
        "title": "欢迎使用 UUPAY 数字支付平台",
        "excerpt": "感谢您选择 UUPAY！我们致力于为全球用户提供安全、快捷的数字支付解决方案。本文将介绍 UUPAY 的核心功能和使用指南。",
        "category": "news",
        "date": "2025-01-15",
        "author": "UUPAY 团队",
        "file": "welcome-to-uupay-2025.md"
    },
    {
        "id": "new-virtual-card-feature",
        "title": "全新虚拟卡功能上线",
        "excerpt": "我们很高兴地宣布，UUPAY 虚拟卡功能正式上线！用户现在可以即时创建虚拟卡，用于在线支付和订阅服务。",
        "category": "feature",
        "date": "2025-01-10",
        "author": "产品团队",
        "file": "new-virtual-card-feature.md"
    },
    {
        "id": "security-update-202501",
        "title": "重要安全更新通知",
        "excerpt": "为了保护您的账户安全，我们将在 2025 年 1 月 20 日进行系统安全升级。本次更新将增强多重身份验证机制。",
        "category": "security",
        "date": "2025-01-08",
        "author": "安全团队",
        "file": "security-update-202501.md"
    },
    {
        "id": "multi-currency-support",
        "title": "多币种结算功能升级",
        "excerpt": "UUPAY 现在支持 50+ 种法定货币和主流加密货币的自动换汇功能，让您的跨境支付更加便捷。",
        "category": "update",
        "date": "2025-01-05",
        "author": "技术团队",
        "file": "multi-currency-support.md"
    },
    {
        "id": "scheduled-maintenance-jan-2025",
        "title": "系统维护通知 - 2025年1月",
        "excerpt": "为了提供更好的服务，我们将在 2025 年 1 月 25 日凌晨 2:00-4:00 (UTC+8) 进行系统维护，期间部分功能可能暂时不可用。",
        "category": "maintenance",
        "date": "2025-01-03",
        "author": "运维团队",
        "file": "scheduled-maintenance-jan-2025.md"
    }
    ]

export const useAnnouncementStore = defineStore('announcement', {
    state: () => ({
        list: [] as any[],
        current: null as any | null,
    }),

    actions: {
        async loadList() {
            if (this.list.length) return

            try {
                const res = await fetch('/announcements/announcements.json')
                if (!res.ok) throw new Error('Load failed')
                this.list = await res.json()
            } catch (e) {
                console.warn('⚠️ 使用 fallback 公告数据')
                this.list = fallbackAnnouncementsData
            }
        },

        async loadById(id: string) {
            if (!this.list.length) {
                await this.loadList()
            }

            const found = this.list.find(a => a.id === id)
            if (found) {
                this.current = found
                return
            }

            this.current = null
        },

        setCurrent(data: any) {
            this.current = data
        },
    },
})
