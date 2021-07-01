import { createStore, Store, useStore as baseUseStore } from "vuex"
// import * as getters from './getters'
// import * as actions from './actions'
import mutations from './mutations'
import Player from '../utils/player';
import { InjectionKey } from "vue";

export interface State {
  player: Player
}
export const key: InjectionKey<Store<State>> = Symbol()

export const state = {
  player: Player.getPlayer()
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