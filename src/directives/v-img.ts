const defaultImg = `/default-music.jpg`;

export default {
  created(el: HTMLElement, binding: any) {
    if (el.tagName !== 'IMG') return;
    el.setAttribute('src', defaultImg);
    if (!binding.value) return;

    el.onerror = function () {
      el.setAttribute('src', defaultImg);
      el.onerror = null;
    }

    if (binding.modifiers.lazy) {
      el.setAttribute('data-src', binding.value);
      new IntersectionObserver((e, t) => {
        e.forEach(e => {
          if (e.isIntersecting) {
            el.setAttribute("src", el.getAttribute("data-src") || defaultImg)
            el.setAttribute('data-src', '');
            t.unobserve(el);
          }
        })
      }).observe(el);
    } else {
      el.setAttribute("src", binding.value)
    }
  },
  beforeMount(el: HTMLElement, binding: any) { },
  mounted(el: HTMLElement, binding: any) { },
  unmounted(el: HTMLElement, binding: any) {
    el.onerror = null;
  }
}