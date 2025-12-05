import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import i18n from '@/i18n'
import Home from '@/views/Home.vue'
import BlogList from '@/views/BlogList.vue'
import BlogDetail from '@/views/BlogDetail.vue'
import WebAnnouncement from '@/views/WebAnnouncement.vue'
import WebAnnouncementDetail from '@/views/WebAnnouncementDetail.vue'
import InvitePage from '@/views/InvitePage.vue'

const supportedLangs = ['zh-cn', 'en', 'zh-tw']
const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

const routes: RouteRecordRaw[] = [
    {
        path: '/:lang(en|zh-cn|zh-tw)',
        component: () => {
            return isMobile
                ? import('@/views/PhoneLayout.vue')
                : import('@/views/WebLayout.vue')
        },
        children: [
            { path: '', name: 'Home', component: Home },
            { path: 'web', name: 'WebPage', component: () => import('@/views/DeviceWrapper.vue') },
            { path: 'announcement', name: 'Announcement', component: WebAnnouncement },
            { path: 'announcement/:id', name: 'AnnouncementDetail', component: WebAnnouncementDetail },
            { path: 'blog', name: 'BlogList', component: BlogList },
            { path: 'blog/:id', name: 'BlogDetail', component: BlogDetail },
            { path: 'register', name: 'Register', component: Home },
            { path: 'jump/:catchAll(.*)', name: 'Jump', component: Home },
            { path: 'invitePage', name: 'InvitePage', component: InvitePage },
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
