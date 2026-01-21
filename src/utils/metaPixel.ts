export const MetaPixel = {
    // 注册事件
    registration() {
        window.fbq?.('track', 'CompleteRegistration');
    },

    // 下载事件
    download() {
        window.fbq?.('track', 'InstallApp',);
    },
};
