import udayDBStore from "./udayStore"
import udayMutations from "./mutations"
import formOptionsStore from "./formOptions"

export const state = () => ({
  ...udayDBStore,
  ...formOptionsStore,
  profileImage: '/avatar-girl_04.png',
  currPath: [
    {
      title: "Dashboard",
      url: "/ha"
    }
  ],
  currCluster: 'cluster001',
  currUser: {},
  baseURL: 'https://powerful-thicket-49412.herokuapp.com',
  currPatient: {
    id: '',
    demographics: {
      name: '',
      occupation: '',
      phone: '',
      gender: '',
      address: '',
      policeStation: '',
      state: '',
      district: '',
    }
  },
  currEpisode: {},
});

export const mutations = udayMutations;

export const actions = {
  nuxtServerInit(store) {
    // console.log('INIT STORE')

    // if (localStorage.getItem('vuex')) {
    //   console.log('LOCAL STORAGE EXISTS')
    // } else {
    //   console.log('LOCAL STORAGE EMPTY')
    // }
  },
  recordEpisodeUpdateCurrPat (context, payload) {
    context.commit('recordNewEpisode', payload)
    context.commit('updateCurrPatient')
  }
}