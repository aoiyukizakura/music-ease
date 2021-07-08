import { createStore, Store, useStore as baseUseStore } from "vuex"
// import * as getters from './getters'
// import * as actions from './actions'
import mutations from './mutations'
import Player from '../utils/player';
import { InjectionKey } from "vue";

interface IUserInfo {
  [k: string]: any
}
export interface State {
  player: Player,
  userInfo: IUserInfo | null
}
export const key: InjectionKey<Store<State>> = Symbol()

export const state: State = {
  player: Player.getPlayer(),
  userInfo: null
}

export const store = createStore<State>({
  state,
  // getters,
  // actions,
  // mutations
})

export function useStore(): Store<State> {
  return baseUseStore(key);
}