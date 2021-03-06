import Vue from 'vue'
import * as constants from '@/assets/constants'

const state = {
  seatInfo: [],
  empInfo: [],
  floorPlaces: [],
  loginEmpName: ''
}

const mutations = {
  initialize (state, seatInfo) {
    state.seatInfo = seatInfo
  },
  fetchEmpInfo (state, empInfo) {
    state.empInfo = empInfo.empInfo
    state.loginEmpName = empInfo.loginEmpName
  },
  fetchAllFloorPlace (state, floorPlaces) {
    state.floorPlaces = floorPlaces
  },
  reset (state) {
    state.seatInfo = []
    state.empInfo = []
    state.loginEmpName = ''
  }
}

const actions = {
  firstview ({ commit }, token) {
    Vue.http.post('/seatwithemp/FetchSeatWithEmpInfo', token)
      .then((data) => {
        if (data.ProcessStatus === constants.STATUS_OK) {
          commit('initialize', data.SeatWithEmpInfo)
        }
      })
  },
  fetchEmpInfo ({ commit }, authInfo) {
    Vue.http.post('/emp/FetchEmpInfo', authInfo.token)
      .then((data) => {
        if (data.ProcessStatus === constants.STATUS_OK) {
          let loginEmpName = data.EmpInfo.find(emp => emp.EMP_NO === authInfo.loginEmpNO).DISPLAY_EMP_NM
          commit('fetchEmpInfo', { empInfo: data.EmpInfo, loginEmpName: loginEmpName })
        }
      })
  },
  fetchAllFloorPlace ({ commit }, token) {
    Vue.http.post('/floorplace/FetchAllFloorPlace', token)
      .then((data) => {
        if (data.ProcessStatus === constants.STATUS_OK) {
          commit('fetchAllFloorPlace', data.FloorPlaces)
        }
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
