export enum LanguageEnum {
    ENUS = 'en',
    ZHCN = 'zh-cn',
    ZHTW = 'zh-tw',
    THTH = 'th',
    JAJP = 'ja',
    KOKR = 'ko',
    DEDE = 'de',
    ARSA = 'ar',
    PTPT = 'pt',
    ESES = 'es',
    TRTR = 'tr',
    FRFR = 'fr'
}

export interface LanguageInterface {
    label: string
    key: LanguageEnum
    range: string[]
}

export const LANGUAGES: {
    [key in LanguageEnum]: LanguageInterface
} = {
    [LanguageEnum.ENUS]: { label: 'English', key: LanguageEnum.ENUS, range: ['en-US','en'] },
    [LanguageEnum.ZHCN]: { label: '简体中文', key: LanguageEnum.ZHCN, range: ['zh-CN','zh-Hans','wuu-Hans','yue-Hans','Hans'] },
    [LanguageEnum.ZHTW]: { label: '繁體中文', key: LanguageEnum.ZHTW, range: ['zh-TW','zh-Hant','yue-Hant','Hant'] },
    [LanguageEnum.THTH]: { label: 'ภาษาไทย', key: LanguageEnum.THTH, range: ['th-TH','th'] },
    [LanguageEnum.JAJP]: { label: '日本語', key: LanguageEnum.JAJP, range: ['ja-JP','ja'] },
    [LanguageEnum.KOKR]: { label: '한국어', key: LanguageEnum.KOKR, range: ['ko-KR','ko'] },
    [LanguageEnum.DEDE]: { label: 'Deutsch', key: LanguageEnum.DEDE, range: ['de-DE','de'] },
    [LanguageEnum.ARSA]: { label: 'العربية', key: LanguageEnum.ARSA, range: ['ar-SA','ar'] },
    [LanguageEnum.PTPT]: { label: 'Português', key: LanguageEnum.PTPT, range: ['pt-PT','pt'] },
    [LanguageEnum.ESES]: { label: 'Español', key: LanguageEnum.ESES, range: ['es-ES','es'] },
    [LanguageEnum.TRTR]: { label: 'Türkçe', key: LanguageEnum.TRTR, range: ['tr-TR','tr'] },
    [LanguageEnum.FRFR]: { label: 'Français', key: LanguageEnum.FRFR, range: ['fr-FR','fr-CA','fr'] },
}
