<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline">
            <li class="list-inline-item">
              <button class="btn btn-dark px-3 small" role="button">
                Update Demographics
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 rounded">
          
          <div class="w-100 bg-white mb-3 px-3 pb-3" style="min-height: 100px;">
            <div class="row pt-3">
              <div class="col-md-12 pb-3">
                General Information <br>
              </div>
               <div class="col-md-6">
                <div class="small text-muted mb-1">
                  Full Name
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="First Name" v-model="demographics.name">
               </div>
              <div class="col-md-6">
                <div class="small text-muted mb-1">
                  Gender
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Gender" v-model="demographics.gender">
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="small text-muted mb-1">
                  Phone Number
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Phone Number" v-model="demographics.phone">
              </div>
              <div class="col-md-6">
                <div class="small text-muted mb-1">
                  Age
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Age" v-model="demographics.age">
                <div class="small text-muted mb-1">
                  Age Type
                </div>
                <select v-model="demographics.ageType" class="w-100 custom-select mb-3">
                    <option disabled selected value="">Age Type</option>
                    <option value="days">Days</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
              </div>
            </div>
            <div class="row pt-3">
              <div class="col-md-6"><div class="small text-muted mb-1">
                  H/W/S/D of
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="H/W/S/D of" v-model="demographics.hswd">
              </div>
              <div class="col-md-6">
                <label for="occupation">Occupation</label>
                <select class="custom-select mb-3" v-model="occupations.selected">
                  <option disabled value="">Occupation</option>
                  <option v-for="(occupation, index) in occupations.options" :key="index" :value="{ name: occupation.name, id: occupation.objectid}">{{ occupation.name }}</option>
                  <!-- <option selected value="none">{{ occupations.selected.name }}</option> -->
                </select>
              </div>
            </div>
            <div class="row pt-3">
              <div class="col-md-12 pb-3">
                Location Information
              </div>
              <div class="col-md-6">
                <div class="small text-muted mb-1">
                  Address 1
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Address 1" v-model="demographics.address">
                <label for="">District</label>
                <select class="custom-select mb-4" v-model="districts.selected">
                  <option disabled value="district">District</option>
                  <option v-for="(district, index) in districts.options" :key="index" :value="{ name: district.name, id: district.objectid}">{{ district.name }}</option>
                </select>
                
                <label for="">Police Station</label>
                <select class="custom-select mb-4" v-model="policeStations.selected">
                  <option disabled value="policestation">Police Station</option>
                  <option v-for="(policeStation, index) in policeStations.options" :key="index" :value="{ name: policeStation.name, id: policeStation.objectid}">{{ policeStation.name }}</option>
                </select>
              </div>
              <div class="col-md-6">
                <div class="small text-muted mb-1">
                  Address 2
                </div>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Address 2" v-model="demographics.address2">
                <label for="">State</label>
                <select class="custom-select mb-4" v-model="states.selected">
                  <option disabled value="state">State</option>
                  <option v-for="(state, index) in states.options" :key="index" :value="{ name: state.name, id: state.objectid}">{{ state.name }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-3">
      <div class="row">
        <div class="col-md-12">
          <div>
            <nuxt-link to="/ha/profile">
              <button @click="updateDemographics('Patient demographics have been updated.')" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1 text-uppercase">
                Save Demographics
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'dashboard',
  mounted() {
    this.$store.commit('updatePath', [
      {
        title: 'Dashboard',
        url: '/ha'
      },
      {
        title: 'Patient\'s Profile',
        url: '/ha/profile'
      },
      {
        title: 'View Family History',
        url: '/ha/profile'
      }
    ])

    this.demographics = {...this.currPatient.demographics}

    // set options from patient data
    this.occupations.selected = this.currPatient.demographics.occupation
    this.states.selected = this.currPatient.demographics.state
    this.districts.selected = this.currPatient.demographics.district
    this.policeStations.selected = this.currPatient.demographics.policeStation

    // get options from store
    this.occupations.options = this.$store.state.occupationOptions
    this.districts.options = this.$store.state.districtOptions
    this.states.options = this.$store.state.stateOptions
    this.policeStations.options = this.$store.state.policeStationOptions

    // this.getOccupations()
    // this.getPolice()
    // this.getDistricts()
    // this.getStates()
  },
  computed: {
    currPatient: function () {
      return this.$store.state.currPatient
    },
    patientDataComputed: function () {
      return {
        name: this.demographics.name,
        gender: this.demographics.gender,
        age: this.demographics.age,
        ageType: this.demographics.ageType,
        hswd: this.demographics.hswd,
        address: this.demographics.address,
        address2: this.demographics.address2,
        phone: this.demographics.phone,
        location: this.demographics.location,
        country: this.demographics.country,
        occupation: this.occupations.selected || { name: 'No Answer', objectid: 'xxxx'},
        district: this.districts.selected || { name: 'No Answer', objectid: 'xxxx'},
        state: this.states.selected || { name: 'No Answer', objectid: 'xxxx'},
        policeStation: this.policeStations.selected || { name: 'No Answer', objectid: 'xxxx'},
      }
    }
  },
  methods: {
    updateDemographics: function (msg) {
      alert(msg)

      let currPatientId = this.currPatient.id

      console.log('xxxx')
      console.log()
      console.log(this.patientDataComputed)
      this.$store.commit('updateDemographics', [currPatientId, this.patientDataComputed])
      // this.$store.commit('')
    }
  },
  data() {
    return {
      baseURL: 'https://powerful-thicket-49412.herokuapp.com',
      occupations: {
        selected: {
          name: 'No Answer',
          id: 'xxxx'
        },
        options: []
      },
      patientList: '',
      policeStations: {
        selected: {
          name: 'No Answer',
          id: 'xxxx'
        },
        options: []
      },
      districts: {
        selected: {
          name: 'No Answer',
          id: 'xxxx'
        },
        options: []
      },
      states: {
        selected: {
          name: 'No Answer',
          id: 'xxxx'
        },
        options: []
      },
      demographics: {
        name: '',
        occupation: '',
        gender: '',
        age: 0,
        ageType: '',
        hswd: '',
        address: '',
        address2: '',
        police: '',
        phone: '',
        location: '',
        country: '',
      }
    }
  },
  transition: 'u-fade'
}
</script>

<style>
.list-inline-item {
  margin-right: 16px !important;
}

thead tr th {
  border-top: none !important;
}

.btn-dark {
  background-color: #444f5a;
  border: none;
}

.btn:focus {
  outline: none;
  box-shadow: none;
}

.btn-dark:hover {
  background-color: #5d666e;
  border: none;
}

.btn-light {
  background-color: #e4e4e4;
  border: none;
}

.shape-status {
  width: 12px;
  margin-right: 7px;
  margin-bottom: 4px;
}

.pointer:hover {
  cursor: pointer;
}
</style>
