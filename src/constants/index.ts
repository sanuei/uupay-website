import type { ReviewItem, ExploreItem, FeatureItem } from '@/types'

import icon1 from '@/assets/images/explore-icon-1.svg'
import icon2 from '@/assets/images/explore-icon-2.svg'
import icon3 from '@/assets/images/explore-icon-3.svg'
import icon4 from '@/assets/images/explore-icon-4.svg'
import icon5 from '@/assets/images/explore-icon-5.svg'

import picture1 from '@/assets/images/yibao.jpeg'
import picture2 from '@/assets/images/lulu.jpeg'
import picture3 from '@/assets/images/yiyi.png'

import featureSet1Back from '@/assets/images/feature-set1-back.png'
import featureSet1Front from '@/assets/images/feature-set1-front.png'
import featureSet2Back from '@/assets/images/feature-set2-back.png'
import featureSet2Front from '@/assets/images/feature-set2-front.png'
import featureSet3Back from '@/assets/images/feature-set3-back.png'
import featureSet3Front from '@/assets/images/feature-set3-front.png'
import featureSet4Back from '@/assets/images/feature-set4-back.png'
import featureSet4Front from '@/assets/images/feature-set4-front.png'

export const EXPLORE_ITEMS: ExploreItem[] = [
    { title: '📲 多样消息功能，社交更自由', desc: '消息自由操控：支持撤回、删除、编辑、转发、收藏、阅后即焚等操作，让你随心所欲管理每一条消息，沟通无后顾之忧。', icon: icon1 },
    { title: '⚙️ 个性化定制，打造专属于你的聊天空间', desc: '聊天背景定制：根据心情与喜好，随时更换聊天背景，让每次对话都充满个性与独特力。', icon: icon2 },
    { title: '🌍 朋友圈动态，分享生活点滴', desc: '发布动态，记录精彩：分享你的心情、照片或日常，与朋友们共同记录生活中的美好瞬间。', icon: icon3 },
    { title: '💰 内置钱包，智能支付管理', desc: '充值与提现：支持支付宝、微信、银行卡等多种支付方式，充值、提现操作简单快捷，资金管理无忧。', icon: icon4 },
    { title: '💬 阅后即焚——信息掌控随心所欲', desc: '聊天背景定制：根据心情与喜好，随时更换聊天背景，让每次对话都充满个性与独特魅力。', icon: icon5 }
]

export const REVIEW_ITEMS: ReviewItem[] = [
    { words: '超好用的！又简单，和其他的很大不同。家人和朋友都喜欢用这', name: '周伊伊', title: '销售', avatar: picture3 },
    { words: '它易于使用，又简单的设计，可以轻松的和朋友一起聊天。没有任何麻烦。', name: '宝易', title: '空姐', avatar: picture1 },
    { words: '家人和朋友都喜欢用这。', name: '露露', title: '牙科实习生', avatar: picture2 }
]

export const DOWNLINK = import.meta.env.VITE_DOWNLOAD

export const CONTACTUS = import.meta.env.VITE_CONTACTUS

export const APPNAME = import.meta.env.VITE_NAME

export const API_URL = import.meta.env.VITE_URL

export const FEATURE_ITEMS: FeatureItem[] = [
    {
        images: {
            back: featureSet1Back,
            front: featureSet1Front
        },
        imageStyles: {
            container: 'w-full',
            front: 'absolute top-[1%] left-[19%] w-[63%]'
        },
        title: '高效便捷，无所不能的社交工具',
        content: '小巧轻便，强大功能：有得聊超低体积，轻松下载，占用内存极少，但绝不妥协于强大功能，助你享受无负担、极速流畅的使用体验。',
        reverse: false
    },
    {
        images: {
            back: featureSet2Back,
            front: featureSet2Front
        },
        imageStyles: {
            container: 'w-[80%] sm:w-[68%]',
            front: 'absolute right-[2%] w-[50%] sm:w-fit sm:right-[14%] bottom-0'
        },
        title: '完全隐私保护，安全沟通无忧',
        content: '在有得聊，我们对每一条消息进行高级加密保护，确保你所有的聊天记录、文件和数据绝对安全。隐私保护从每个细节做起，让你无论在工作、生活或私人场合，都能享受最严密的保护。',
        reverse: true
    },
    {
        images: {
            back: featureSet3Back,
            front: featureSet3Front
        },
        imageStyles: {
            container: 'w-full',
            front: 'absolute top-[9%] left-[26%] w-[40%]'
        },
        title: '高清语音与视频通话，打破距离限制',
        content: '一对一语音/视频通话：流畅清晰，享受高清语音和稳定视频通话，让你随时与朋友、同事面对面沟通，零距离感受每一个瞬间。',
        reverse: false
    },
    {
        images: {
            back: featureSet4Back,
            front: featureSet4Front
        },
        imageStyles: {
            container: 'w-[71%]',
            front: 'absolute bottom-[9%] right-[10%] w-[64%]'
        },
        title: '智能群组管理，沟通更高效',
        content: '群组管理全能：不仅可以设置群公告、群二维码，还支持群震、禁言、踢人、更换群主等多种权限，确保群组管理井然有序。',
        reverse: true
    }
]
