var e;import{c as t,a as s,D as l,h as a,b as r,u as n,r as i,o,d as u,e as c,w as d,f as h,g as m,v as p,i as v,j as g,k as f,l as y,m as _,n as k,p as w,q as b,t as x,F as T,s as I,x as P,T as E,y as L,z as A,A as S,B as N,C as j,E as D,G as O,K as $,S as U,H as C,I as B,J as F,L as V}from"./vendor.e1762ece.js";let M;const q={},R=function(e,t){if(!t)return e();if(void 0===M){const e=document.createElement("link").relList;M=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in q)return;q[e]=!0;const t=e.endsWith(".css"),s=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${s}`))return;const l=document.createElement("link");return l.rel=t?"stylesheet":M,t||(l.as="script",l.crossOrigin=""),l.href=e,document.head.appendChild(l),t?new Promise(((e,t)=>{l.addEventListener("load",e),l.addEventListener("error",t)})):void 0}))).then((()=>e()))},z=[{path:"/",name:"home",component:()=>R((()=>import("./index.2ca6926f.js")),["/music-ease/assets/index.2ca6926f.js","/music-ease/assets/playlist.f712b38f.js","/music-ease/assets/cover.vue_vue_type_script_setup_true_lang.2dfc415e.js","/music-ease/assets/vendor.e1762ece.js"]),meta:{}},{path:"/library",name:"library",component:()=>R((()=>import("./index.a224c77d.js")),["/music-ease/assets/index.a224c77d.js","/music-ease/assets/index.ea6817e6.css","/music-ease/assets/vendor.e1762ece.js","/music-ease/assets/index.d.0906a426.js","/music-ease/assets/cover.vue_vue_type_script_setup_true_lang.2dfc415e.js"]),meta:{}},{path:"/search",name:"search",component:()=>R((()=>import("./index.cc32064f.js")),["/music-ease/assets/index.cc32064f.js","/music-ease/assets/vendor.e1762ece.js","/music-ease/assets/others.2db637bd.js","/music-ease/assets/playlist-item.vue_vue_type_style_index_0_lang.e8a96a32.js","/music-ease/assets/playlist-item.vue_vue_type_style_index_0_lang.26752584.css"]),meta:{}},{path:"/login/:type",name:"login",component:()=>R((()=>import("./index.ada3d1cf.js")),["/music-ease/assets/index.ada3d1cf.js","/music-ease/assets/index.7d80db9a.css","/music-ease/assets/vendor.e1762ece.js","/music-ease/assets/others.2db637bd.js","/music-ease/assets/index.d.0906a426.js"]),meta:{}},{path:"/playlist/:id",name:"playlist",component:()=>R((()=>import("./index.70df21a1.js")),["/music-ease/assets/index.70df21a1.js","/music-ease/assets/index.791a69f0.css","/music-ease/assets/vendor.e1762ece.js","/music-ease/assets/playlist-item.vue_vue_type_style_index_0_lang.e8a96a32.js","/music-ease/assets/playlist-item.vue_vue_type_style_index_0_lang.26752584.css","/music-ease/assets/playlist.f712b38f.js"]),meta:{}}],H=t({history:s(),routes:z,scrollBehavior(e,t,s){if(s)return s}}),W=l.create({baseURL:"https://netease-cloud-music-api-samuiyuki.vercel.app",withCredentials:!0,timeout:1e4});function J(e){return W({url:"/song/detail",method:"get",params:{ids:e}})}W.interceptors.request.use((e=>(e.params||(e.params={}),e.params.realIP="59.111.160.197",e)));class G{constructor(e,t){this._playing=!1,this._progress=0,this._volume=1,this._volumeBeforeMuted=1,this._list=e||[],this._trackList=[],this._listId=null,this._current=t||0,this._currentTrack=null,this._howl=null,this._AF=0,this._visible=!0,a.Howler.volume(this.volume),a.Howler.usingWebAudio=!0}static getPlayer(){return G.instance||(G.instance=new G),G.instance}async _playTrack(e=0,t){if(this.current=e,t)this.currentTrack=t,this.trackList=[t];else{const t=this.trackList[e],s=t||(await J(this.list[e].id)).data.songs[0];if(0!==s.fee&&(!s.fee||1===s.fee||4===s.fee))return void this._playNext();this.currentTrack=s}a.Howler.unload(),document.title=`Musicease - ${this.currentTrack.name}`,this.howl=new a.Howl({src:this.music_url,html5:!0,onplay:()=>{this.playing=!0,this._step()},onmute:()=>{this.volumeBeforeMuted=this.volume},onpause:()=>{this.playing=!1,this._cancelStep()},onstop:()=>{this.playing=!1,this._cancelStep()},onend:()=>{this._cancelStep(),this._playNext()}}),this.howl.once("loaderror",(e=>{console.log(e)})),this.howl.play()}_playNext(){this.current++,!this.trackList[this.current]&&this.current>=this.list.length-1&&(this.current=0),this._playTrack(this.current)}_playPrev(){this.current--,!this.trackList[this.current]&&this.current<=0&&(this.current=this.total-1),this._playTrack(this.current)}_pause(){null!==this.howl&&this.howl.pause()}_play(){null!==this.howl&&this.howl.play()}_stop(){null!==this.howl&&this.howl.stop()}_seek(e){null!==this.currentTrack&&null!==this.howl&&(this.howl.seek(e*(this.currentTrack.dt/1e3)),this.progress=e)}_step(){if(!this.playing||null===this.currentTrack||null===this.howl)return;const e=this.howl.seek();"number"==typeof e&&(this.progress=e/(this.currentTrack.dt/1e3)),this._AF=requestAnimationFrame(this._step.bind(this))}_cancelStep(){cancelAnimationFrame(this._AF)}get playing(){return this._playing}set playing(e){this._playing=e}get progress(){return this._progress}set progress(e){this._progress=e}get volume(){return this._volume}set volume(e){this._volume=e,a.Howler.volume(e)}get volumeBeforeMuted(){return this._volumeBeforeMuted}set volumeBeforeMuted(e){this._volumeBeforeMuted=e}get list(){return this._list}set list(e){this._list=e}get listId(){return this._listId}set listId(e){this._listId=e}get current(){return this._current}set current(e){this._current=e}get currentTrack(){return this._currentTrack}set currentTrack(e){this._currentTrack=e}get howl(){return this._howl}set howl(e){this._howl=e}get trackList(){return this._trackList}set trackList(e){this._trackList=e}get total(){return this.list.length||this.trackList.length}get music_url(){var e;return`https://music.163.com/song/media/outer/url?id=${null==(e=this.currentTrack)?void 0:e.id}.mp3`}set visible(e){this._visible=e}get visible(){return this._visible}}function X(e){return W({url:"/login/cellphone",method:"post",params:e})}function Y(e){return W({url:"/login",method:"post",params:e})}function K(e){return W({url:"/user/playlist",method:"get",params:e})}const Q=Symbol(),Z=r({state:{player:G.getPlayer(),userInfo:JSON.parse(localStorage.getItem("userInfo")||"{}"),favPlaylist:JSON.parse(localStorage.getItem("favPlaylist")||"[]"),loginType:null!=(e=Number(localStorage.getItem("loginType")))?e:-1},getters:{},actions:{logout:async({commit:e})=>new Promise(((t,s)=>{W({url:"/logout",method:"post"}).then((s=>{e("UPDATE_USERINFO",{}),e("UPDATE_LOGINTYPE",-1),e("UPDATE_FAVLIST",[]),t()}))})),getLikelist:async({commit:e,state:t})=>new Promise((async(s,l)=>{const{data:a}=await(r=t.userInfo.userId,W({url:"/likelist",method:"get",params:{uid:r,timestamp:(new Date).getTime()}}));var r;e("UPDATE_FAVLIST",a.ids),s()}))},mutations:{UPDATE_USERINFO(e,t){e.userInfo=t,localStorage.setItem("userInfo",JSON.stringify(t))},UPDATE_LOGINTYPE(e,t){e.loginType=t,localStorage.setItem("loginType",t.toString())},UPDATE_FAVLIST(e,t){e.favPlaylist=t,localStorage.setItem("favPlaylist",JSON.stringify(t))}}});function ee(){return n(Q)}const te={},se={class:"navigation-bar dark:bg-gray-800 dark:text-gray-500"},le=c("span",null,"首页",-1),ae=c("span",null,"搜索",-1),re=c("span",null,"音乐库",-1);te.render=function(e,t){const s=i("svg-icon"),l=i("router-link");return o(),u("nav",se,[c(l,{class:"nav-item transform transition-transform scale-90",to:"/","active-class":"dark:text-white scale-100"},{default:d((()=>[c(s,{name:"home"}),le])),_:1}),c(l,{class:"nav-item transform transition-transform scale-90",to:"/search","active-class":"dark:text-white scale-100"},{default:d((()=>[c(s,{name:"search"}),ae])),_:1}),c(l,{class:"nav-item transform transition-transform scale-90",to:"/library","active-class":"dark:text-white scale-100"},{default:d((()=>[c(s,{name:"library"}),re])),_:1})])};const ne={id:"progress-bar-line",class:"bg-gray-700 h-0.5 flex"},ie={id:"line-progress",class:"w-full h-0.5 absolute z-0"};var oe=h({props:{value:{type:Number,required:!0},disabled:{type:Boolean,required:!1}},emits:["drag-start","drag-end"],setup:e=>(t,s)=>(o(),u("div",ne,[m(c("input",{disabled:e.disabled,class:"w-full absolute z-10",type:"range","onUpdate:modelValue":s[1]||(s[1]=e=>v(value)?value.value=e:null),min:"0",max:"1",step:1e-5,onInput:s[2]||(s[2]=e=>t.$emit("drag-start")),onChange:s[3]||(s[3]=e=>t.$emit("drag-end",e))},null,40,["disabled","step"]),[[p,e.value]]),(o(),u("svg",ie,[c("line",{x1:"0",y1:"50%",x2:100*e.value+"%",y2:"50%",stroke:"#2dbd2d","stroke-width":"2"},null,8,["x2"])]))]))});const ue={class:"player dark:bg-gray-800 box-border text-white flex h-16 items-center relative"},ce={key:1,src:"/music-ease/default-music.jpg",alt:"封面",class:"h-16 w-16 object-cover"},de={class:"flex-1 overflow-hidden mx-2"},he={class:"controllers w-full"},me={class:"block truncate text-lg font-medium text-white"},pe={class:"block truncate text-sm text-gray-300"},ve=S(" & "),ge={key:1,class:"text-gray-500 font-medium text-sm"},fe={class:"controls flex"},ye={id:"lyric",class:"h-full w-full absolute bg-gray-600 z-50 p-5 flex flex-col"},_e={class:"flex space-x-3 text-white"},ke={class:"flex-1 flex flex-col justify-center overflow-hidden"},we={class:"block truncate text-lg font-semibold"},be={class:"block truncate text-sm"},xe=S(" & "),Te={class:"lyric-content flex-1 overflow-hidden mt-2"},Ie={class:"font-bold h-full w-full overflow-y-scroll py-3 text-xl space-y-2"},Pe=c("br",null,null,-1),Ee={class:"h-16 w-full flex justify-center items-center"};var Le=h({setup(e){g((()=>{})),f((()=>{null!==v.value&&clearInterval(v.value)}));const t=ee(),s=y(0),l=y(0),a=y(null),r=y([]),n=y([]),h=y(!1),p=y(-1),v=y(null),N=_((()=>t.state.player)),j=_((()=>t.state.favPlaylist)),D=_((()=>n.value.length&&r.value.length>n.value.length&&r.value[0].rawTime!==n.value[0].rawTime?Array.from({length:r.value.length-n.value.length}).concat(n.value):n.value));function O(e){var t;s.value=e.touches[0].pageX,null==(t=a.value)||t.classList.remove("transition-transform")}function $(e){l.value=e.touches[0].pageX-s.value}function U(e){var t;l.value>120&&N.value._playPrev(),l.value<-120&&N.value._playNext(),null==(t=a.value)||t.classList.add("transition-transform"),s.value=0,l.value=0}function C(e){const t=e.split("\n"),s=[];for(let l=0;l<t.length;l++){const e=t[l],a=/\[(\d+):(\d+)\.(\d+)\]/,r=/\[(\d+):(\d+)\.(\d+)\]/g,n=e.match(r);if(!n)continue;const i=e.replace(r,"");for(let t=0;t<n.length;t++){const e=n[t].match(a);if(!e)continue;const l=60*Number(e[1])+Number(e[2])+Number(e[3])/1e3;s.push({time:l,rawTime:e[0],content:i})}}return s.sort((({time:e},{time:t})=>e-t))}return k((async()=>{var e,t;if(null==(e=N.value.currentTrack)?void 0:e.id)try{const{data:e}=await(t=N.value.currentTrack.id,W({url:"/lyric",method:"get",params:{id:t}}));r.value=C(e.lrc.lyric),n.value=C(e.tlyric.lyric)}catch(s){}})),w(h,(()=>{h.value||null===v.value||clearInterval(v.value),h.value&&(v.value=setInterval((()=>{const e=document.getElementsByClassName("selected-lyric"),t=e.length-1;t!==p.value&&(p.value=t,e[t].scrollIntoView({behavior:"smooth",block:"center"}))}),50))})),(e,t)=>{var s,n,p,v;const g=i("router-link"),f=i("svg-icon");return o(),u("div",ue,[c(oe,{class:"slider absolute left-0 z-20 w-full",disabled:!b(N).currentTrack,value:b(N).progress,onDragStart:t[1]||(t[1]=e=>b(N)._pause()),onDragEnd:t[2]||(t[2]=e=>{return t=e,N.value._seek(Number(t.target.value)),void N.value._play();var t})},null,8,["disabled","value"]),b(N).currentTrack?(o(),u(g,{key:0,to:`/playlist/${b(N).listId}`},{default:d((()=>{var e;return[c("img",{src:(null==(e=b(N).currentTrack.al)?void 0:e.picUrl)+"?param=64y64",alt:"封面",class:"h-16 w-16 object-cover"},null,8,["src"])]})),_:1},8,["to"])):(o(),u("img",ce)),c("div",de,[b(N).currentTrack?(o(),u("div",{key:0,class:"player-scroll-content w-full flex items-center transform",onTouchstart:O,onTouchmove:$,onTouchend:U,onClick:t[3]||(t[3]=e=>h.value=!0),ref:a,style:`transform: translateX(${l.value}px);`},[c("div",he,[c("div",{style:`opacity: ${(null==(s=a.value)?void 0:s.clientWidth)?1-1.5*Math.abs(l.value)/(null==(n=a.value)?void 0:n.clientWidth):1};`},[c("span",me,x(null==(p=b(N).currentTrack)?void 0:p.name),1),c("span",pe,[(o(!0),u(T,null,I(b(N).currentTrack.ar,((e,t)=>(o(),u(T,{key:t},[t>=1?(o(),u(T,{key:0},[ve],64)):A("",!0),S(" "+x(e.name),1)],64)))),128))])],4)])],36)):(o(),u("span",ge,"播放列表为空..."))]),c("div",fe,[b(j).includes((null==(v=b(N).currentTrack)?void 0:v.id)||-1)?(o(),u(f,{key:0,name:"liked",class:"mr-2"})):(o(),u(f,{key:1,name:"like",class:"mr-2"})),m(c(f,{name:"pause",class:"mr-2",onClick:t[4]||(t[4]=e=>b(N)._pause())},null,512),[[P,b(N).playing]]),m(c(f,{name:"play",class:"mr-2",onClick:t[5]||(t[5]=e=>b(N)._play())},null,512),[[P,!b(N).playing]])]),(o(),u(E,{to:"body"},[c(L,{name:"slide-down",mode:"out-in"},{default:d((()=>{var e,s,l;return[m(c("div",ye,[c("header",_e,[c("img",{src:b(N).currentTrack?(null==(e=b(N).currentTrack.al)?void 0:e.picUrl)+"?param=64y64":"/default-music.jpg",alt:"封面",class:"h-16 w-16 object-cover shadow-lg"},null,8,["src"]),c("div",ke,[c("span",we,x(null==(s=b(N).currentTrack)?void 0:s.name),1),c("span",be,[(o(!0),u(T,null,I(null==(l=b(N).currentTrack)?void 0:l.ar,((e,t)=>(o(),u(T,{key:t},[t>=1?(o(),u(T,{key:0},[xe],64)):A("",!0),S(" "+x(e.name),1)],64)))),128))])]),c("span",null,[c("span",{onClick:t[6]||(t[6]=e=>h.value=!1)},"[x]")])]),c("div",Te,[c("ul",Ie,[(o(!0),u(T,null,I(r.value,((e,t)=>{var s,l;return o(),u("li",{key:t,class:{"selected-lyric text-white":e.time<Number(null==(s=b(N).currentTrack)?void 0:s.dt)*b(N).progress/1e3}},[S(x(e.content)+" ",1),Pe,S(" "+x(null==(l=b(D)[t])?void 0:l.content),1)],2)})),128))])]),c("footer",Ee,[m(c(f,{name:"pause",class:"mr-2 text-white h-8 w-8",onClick:t[7]||(t[7]=e=>b(N)._pause())},null,512),[[P,b(N).playing]]),m(c(f,{name:"play",class:"mr-2 text-white h-8 w-8",onClick:t[8]||(t[8]=e=>b(N)._play())},null,512),[[P,!b(N).playing]])])],512),[[P,h.value]])]})),_:1})]))])}}});const Ae={},Se=O("data-v-49486550");N("data-v-49486550");const Ne=c("div",{class:"loading space-x-1 h-6"},[c("span"),c("span"),c("span"),c("span")],-1);j();const je=Se(((e,t)=>(o(),u(T,null,[D(e.$slots,"top",{},void 0,!0),Ne,D(e.$slots,"default",{},void 0,!0)],64))));Ae.render=je,Ae.__scopeId="data-v-49486550";const De={class:"dark:bg-gray-900 flex flex-col h-full"},Oe={class:"dark:bg-gray-900 dark:text-white transition-all duration-200 overflow-hidden flex-1"},$e={class:"loading w-full h-full flex flex-col justify-center items-center space-y-2"},Ue=c("p",{class:"text-sm"},"加载中...",-1);var Ce=h({setup(e){const t=_((()=>B())),s=_((()=>ee().state.player));return y(!0),(e,l)=>{const a=i("router-view");return o(),u("div",De,[c("main",Oe,[c(a,null,{default:d((({Component:e,route:t})=>[e?(o(),u(L,{key:0,mode:"out-in",name:"fade"},{default:d((()=>[(o(),u($,{max:"10"},[(o(),u(U,{timeout:0},{default:d((()=>[(o(),u(C(e),{key:t.name+t.fullPath}))])),fallback:d((()=>[c("div",$e,[c(Ae,null,{default:d((()=>[Ue])),_:1})])])),_:2},1024))],1024))])),_:2},1024)):A("",!0)])),_:1})]),c(L,{mode:"out-in",name:"slide-down"},{default:d((()=>[m(c(Le,null,null,512),[[P,b(s).visible]])])),_:1}),m(c(te,{class:"z-50"},null,512),[[P,!b(t).meta.hideNavBar]])])}}}),Be=h({props:{name:{type:String,required:!0},color:{type:String,required:!1}},setup(e){const t=e,s=_((()=>`#icon-${t.name}`)),l=_((()=>t.name?`svg-icon icon-${t.name}`:"svg-icon"));return(t,a)=>(o(),u("svg",F({class:b(l)},t.$attrs,{style:{color:e.color}}),[c("use",{"xlink:href":b(s)},null,8,["xlink:href"])],16))}});var Fe={created(e,t){e.setAttribute("src","/default-music.jpg"),e.onerror=function(){e.setAttribute("src","/default-music.jpg"),e.onerror=null},e.setAttribute("src",t.value)},beforeMount(e,t){},mounted(e,t){},unmounted(e,t){e.onerror=null}};V(Ce).use(Z,Q).use(H).directive("img",Fe).component("svg-icon",Be).mount("#app"),"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js").then((e=>{}));export{Be as _,K as a,Ae as b,Y as c,J as g,X as l,W as s,ee as u};
