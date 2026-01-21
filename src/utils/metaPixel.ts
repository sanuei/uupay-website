export const MetaPixel = {
    // 注册事件
    registration() {
        if (window.fbq) {
            window.fbq('track', 'CompleteRegistration');
        }
    },

    // 下载事件
    download() {
        if (window.fbq) {
            window.fbq('track', 'InstallApp',);
        }
    },
};
