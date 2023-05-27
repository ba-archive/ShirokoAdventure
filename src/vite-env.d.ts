/// <reference types="vite/client" />
/* eslint-disable @typescript-eslint/no-explicit-any */

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-explicit-any
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface UnityModule {
  canvas: HTMLCanvasElement;

  print(e: any): void;
  SetFullscreen(setState: 0 | 1):  void;

  [key: string]: any;
}

interface UnityInstance {
  SetFullscreen: (setState: 0 | 1) => void;
  SendMessage: (objectName: string, methodName: string, value: any) => void;
  Quit: () => Promise<void>;
  Module: UnityModule;  
}

declare interface Window {
  webkitConvertPointFromNodeToPage?: any;
  unityInstance?: UnityInstance;
  mozIndexedDB?: IDBFactory;
  webkitIndexedDB?: IDBFactory;
  msIndexedDB?: IDBFactory;
}
