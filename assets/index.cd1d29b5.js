import{r as l,t as a,a as e}from"./playlist.332883b4.js";import{_ as s}from"./cover.vue_vue_type_script_setup_true_lang.2dfc415e.js";import{u as t}from"./index.299bc7d5.js";import{f as i,M as r,m as o,l as d,N as u,o as c,d as m,q as n,z as p,e as v,F as f,s as x}from"./vendor.e1762ece.js";const y={class:"home-wrapper h-full overflow-y-auto py-4 px-2"},w={class:"mb-2"},b=v("h2",{class:"dark:text-white text-xl font-bold"},"推荐歌单",-1),h={class:"mt-3 overflow-x-auto w-full space-x-2 flex"},k={class:"mb-2"},_=v("h2",{class:"dark:text-white text-xl font-bold"},"网友精选",-1),g={class:"mt-3 overflow-x-auto w-full space-x-2 flex"},j={class:"mb-2"},U=v("h2",{class:"dark:text-white text-xl font-bold"},"排行榜",-1),I={class:"mt-3 overflow-x-auto w-full space-x-2 flex"};var q=i({async setup(i){const q=r(),z=o((()=>t().state.loginType)),C=d(!0),F=d([]),M=d([]),N=d([]);try{const[s,t,i]=await u(Promise.all([l({limit:10}),a({limit:10}),e()]));F.value=s.data.result,M.value=t.data.playlists,N.value=i.data.list}catch(P){C.value=!1}return(l,a)=>(c(),m("div",y,[1===n(z)?(c(),m("div",{key:0,class:"h-1/6 w-full from-red-400 via-red-600 to-red-400 bg-gradient-to-bl mb-2 flex justify-center items-center font-bold text-2xl",onClick:a[1]||(a[1]=l=>n(q).push("/playlist/0"))}," 每日推荐歌单 ")):p("",!0),v("div",w,[b,v("div",h,[(c(!0),m(f,null,x(F.value,(l=>(c(),m(s,{key:l.id,name:l.name,"pic-url":l.picUrl,id:l.id},null,8,["name","pic-url","id"])))),128))])]),v("div",k,[_,v("div",g,[(c(!0),m(f,null,x(M.value,(l=>(c(),m(s,{key:l.id,name:l.name,"pic-url":l.coverImgUrl,id:l.id},null,8,["name","pic-url","id"])))),128))])]),v("div",j,[U,v("div",I,[(c(!0),m(f,null,x(N.value,(l=>(c(),m(s,{key:l.id,name:l.name,"pic-url":l.coverImgUrl,id:l.id},null,8,["name","pic-url","id"])))),128))])])]))}});export{q as default};
