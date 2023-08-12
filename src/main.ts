import { createApp } from 'vue';
import './styles.scss';
// @ts-ignore
import App from './App.vue';
import isMobile from 'ismobilejs';

console.log('build ' + import.meta.env?.__BUILD_TIME__);

if ('production' === import.meta.env.MODE){
  // alert('游戏尚在测试中，当前品质不代表正式上线质量，请勿外传');
}

const container = document.querySelector('#unity-container') as HTMLDivElement;
const canvas = document.querySelector('#unity-canvas') as HTMLCanvasElement;
const loadingBar = document.querySelector(
  '#unity-loading-bar'
) as HTMLDivElement;
const progressBarFull = document.querySelector(
  '#unity-progress-bar-full'
) as HTMLDivElement;
const fullscreenButton = document.querySelector(
  '#unity-fullscreen-button'
) as HTMLDivElement;
const loadingPercentage = document.querySelector(
  '#loading-percentage'
) as HTMLDivElement;

const buildUrl = 'Build';
const loaderUrl = buildUrl + '/ShirokoAdventrue.loader.js';
const config = {
  dataUrl: buildUrl + '/ShirokoAdventrue.data.unityweb',
  frameworkUrl: buildUrl + '/ShirokoAdventrue.framework.js.unityweb',
  codeUrl: buildUrl + '/ShirokoAdventrue.wasm.unityweb',
  streamingAssetsUrl: 'StreamingAssets',
  companyName: 'CopperArchive',
  productName: 'ShirokoAdventureInKivotos',
  productVersion: '0.1',
};

// By default Unity keeps WebGL canvas render target size matched with
// the DOM size of the canvas element (scaled by window.devicePixelRatio)
// Set this to false if you want to decouple this synchronization from
// happening inside the engine, and you would instead like to size up
// the canvas DOM size and WebGL render target sizes yourself.
// config.matchWebGLToCanvasSize = false;

if (isMobile(navigator).any) {
  // Mobile device style: fill the whole browser client area with the game canvas:

  const meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'initial-scale=1.0, user-scalable=no';
  document.getElementsByTagName('head')[0].appendChild(meta);
  container.className = 'unity-mobile';
  canvas.className = 'unity-mobile';
  fullscreenButton.classList.add('unity-mobile');

  if (isMobile(navigator).apple.phone) {
    fullscreenButton.style.display = 'none';
  }

  // To lower canvas resolution on mobile devices to gain some
  // performance, uncomment the following line:
  // config.devicePixelRatio = 1;
} else {
  // Desktop style: Render the game canvas in a window that can be maximized to fullscreen:
  // canvas.style.width = "1280px";
  // canvas.style.height = "720px";
}

function resetUnityIndexedDB() {
  const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;
  if (indexedDB) {
    indexedDB.databases().then(databases => {
      console.log(databases);
    });
    indexedDB.deleteDatabase('/idbfs');
  }
}

const script = document.createElement('script');
script.src = loaderUrl;
script.onload = () => {
  createUnityInstance(canvas, config, (progress: number) => {
    progressBarFull.style.width = 100 * progress + '%';
    if (progress - 0.89 <= 0) {
      loadingPercentage.innerText = (progress * 100).toFixed(2) + '%';
    } else {
      loadingPercentage.innerText = '正在解析游戏资源……';
      loadingPercentage.classList.add('no-after');
    }
  })
    .then((unityInstance: Window['unityInstance']) => {
      loadingBar.style.display = 'none';
      window.unityInstance = unityInstance;
      fullscreenButton.onclick = () => {
        unityInstance?.SetFullscreen(1);
      };
    })
    .catch((message: string) => {
      console.error(message);
      const result = confirm(
        `游戏在运行中遇到错误。\n点击取消以继续运行，如您多次遇到错误，请点击确定以清除游戏数据来修复问题。`
      );
      if (result) {
        const confirmClear = prompt(
          '是否清除游戏数据？已有的游戏进度将会完全丢失。\n输入“确定”二字并点击确认按钮以清除。',
          ''
        );
        if (confirmClear === '确定') {
          resetUnityIndexedDB();
          location.reload();
        }
      }
    });
};

document.body.appendChild(script);

createApp(App).mount('#app');
