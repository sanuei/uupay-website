import { useHead } from '@vueuse/head'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

const langs = ['ar','de','en','es','fr','ja','ko','pt','th','tr','zh-cn','zh-tw']

const pathMap: Record<string, string> = {
    '/zh-cn': '',
    '/zh-cn/promotion': '/promotion',
    '/zh-cn/partner': '/partner',
    '/zh-cn/about-us': '/about-us',
    '/zh-cn/announcements': '/announcements',
    '/zh-cn/blog': '/blog',
    '/zh-cn/register': '/register'
}

export function useHreflang(route: RouteLocationNormalizedLoaded) {
    const relativePath = pathMap[route.path] ?? ''

    const links = langs.map(lang => ({
        rel: 'alternate',
        hreflang: lang,
        href: `https://uupay.com/${lang}${relativePath}`
    }))

    links.push({
        rel: 'alternate',
        hreflang: 'x-default',
        href: 'https://uupay.com/'
    })

    useHead({ link: links })
}
