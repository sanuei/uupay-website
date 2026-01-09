import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

export function useNavigation() {
    const router = useRouter()
    const { locale } = useI18n()

    const navigateTo = async (path: string, options?: { hash?: string }) => {
        const route = router.currentRoute.value
        await router.push({
            path: `/${locale.value}/${path}`,
            hash: options?.hash || route.hash,
            query: route.query
        })
    }

    const openExternal = (url: string) => {
        window.open(url, '_blank')
    }

    return {
        navigateTo,
        openExternal,
        // Common navigation helpers
        goToHome: () => navigateTo(''),
        goToAboutUs: () => navigateTo('about-us'),
        goToAnnouncements: () => navigateTo('announcements'),
        goToPromotion: () => navigateTo('promotion'),
        goToPartner: () => navigateTo('partner'),
        goToInvite: () => navigateTo('invite'),
    }
}
