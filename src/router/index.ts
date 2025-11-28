import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import i18n from '@/i18n'
import Home from '@/views/Home.vue'
import BlogList from '@/views/BlogList.vue'
import BlogDetail from '@/views/BlogDetail.vue'

const supportedLangs = ['zh-cn', 'en', 'zh-tw']

const routes: RouteRecordRaw[] = [
    {
        path: '/:lang(en|zh-cn|zh-tw)',
        children: [
            { path: '', name: 'Home', component: Home },
            { path: 'blog', name: 'BlogList', component: BlogList },
            { path: 'blog/:id', name: 'BlogDetail', component: BlogDetail },
            { path: 'register', name: 'Register', component: Home },
            { path: 'jump/:catchAll(.*)', name: 'Jump', component: Home }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: (to) => {
            const firstSegment = to.path.split('/')[1]
            if (supportedLangs.includes(firstSegment)) {
                return to.fullPath
            }
            return { path: '/zh-cn' + to.path, query: to.query }
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const langMap: Record<string, string> = {
    'zh-cn': 'zh-cn',
    'en': 'en',
    'zh-tw': 'zhtw'
}

router.beforeEach((to, _from, next) => {
    const lang = to.params.lang as string
    if (lang && langMap[lang]) {
        i18n.global.locale.value = langMap[lang]
    }
    next()
})

export default router
