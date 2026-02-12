import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import i18n from '@/i18n'
import Home from '@/views/Home.vue'
import BlogList from '@/views/BlogList.vue'
import BlogDetail from '@/views/BlogDetail.vue'
import WebAnnouncement from '@/views/WebAnnouncement.vue'
import WebAnnouncementDetail from '@/views/WebAnnouncementDetail.vue'
import InvitePage from '@/views/InvitePage.vue'
import AboutUs from '@/views/AboutUs.vue'
import PartnerPage from '@/views/PartnerPage.vue'
import PromotionPage from '@/views/PromotionPage.vue'
import { LANGUAGES } from '@/config/languages'
import type { RouteLocationNormalized } from 'vue-router'

export const catchAllRedirect = (to: RouteLocationNormalized, systemLang: string) => {
    const supportedLangs = Object.values(LANGUAGES).map(lang => lang.key.toLowerCase());

    let langCode = 'zh-cn';

    const matchedLang = Object.values(LANGUAGES).find(lang =>
        lang.range.some(r => r.toLowerCase() === systemLang.toLowerCase())
    );

    if (matchedLang) {
        langCode = matchedLang.key.toLowerCase();
    } else {
        const shortLang = systemLang.slice(0, 2).toLowerCase();
        if (supportedLangs.includes(shortLang)) {
            langCode = shortLang;
        }
    }

    if (langCode === 'zh') {
        if (systemLang.toLowerCase().includes('tw') || systemLang.toLowerCase().includes('hk')) {
            langCode = 'zh-tw';
        } else {
            langCode = 'zh-cn';
        }
    }

    const firstSegment = to.path.split('/')[1]?.toLowerCase();
    if (firstSegment && supportedLangs.includes(firstSegment)) {
        return to.fullPath;
    }

    return { path: `/${langCode}${to.path}`, query: to.query };
};

// 根据 UA 检测设备类型，移动端使用 PhoneLayout，桌面端使用 WebLayout
const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)

const routes: RouteRecordRaw[] = [
    {
        path: '/:lang(en|zh-cn|zh-tw|th|pt|es|tr|fr|ja|ko|de|ar)',
        component: () => isMobile
            ? import('@/views/PhoneLayout.vue')
            : import('@/views/WebLayout.vue'),
        children: [
            { path: '', name: 'Home', component: Home },
            { path: 'web', name: 'WebPage', component: () => import('@/views/DeviceWrapper.vue') },
            { path: 'announcements', name: 'Announcement', component: WebAnnouncement },
            { path: 'announcements/:id', name: 'AnnouncementDetail', component: WebAnnouncementDetail },
            { path: 'blog', name: 'BlogList', component: BlogList },
            { path: 'blog/:id', name: 'BlogDetail', component: BlogDetail },
            { path: 'register', name: 'Register', component: Home },
            { path: 'jump/:catchAll(.*)', name: 'Jump', component: Home },
            { path: 'invitePage', name: 'InvitePage', component: InvitePage },
            { path: 'about-us', name: 'AboutUs', component: AboutUs },
            { path: 'partner', name: 'PartnerPage', component: PartnerPage },
            { path: 'promotion', name: 'PromotionPage', component: PromotionPage },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: (to) => catchAllRedirect(to as RouteLocationNormalized, navigator.language)
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const langMap: Record<string, string> = {
    'zh-cn': 'zh-cn',
    'en': 'en',
    'zh-tw': 'zh-tw',
    'th': 'th',
    'pt': 'pt',
    'es': 'es',
    'tr': 'tr',
    'fr': 'fr',
    'ja': 'ja',
    'ko': 'ko',
    'de': 'de',
    'ar': 'ar',
}

router.beforeEach((to, _from, next) => {
    const lang = to.params.lang as string
    if (lang && langMap[lang]) {
        (i18n.global.locale as any).value = langMap[lang]
    }
    next()
})

export default router
