<script setup lang="ts"></script>

<template>
  <div class="landscape-tip-container">
    <div class="title">请将屏幕旋转至横屏状态游玩</div>
    <svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 64 64"
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="-4.24"
          y1="7.76"
          x2="56.24"
          y2="68.24"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#ededed" />
          <stop offset="1" stop-color="#ebebeb" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="4"
          y1="44"
          x2="60"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#6da3f2" />
          <stop offset="1" stop-color="#3f88f2" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-3"
          x1="8.89"
          y1="3.65"
          x2="31.53"
          y2="26.29"
          xlink:href="#linear-gradient-2"
        />
        <linearGradient
          id="linear-gradient-4"
          x1="41"
          y1="12.33"
          x2="61.66"
          y2="12.33"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#ebebeb" />
          <stop offset="1" stop-color="#ebebeb" />
        </linearGradient>
      </defs>
      <path
        class="cls-1"
        d="m0,6v52c0,3.31,2.69,6,6,6h52c3.31,0,6-2.69,6-6v-28c0-3.31-2.69-6-6-6h-18V6c0-3.31-2.69-6-6-6H6C2.69,0,0,2.69,0,6h0Z"
      />
      <path
        class="cls-4"
        d="m58,28c1.1,0,2,.9,2,2v4.08h-3c-1.1,0-2,.9-2,2v15.84c0,1.1.9,2,2,2h3v4.08c0,1.1-.9,2-2,2H6c-1.1,0-2-.9-2-2v-28c0-1.1.9-2,2-2h52Z"
      />
      <path
        class="cls-2"
        d="m10.08,4v3c0,1.1.9,2,2,2h15.84c1.1,0,2-.9,2-2v-3h4.08c1.1,0,2,.9,2,2v18H6c-.68,0-1.36.12-2,.35V6c0-1.1.9-2,2-2h4.08Z"
      />
      <path
        class="cls-3"
        d="m48.73,14.6c-.31.36-.48.82-.48,1.3,0,.58.25,1.14.69,1.52l5,4.27c.84.72,2.1.62,2.82-.22,0,0,0,0,0,0l4.24-4.98c.82-.74.89-2,.15-2.82-.74-.82-2-.89-2.82-.15-.12.11-.23.23-.32.37l-1,1.19c-.73-7.17-6.79-12.62-14-12.58-1.1,0-2,.9-2,2s.9,2,2,2c5.19-.02,9.54,3.94,10,9.11l-1.43-1.23c-.83-.72-2.1-.64-2.82.2,0,0-.01.01-.02.02Z"
      />
    </svg>
    <div class="tip">若旋转后提示依然没有消失，请确保已关闭手机旋转方向锁定</div>
  </div>
</template>

<style scoped lang="scss">
.landscape-tip-container {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  z-index: 256;
  background-color: rgba(8, 8, 8, 0.7);
  width: 100vw;
  width: 100dvw;
  height: 100vh;
  height: 100dvh;
  color: #fff;

  .title {
    font-weight: bold;
    font-size: 1.5rem;
  }

  svg {
    width: 128px;
    max-width: calc(100vw - 20px);

    .cls-1 {
      fill: url(#linear-gradient);
    }
    .cls-2 {
      fill: url(#linear-gradient-3);
    }
    .cls-3 {
      fill: url(#linear-gradient-4);
    }
    .cls-4 {
      fill: url(#linear-gradient-2);
    }
  }
}
</style>
