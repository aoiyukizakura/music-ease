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
  created(el: HTMLElement, binding: any) {
    bindPic(el, binding);
  }
}