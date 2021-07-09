const defaultImg = `/default-music.jpg`;

function bindPic(el: HTMLElement, binding: any): void {
  if (el.tagName !== 'IMG') return;
  el.setAttribute('src', defaultImg);
  if (!binding.value) {
    return;
  }
  let imgUrl: string;
  imgUrl = binding.value;
  let img = new Image();
  img.onload = function () {
    el.setAttribute('src', imgUrl);
    img.remove()
  };
  img.onerror = function () {
    el.setAttribute('src', defaultImg);
    img.remove()
  };
  img.src = imgUrl;
}

export default {
  // 指令是具有一组生命周期的钩子：
  // 在绑定元素的 attribute 或事件监听器被应用之前调用
  created(el: HTMLElement, binding: any) {
    bindPic(el, binding);
  },
  // 在绑定元素的父组件挂载之前调用
  beforeMount(el: HTMLElement, binding: any) { },
  // 绑定元素的父组件被挂载时调用
  mounted(el: HTMLElement, binding: any) { },
  // 在包含组件的 VNode 更新之前调用
  beforeUpdate(el: HTMLElement, binding: any) { },
  // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
  updated(el: HTMLElement, binding: any) {
    // bindPic(el, binding);
  },
  // 在绑定元素的父组件卸载之前调用
  beforeUnmount(el: HTMLElement, binding: any) { },
  // 卸载绑定元素的父组件时调用
  unmounted(el: HTMLElement, binding: any) { }
}