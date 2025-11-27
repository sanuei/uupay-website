import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import i18n from '@/i18n'
import Home from '@/views/Home.vue'
import BlogList from '@/views/BlogList.vue'
import BlogDetail from '@/views/BlogDetail.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/:lang(en|zh-cn|zh-tw)',
        children: [
            { path: '', name: 'Home', component: Home },
            { path: 'blog', name: 'BlogList', component: BlogList },
            { path: 'blog/:id', name: 'BlogDetail', component: BlogDetail }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/zh-cn'
    }
]

const router = createRouter({
    history: createWebHashHistory(),
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

    i18n.global.locale.value = langMap[lang]
    next()
})

export default router
