import { ref } from "vue";

export function applyHook(unity: UnityInstance) {
  const fn = unity.SetFullscreen;
  const c = unity.Module;
  
  
  
  unity.SetFullscreen = async (state: 0 | 1) => {
    // if (c.SetFullscreen) {
    //   return c.SetFullscreen.apply(c, [state]);
    // } 
    // c.print("Failed to set Fullscreen mode: Player not loaded yet.")
    const wrapper = document.querySelector("#canvas-wrapper")! as any;
    if (state == 1) {
      const fullscreen: HTMLElement["requestFullscreen"] = wrapper.requestFullscreen 
        || wrapper.mozRequestFullscreen
        || wrapper.webkitRequestFullscreen
        || wrapper.msRequestFullscreen;
      try {
        await fullscreen.apply(wrapper);
      } catch (error) {
        console.error("全屏失败，改用存在问题的unity自带全屏", error)
        c.SetFullscreen.apply(c, [state]);
      }      
    } else {
      await document.exitFullscreen();
    }

  }
}