import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useScroll(
    featureRef: Ref<HTMLElement | null>,
    exploreRef: Ref<HTMLElement | null>,
    contactRef: Ref<HTMLElement | null>
) {
    const isFeature = ref(false)
    const isExplore = ref(false)
    const isContact = ref(false)

    const checkScroll = () => {
        if (!featureRef.value || !exploreRef.value || !contactRef.value) return

        try {
            const featureTop = featureRef.value.getBoundingClientRect().top
            const exploreTop = exploreRef.value.getBoundingClientRect().top
            const contactTop = contactRef.value.getBoundingClientRect().top
            const featureDistance = Math.abs(featureTop)
            const exploreDistance = Math.abs(exploreTop)
            const contactDistance = Math.abs(contactTop)

            if (featureDistance < exploreDistance) {
                isFeature.value = false
                isExplore.value = true
            } else if (exploreDistance < contactDistance) {
                isExplore.value = false
                isContact.value = true
            } else {
                isFeature.value = false
                isExplore.value = true
            }
        } catch (error) {
            console.error('Error in checkScroll:', error)
        }
    }

    onMounted(() => {
        checkScroll()
        window.addEventListener('scroll', checkScroll)
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', checkScroll)
    })

    return {
        isFeature,
        isExplore,
        isContact
    }
}