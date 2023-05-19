import { createApp } from 'vue';
import './styles.scss';
// @ts-ignore
import App from './App.vue';
import isMobile from 'ismobilejs';

const container = document.querySelector("#unity-container") as HTMLDivElement;
const canvas = document.querySelector("#unity-canvas") as HTMLCanvasElement;
const loadingBar = document.querySelector("#unity-loading-bar") as HTMLDivElement;
const progressBarFull = document.querySelector("#unity-progress-bar-full") as HTMLDivElement;
const fullscreenButton = document.querySelector("#unity-fullscreen-button") as HTMLDivElement;
const loadingPercentage = document.querySelector("#loading-percentage") as HTMLDivElement;

const buildUrl = "/Build";
const loaderUrl = buildUrl + "/ShirokoAdventrue.loader.js";
const config = {
  dataUrl: buildUrl + "/ShirokoAdventrue.data.unityweb",
  frameworkUrl: buildUrl + "/ShirokoAdventrue.framework.js.unityweb",
  codeUrl: buildUrl + "/ShirokoAdventrue.wasm.unityweb",
  streamingAssetsUrl: "StreamingAssets",
  companyName: "CopperArchive",
  productName: "ShirokoAdventureInKivotos",
  productVersion: "0.1",
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
  container.className = "unity-mobile";
  canvas.className = "unity-mobile";
  fullscreenButton.className = "unity-mobile";

  // To lower canvas resolution on mobile devices to gain some
  // performance, uncomment the following line:
  // config.devicePixelRatio = 1;
} else {
  // Desktop style: Render the game canvas in a window that can be maximized to fullscreen:
  // canvas.style.width = "1280px";
  // canvas.style.height = "720px";
}

loadingBar.style.display = "block";

const script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
  createUnityInstance(canvas, config, (progress: number) => {
    progressBarFull.style.width = 100 * progress + "%";
    if (progress - 0.89 <= 0) {
      loadingPercentage.innerText = (progress * 100).toFixed(2) + "%";
    } else {
      loadingPercentage.innerText = "正在解析游戏资源……";
    }
  }).then((unityInstance) => {
    loadingBar.style.display = "none";
    loadingPercentage.style.display = "none";
    window.unityInstance = unityInstance;
    fullscreenButton.onclick = () => {
      unityInstance.SetFullscreen(1);
    };
  }).catch((message) => {
    alert(message);
  });
};
document.body.appendChild(script);

createApp(App).mount('#app');
