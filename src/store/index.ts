import { createStore, Store, useStore as baseUseStore } from "vuex"
import Player from '/@/utils/player';
import { InjectionKey } from "vue";
import { UserProfile, Playlist, LOGIN_TYPE } from "/@/index.d";
import { logout } from '/@/api/auth';

export interface IUserInfo extends UserProfile {
  [k: string]: any
}
export interface State {
  player: Player,
  userInfo: IUserInfo,
  favPlaylist: Playlist,
  loginType: LOGIN_TYPE | -1
}

export const key: InjectionKey<Store<State>> = Symbol()

export const state: State = {
  player: Player.getPlayer(),
  userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}') as IUserInfo,
  favPlaylist: JSON.parse(localStorage.getItem('favPlaylist') || '{}') as Playlist,
  loginType: Number(localStorage.getItem('loginType')) ?? -1,
}

export const store = createStore<State>({
  state,
  getters: {},
  actions: {
    async logout({ commit }): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        logout().then(_ => {
          commit("UPDATE_USERINFO", {})
          commit("UPDATE_LOGINTYPE", -1)
          resolve()
        })
      })
    }
  },
  mutations: {
    UPDATE_USERINFO(state, payload: IUserInfo) {
      state.userInfo = payload
      localStorage.setItem("userInfo", JSON.stringify(payload))
    },
    UPDATE_LOGINTYPE(state, payload: LOGIN_TYPE) {
      state.loginType = payload
      localStorage.setItem("loginType", payload.toString())
    }
  }
})

export function useStore(): Store<State> {
  return baseUseStore(key);
}