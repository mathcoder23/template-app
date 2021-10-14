import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userSession: {},
        isLogin:false,
        runtimeEnv:{
            cid:''
        }
    },
    mutations: {
        changeUserSession(state, userSession) {
            state.userSession = userSession
            if(userSession.id){
                state.isLogin = true
            }else{
                state.isLogin = false
            }

        },
        changeRuntimeEnv(state, runtimeEnv) {
            state.runtimeEnv = runtimeEnv
        }

    },
    actions: {},
    modules: {}
});

export default store;
