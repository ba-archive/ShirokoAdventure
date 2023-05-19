/// <reference types="vite/client" />
/* eslint-disable @typescript-eslint/no-explicit-any */

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-explicit-any
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare interface Window {
  webkitConvertPointFromNodeToPage?: any;
  unityInstance?: {
    SetFullscreen: (setState: 0 | 1) => void;
    SendMessage: (objectName: string, methodName: string, value: any) => void;
    Quit: () => Promise<void>;
  };
}
