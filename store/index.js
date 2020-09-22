import udayDBStore from "./udayStore"
import udayMutations from "./mutations"

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
      occupation: {
        name: 'No Answer',
        id: 'xxxx'
      },
      gender: "",
      age: "",
      hswd: '',
      address: "",
      address2: "",
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
});

export const mutations = udayMutations;

export const actions = {
  recordEpisodeUpdateCurrPat (context, payload) {
    context.commit('recordNewEpisode', payload)
    context.commit('updateCurrPatient')
  }
}
