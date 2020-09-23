import udayDBStore from "./udayStore"
import udayMutations from "./mutations"
import formOptionsStore from "./formOptions"

export const state = () => ({
  currPath: [
    {
      title: "Dashboard",
      url: "/ha"
    }
  ],
  currCluster: 'cluster001',
  currUser: {
    name: 'User',
    id: 'xxxx'
  },
  baseURL: 'https://powerful-thicket-49412.herokuapp.com',
  currPatient: {
    id: "",
    status: "",
    regBy: "",
    demographics: {
      name: "",
      gender: "",
      age: "",
      hswd: '',
      address: "",
      address2: "",
      occupation: {
        name: 'No Answer',
        id: 'xxxx'
      },
      district: {
        name: 'No Answer',
        id: 'xxxx'
      },
      policeStation: {
        name: 'No Answer',
        id: 'xxxx'
      },
      state: {
        name: 'No Answer',
        id: 'xxxx'
      },
      phone: "",
      location: ""
    },
    episodes: [],
    services: []
  },
  currEpisode: {},
  ...udayDBStore,
  ...formOptionsStore
});

export const mutations = udayMutations;

export const actions = {
  init(store){
    console.log('INIT STORE')
  },
  recordEpisodeUpdateCurrPat (context, payload) {
    context.commit('recordNewEpisode', payload)
    context.commit('updateCurrPatient')
  }
}