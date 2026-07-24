// eSIM 区块的 3D 地球 (three.js)
// - 点阵大陆 (从 land-mask 采样, 可识别的真实海陆轮廓)
// - 城市之间的发光飞线弧 (彗星式流动动画)
// - 城市脉冲光点 + 声呐扩散环
// - 大气层辉光 + 边缘 fresnel
// 整个模块被 ESIMSection.astro 动态 import(), 只有滚到视口才加载, 不拖首屏 LCP。

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Group,
  SphereGeometry,
  Mesh,
  ShaderMaterial,
  AdditiveBlending,
  NormalBlending,
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  Vector3,
  MathUtils,
  CatmullRomCurve3,
  TubeGeometry,
  Clock,
} from 'three';

const DEG2RAD = Math.PI / 180;
const BRAND = new Vector3(0.722, 0.89, 0.318); // #B8E351 归一化

// 经纬度 → 单位球面坐标 (右手系, y 轴为南北极)
function latLonToVec3(lat: number, lon: number, r = 1): Vector3 {
  const phi = (90 - lat) * DEG2RAD;
  const theta = (lon + 180) * DEG2RAD;
  return new Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

// 全球主要城市 (呼应 "eSIM 全球覆盖"), 顺序被下面的航线引用
const CITIES: Array<[number, number]> = [
  [22.3193, 114.1694], // 0 香港
  [1.3521, 103.8198],  // 1 新加坡
  [35.6762, 139.6503], // 2 东京
  [51.5072, -0.1276],  // 3 伦敦
  [40.7128, -74.006],  // 4 纽约
  [25.2048, 55.2708],  // 5 迪拜
  [-33.8688, 151.2093],// 6 悉尼
  [-23.5505, -46.6333],// 7 圣保罗
  [-26.2041, 28.0473], // 8 约翰内斯堡
  [13.7563, 100.5018], // 9 曼谷
  [37.7749, -122.4194],// 10 旧金山
  [19.076, 72.8777],   // 11 孟买
];

// 航线 (城市索引对) — 以香港/新加坡/迪拜为枢纽的一张全球网
const ROUTES: Array<[number, number]> = [
  [0, 2], [0, 4], [0, 5], [0, 6], [0, 3],
  [1, 5], [1, 6], [1, 11],
  [5, 3], [5, 8],
  [4, 7], [3, 10], [2, 10], [9, 11],
];

export interface GlobeHandle {
  dispose: () => void;
}

export async function initEsimGlobe(canvas: HTMLCanvasElement): Promise<GlobeHandle> {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- 采样 land-mask 得到海陆数据 (water=白, land=黑) ----
  const landPixels = await loadLandMask('/images/land-mask.png');

  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  // 相机拉远一点, 让整颗球 + 大气辉光四周都留出余量, 避免辉光被画布边缘硬裁
  const camera = new PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0, 4.0);

  // 地球组 (统一自转 + 拖拽)
  const globe = new Group();
  globe.rotation.y = -Math.PI * 0.15;
  globe.rotation.x = 0.28;
  scene.add(globe);

  // ---- 1. 暗色实心球 (遮挡背面点, 制造纵深) ----
  const oceanMat = new ShaderMaterial({
    uniforms: { uColor: { value: new Vector3(0.043, 0.055, 0.043) }, uRim: { value: BRAND } },
    vertexShader: `
      varying vec3 vN; varying vec3 vW;
      void main(){
        vN = normalize(mat3(modelMatrix) * normal);
        vW = (modelMatrix * vec4(position,1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }`,
    fragmentShader: `
      uniform vec3 uColor; uniform vec3 uRim;
      varying vec3 vN; varying vec3 vW;
      void main(){
        vec3 v = normalize(cameraPosition - vW);
        float f = pow(1.0 - clamp(dot(vN, v), 0.0, 1.0), 3.0);
        vec3 col = mix(uColor, uRim, f * 0.5);
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  const ocean = new Mesh(new SphereGeometry(0.992, 64, 64), oceanMat);
  globe.add(ocean);

  // ---- 2. 点阵大陆 ----
  const dots = buildLandDots(landPixels);
  globe.add(dots.points);

  // ---- 飞线弧 (彗星流动) ----
  const arcMats: ShaderMaterial[] = [];
  ROUTES.forEach(([a, b], i) => {
    const start = latLonToVec3(CITIES[a][0], CITIES[a][1]);
    const end = latLonToVec3(CITIES[b][0], CITIES[b][1]);
    const curve = greatCircleArc(start, end);
    const geo = new TubeGeometry(curve, 64, 0.006, 8, false);
    const mat = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: BRAND },
        uOffset: { value: Math.random() },
        uSpeed: { value: 0.22 + Math.random() * 0.12 },
      },
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
      vertexShader: `
        varying float vF;
        void main(){
          vF = uv.x;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }`,
      fragmentShader: `
        uniform float uTime; uniform vec3 uColor; uniform float uOffset; uniform float uSpeed;
        varying float vF;
        void main(){
          float head = fract(uTime * uSpeed + uOffset);
          float diff = head - vF; if(diff < 0.0) diff += 1.0;
          float comet = smoothstep(0.32, 0.0, diff);   // 头亮尾淡
          float base = 0.14;                            // 全线微亮
          float a = max(base, comet);
          vec3 col = uColor * (0.55 + comet * 1.7);
          gl_FragColor = vec4(col, a);
        }`,
    });
    arcMats.push(mat);
    globe.add(new Mesh(geo, mat));
  });

  // ---- 5. 城市光点 + 声呐扩散环 ----
  const cityPos: number[] = [];
  const cityPhase: number[] = [];
  CITIES.forEach((c, i) => {
    const p = latLonToVec3(c[0], c[1], 1.004);
    cityPos.push(p.x, p.y, p.z);
    cityPhase.push(i / CITIES.length);
  });

  const markerGeo = new BufferGeometry();
  markerGeo.setAttribute('position', new Float32BufferAttribute(cityPos, 3));
  markerGeo.setAttribute('aPhase', new Float32BufferAttribute(cityPhase, 1));
  const markerMat = new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uColor: { value: BRAND }, uPix: { value: 1 } },
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
    vertexShader: `
      attribute float aPhase; uniform float uTime; uniform float uPix;
      varying float vPulse;
      void main(){
        float t = fract(uTime * 0.5 + aPhase);
        vPulse = t;
        vec4 mv = modelViewMatrix * vec4(position,1.0);
        gl_PointSize = (7.0 + 3.0 * sin(uTime*2.0 + aPhase*6.28)) * uPix * (2.6 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uColor; varying float vPulse;
      void main(){
        float d = distance(gl_PointCoord, vec2(0.5));
        if(d > 0.5) discard;
        float core = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(uColor, core);
      }`,
  });
  const markers = new Points(markerGeo, markerMat);
  globe.add(markers);

  // 声呐扩散环: 复用城市坐标, 尺寸随周期变大、透明度淡出
  const ringMat = new ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uColor: { value: BRAND }, uPix: { value: 1 } },
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
    vertexShader: `
      attribute float aPhase; uniform float uTime; uniform float uPix;
      varying float vT;
      void main(){
        float t = fract(uTime * 0.5 + aPhase);
        vT = t;
        vec4 mv = modelViewMatrix * vec4(position,1.0);
        gl_PointSize = (10.0 + t * 46.0) * uPix * (2.6 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uColor; varying float vT;
      void main(){
        float d = distance(gl_PointCoord, vec2(0.5));
        float ring = smoothstep(0.5, 0.42, d) * smoothstep(0.30, 0.42, d);
        float fade = 1.0 - vT;
        gl_FragColor = vec4(uColor, ring * fade * 0.6);
      }`,
  });
  const rings = new Points(markerGeo.clone(), ringMat);
  globe.add(rings);

  // ---- 尺寸 / DPR ----
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  const resize = () => {
    const w = canvas.clientWidth || canvas.offsetWidth;
    const h = canvas.clientHeight || canvas.offsetHeight;
    if (!w || !h) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    (dots.material.uniforms.uPix.value as number) = dpr;
    (markerMat.uniforms.uPix.value as number) = dpr;
    (ringMat.uniforms.uPix.value as number) = dpr;
  };
  resize();
  window.addEventListener('resize', resize);

  // ---- 拖拽转动 ----
  let dragging = false;
  let lastX = 0;
  let velY = 0;
  const onDown = (e: PointerEvent) => { dragging = true; lastX = e.clientX; canvas.style.cursor = 'grabbing'; };
  const onMove = (e: PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastX; lastX = e.clientX;
    globe.rotation.y += dx * 0.005;
    velY = dx * 0.005;
  };
  const onUp = () => { dragging = false; canvas.style.cursor = 'grab'; };
  canvas.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointerleave', onUp);

  // ---- 渲染循环 (仅在可见时跑, 省电) ----
  const clock = new Clock();
  let visible = true;
  let raf = 0;

  const frame = () => {
    const t = clock.getElapsedTime();
    if (!prefersReducedMotion) {
      if (!dragging) {
        globe.rotation.y += 0.0012 + velY * 0.02;
        velY *= 0.94;
      }
      globe.position.y = Math.sin(t * 0.6) * 0.015; // 轻微上下浮动
      arcMats.forEach((m) => { (m.uniforms.uTime.value as number) = t; });
      (markerMat.uniforms.uTime.value as number) = t;
      (ringMat.uniforms.uTime.value as number) = t;
    }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };

  // 离开视口 / 切后台时暂停
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      visible = en.isIntersecting;
      if (visible && !raf) { clock.start(); raf = requestAnimationFrame(frame); }
      else if (!visible && raf) { cancelAnimationFrame(raf); raf = 0; }
    });
  }, { threshold: 0 });
  io.observe(canvas);

  const onVisibility = () => {
    if (document.hidden && raf) { cancelAnimationFrame(raf); raf = 0; }
    else if (!document.hidden && visible && !raf) { raf = requestAnimationFrame(frame); }
  };
  document.addEventListener('visibilitychange', onVisibility);

  raf = requestAnimationFrame(frame);
  canvas.style.cursor = 'grab';
  requestAnimationFrame(() => { canvas.style.opacity = '1'; });

  return {
    dispose() {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('visibilitychange', onVisibility);
      renderer.dispose();
    },
  };
}

// ---------- 辅助 ----------

// 加载 land-mask, 返回一个 (lon,lat)->是否陆地 的判定闭包所需的像素数据
interface LandData { w: number; h: number; data: Uint8ClampedArray; }

function loadLandMask(src: string): Promise<LandData> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = img.width; c.height = img.height;
      const ctx = c.getContext('2d', { willReadFrequently: true });
      if (!ctx) return reject(new Error('no 2d ctx'));
      ctx.drawImage(img, 0, 0);
      const { data } = ctx.getImageData(0, 0, img.width, img.height);
      resolve({ w: img.width, h: img.height, data });
    };
    img.onerror = () => reject(new Error('land-mask load failed'));
    img.src = src;
  });
}

// 逐经纬网格采样, 陆地处放点; 用 cos(lat) 概率抽稀, 避免两极过密
function buildLandDots(land: LandData): { points: Points; material: ShaderMaterial } {
  const positions: number[] = [];
  const step = 0.9;           // 经纬步进 (度) — 越小越密
  for (let lat = -84; lat <= 84; lat += step) {
    const rowKeep = Math.cos(lat * DEG2RAD);        // 高纬抽稀
    for (let lon = -180; lon < 180; lon += step) {
      // 采样 mask: water=白(亮), land=黑(暗)
      const u = (lon + 180) / 360;
      const v = (90 - lat) / 180;
      const px = Math.min(land.w - 1, (u * land.w) | 0);
      const py = Math.min(land.h - 1, (v * land.h) | 0);
      const idx = (py * land.w + px) * 4;
      const bright = (land.data[idx] + land.data[idx + 1] + land.data[idx + 2]) / (3 * 255);
      if (bright > 0.45) continue;                  // 亮=海洋, 跳过
      if (Math.random() > rowKeep) continue;
      const p = latLonToVec3(lat, lon, 1.0);
      positions.push(p.x, p.y, p.z);
    }
  }

  const geo = new BufferGeometry();
  geo.setAttribute('position', new Float32BufferAttribute(positions, 3));

  const material = new ShaderMaterial({
    uniforms: { uColor: { value: BRAND }, uPix: { value: 1 }, uSize: { value: 2.6 } },
    transparent: true,
    blending: NormalBlending,   // 用普通混合 + 深度, 让 ocean 球遮挡背面点
    vertexShader: `
      uniform float uPix; uniform float uSize;
      varying float vFacing;
      void main(){
        vec3 nWorld = normalize(mat3(modelMatrix) * normalize(position));
        vec3 wPos = (modelMatrix * vec4(position,1.0)).xyz;
        vFacing = dot(nWorld, normalize(cameraPosition - wPos));
        vec4 mv = modelViewMatrix * vec4(position,1.0);
        gl_PointSize = uSize * uPix * (2.6 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vFacing;
      void main(){
        float d = distance(gl_PointCoord, vec2(0.5));
        if(d > 0.5) discard;
        float soft = smoothstep(0.5, 0.1, d);
        float face = smoothstep(-0.15, 0.25, vFacing);   // 边缘/背面淡出
        float a = soft * (0.35 + face * 0.65);
        if(a < 0.02) discard;
        gl_FragColor = vec4(uColor * (0.75 + face * 0.35), a);
      }`,
  });

  return { points: new Points(geo, material), material };
}

// 两点间大圆弧: 中点沿法向抬升, 用 CatmullRom 平滑
function greatCircleArc(start: Vector3, end: Vector3): CatmullRomCurve3 {
  const pts: Vector3[] = [];
  const segs = 24;
  const dist = start.distanceTo(end);
  const lift = 0.18 + dist * 0.22;   // 距离越远弧越高
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const v = new Vector3().copy(start).lerp(end, t).normalize();
    const h = 1 + Math.sin(Math.PI * t) * lift;
    v.multiplyScalar(h);
    pts.push(v);
  }
  return new CatmullRomCurve3(pts);
}
