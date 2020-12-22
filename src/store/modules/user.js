import {gologin} from '@/api/user'
const getDefaultState = () => {
  return {
    token: '',
    name: 'test',
    avatar: '',
    userInfo:null,
    openId:'',
  }
}

const state = getDefaultState()

const mutations = {
  setToken(state,value){
    state.token = value
  },
  setUserInfo(state,value){
    state.userInfo = value
  },
  setOpenId(state,value){
    state.openId = value
  }
}

const actions = {
  login({ commit }, userInfo) {
    return new Promise((resolve,reject)=>{
      gologin(userInfo).then(res=>{
        if(res && res.code==200){
          commit('setToken', res.datas.token)
          commit('setUserInfo', res.datas)
          resolve(res)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {
      //   const { data } = response

      //   if (!data) {
      //     return reject('Verification failed, please Login again.')
      //   }

      //   const { name, avatar } = data

      //   commit('SET_NAME', name)
      //   commit('SET_AVATAR', avatar)
      //   resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // user logout
  logout({ commit, state }) {
    commit('setToken','')
    commit('setUserInfo',{})
    // return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      //   removeToken() // must remove  token  first
      //   resetRouter()
      //   commit('RESET_STATE')
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    // })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      // removeToken() // must remove  token  first
      // commit('RESET_STATE')
      // resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

