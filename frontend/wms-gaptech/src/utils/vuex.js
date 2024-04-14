import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      user: null,
    };
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    setUser(context, user) {
      context.commit("setUser", user);
    },
  },
});

export default store;
