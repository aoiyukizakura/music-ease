import { MutationTree } from "vuex"
import { IUserInfo, State } from "./index"

export const mutations: MutationTree<State> = {
  UPDATE_USERINFO(state, payload: IUserInfo) {
    state.userInfo = payload
    localStorage.setItem("userInfo", JSON.stringify(payload))
  }
}