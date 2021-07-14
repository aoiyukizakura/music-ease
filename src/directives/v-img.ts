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

function lazyLoad(el: HTMLElement, binding: any): void {
  if (el.tagName !== 'IMG') return;
  el.setAttribute('src', defaultImg);
  el.setAttribute('data-src', binding.value);
  const observer = new IntersectionObserver(e => {
    e.forEach(e => {
      if (e.isIntersecting) {
        const src = (e.target as HTMLElement).dataset.src;
        if (src) {
          e.target.setAttribute('src', src);
        }
        observer.unobserve(el);
      }
    })
  })
  observer.observe(el);
}

export default {
  created(el: HTMLElement, binding: any) {
    if (binding.modifiers.lazy) {
      lazyLoad(el, binding);
    } else {
      bindPic(el, binding);
    }
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