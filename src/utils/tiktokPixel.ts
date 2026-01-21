export const TiktokPixel = {
    // 注册事件
    registration() {
        window.ttq?.track('CompleteRegistration')
    },

    // 下载事件
    download() {
        window.ttq?.track('InstallApp')
    },
};
