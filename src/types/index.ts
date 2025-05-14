export interface ReviewItem {
    words: string
    name: string
    title: string
    avatar: string
}

export interface ExploreItem {
    title: string
    desc: string
    icon: string
}

export interface FeatureItem {
    images: {
        back: string
        front: string
    }
    imageStyles: {
        container: string
        front: string
    }
    title: string
    content: string
    reverse: boolean
}