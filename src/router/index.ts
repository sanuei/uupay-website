// src/router.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { h, defineComponent } from 'vue'
import { Header, HeaderWeb } from '@/components'
import { useDevice } from '@/composables/useDevice'
import i18n from '@/i18n'
import BlogList from '@/components/BlogList.vue'
import BlogDetail from '@/components/BlogDetail.vue'

const HeaderWrapper = defineComponent({
    setup() {
        const { isMobile } = useDevice()
        return () => h(isMobile.value ? Header : HeaderWeb)
    }
})

const routes: RouteRecordRaw[] = [
    {
        path: '/:lang(en|zh-cn|zh-tw)',
        component: { template: '<router-view />' },
        children: [
            { path: '', name: 'Home', component: HeaderWrapper },
            { path: 'blog', name: 'BlogList', component: BlogList },
            { path: 'blog/:slug', name: 'BlogDetail', component: BlogDetail, props: true }
        ]
    },
    { path: '/:pathMatch(.*)*', redirect: '/zh-cn' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 路由守卫：切换 i18n 语言
const langMap: Record<string, string> = {
    'zh-cn': 'zh-cn',
    'en': 'en',
    'zh-tw': 'zhtw' // i18n 使用 zhtw
}

router.beforeEach((to, _from, next) => {
    const lang = to.params.lang as string
    if (!['zh-cn', 'en', 'zh-tw'].includes(lang)) {
        return next('/zh-cn')
    }

    // 切换 i18n 语言
    i18n.global.locale.value = langMap[lang]
    next()
})

export default router
