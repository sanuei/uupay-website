import MobileDetect from 'mobile-detect';

export const getCaptchaTypeBasedOnOS = () => {
  const userAgent = navigator.userAgent;
  const md = new MobileDetect(userAgent);
  const os = md.os();
  return os == 'AndroidOS' ? 'clickWord' : 'clickWord';  //可选择用blockPuzzle滑动模块
};
