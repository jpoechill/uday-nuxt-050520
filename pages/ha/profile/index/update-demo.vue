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
                
                <label for="">State</label>
                <select class="custom-select mb-4" v-model="states.selected">
                  <option disabled value="state">State</option>
                  <option v-for="(state, index) in states.options" :key="index" :value="{ name: state.name, id: state.objectid}">{{ state.name }}</option>
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

                <label for="">District</label>
                <select class="custom-select mb-4" v-model="districts.selected">
                  <option disabled value="district">District</option>
                  <option v-for="(district, index) in districts.options" :key="index" :value="{ name: district.name, id: district.objectid}">{{ district.name }}</option>
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

    console.log(this.demographics)

    // // set options from patient data
    this.occupations.selected = this.currPatient.demographics.occupation
    this.states.selected = this.currPatient.demographics.state
    this.districts.selected = this.currPatient.demographics.district
    this.policeStations.selected = this.currPatient.demographics.policeStation

    // // get options from store
    // this.occupations.options = this.$store.state.occupationOptions
    // this.districts.options = this.$store.state.districtOptions
    // this.states.options = this.$store.state.stateOptions
    // this.policeStations.options = this.$store.state.policeStationOptions

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
        selected: '',
        options: [
          {
            name: "Student",
            objectid: "5f3e81a843bec66f97b8f6f3"
          }, 
          {
            name: "Homemaker",
            objectid: "5f3e81b443bec66f97b8f6f4"
          }, 
          {
            name: "Mason",
            objectid: "5f3e81be43bec66f97b8f6f5"
          }, 
          {
            name: "Daily wage labourer",
            objectid: "5f3e81ce43bec66f97b8f6f6"
          }, 
          {
            name: "Service",
            objectid: "5f3e81d843bec66f97b8f6f7"
          }, 
          {
            name: "Farmer",
            objectid: "5f3e81e043bec66f97b8f6f8"
          }, 
          {
            name: "Small business owner",
            objectid: "5f3e81ee43bec66f97b8f6f9"
          }, 
          {
            name: "Retired",
            objectid: "5f3e81f943bec66f97b8f6fa"
          }, 
          {
            name: "Unemployed",
            objectid: "5f3e820643bec66f97b8f6fb"
          }, 
          {
            name: "Teacher",
            objectid: "5f3e821043bec66f97b8f6fc"
          }, 
          {
            name: "Health worker",
            objectid: "5f3e821c43bec66f97b8f6fd"
          }, 
          {
            name: "Others",
            objectid: "5f3e822443bec66f97b8f6fe"
          },
          {
            name: "None",
            objectid: "xxxxx"
          }
        ]
      },
      policeStations: {
        selected: '',
        options: [
          {
            district: "5f6ccadc3a7d3d5dd5174782",
            name: "Pindar Valley",
            objectid: "5f6ccc723a7d3d5dd5174783"
          },
          {
            district: "5f6ccadc3a7d3d5dd5174782",
            name: "Supi Village",
            objectid: "5f6ccca63a7d3d5dd5174785"
          },
          {
            district: "5f3e7eba43bec66f97b8f6ef",
            name: "Regent Park",
            objectid: "5f3e7f8843bec66f97b8f6f0"
          }, {
            district: "5f3e871f43bec66f97b8f70f",
            name: "Anandapur",
            objectid: "5f3eea669dc43f950d159445"
          }, {
            district: "5f3e871f43bec66f97b8f70f",
            name: "Belaberya",
            objectid: "5f3eea82ff87660cfafd9b3f"
          }, {
            district: "5f3e871f43bec66f97b8f70f",
            name: "Belda",
            objectid: "5f3eea999dc43f950d159446"
          }, {
            district: "5f3e871f43bec66f97b8f70f",
            name: "Belphali",
            objectid: "5f3eeaabff87660cfafd9b40"
          }, {
            district: "5f3e871f43bec66f97b8f70f",
            name: "Binpur",
            objectid: "5f3eeab9ff87660cfafd9b41"
          }, {
            district: "5f3e871f43bec66f97b8f70f",
            name: "Chandrakona",
            objectid: "5f3eead29dc43f950d159447"
          }, {
            district: "5f3e871f43bec66f97b8f70f",
            name: "Daspur",
            objectid: "5f3eeae29dc43f950d159448"
          }, {
            district: "5f3e871f43bec66f97b8f70f",
            name: "Datan",
            objectid: "5f3eeaee9dc43f950d159449"
          }, {
            district: "5f3e871f43bec66f97b8f70f",
            name: "Debra",
            objectid: "5f3eeaf99dc43f950d15944a"
          }, {
            district: "5f3e871f43bec66f97b8f70f",
            name: "Garbeta",
            objectid: "5f3eeb17ff87660cfafd9b42"
          }, {
            district: "5f3e871f43bec66f97b8f70f",
            name: "Ghatal",
            objectid: "5f3eeb21ff87660cfafd9b43"
          }, {
            district: "5f3e871f43bec66f97b8f70f",
            name: "Goaltar",
            objectid: "5f3eeb319dc43f950d15944b"
          }, {
            district: "5f3e871f43bec66f97b8f70f",
            name: "Gopiballavpur",
            objectid: "5f3eeb529dc43f950d15944c"
          }, {
            district: "5f3e871f43bec66f97b8f70f",
            name: "Jambani",
            objectid: "5f3eeb679dc43f950d15944d"
          }, {
            district: "5f3e871f43bec66f97b8f70f",
            name: "Jhargram",
            objectid: "5f3eeb829dc43f950d15944e"
          }, {
            district: "5f3e871f43bec66f97b8f70f",
            name: "Keshpur",
            objectid: "5f3eeb95ff87660cfafd9b44"
          }, {
            district: "5f3e871f43bec66f97b8f70f",
            name: "Keshiary",
            objectid: "5f3eeba5ff87660cfafd9b45"
          }, {
            district: "5f3e871f43bec66f97b8f70f",
            name: "Kharagpur",
            objectid: "5f3eebba9dc43f950d15944f"
          }, {
            district: "5f3e871f43bec66f97b8f70f",
            name: "Kharagpur Town",
            objectid: "5f3eebc1ff87660cfafd9b46"
          }, {
            district: "5f3e871f43bec66f97b8f70f",
            name: "Lalgarh",
            objectid: "5f3eebdd9dc43f950d159450"
          }, {
            district: "5f3e871f43bec66f97b8f70f",
            name: "Midnapore",
            objectid: "5f3eebec9dc43f950d159451"
          }, 
          {
            name: "None",
            objectid: "xxxxx"
          }
        ]
      },
      districts: {
        selected: '',
        options: [
          {
            name: "Bageshwar",
            objectid: "5f6ccadc3a7d3d5dd5174782",
            state: "5f6cc9ce3a7d3d5dd5174781"
          },
          {
            name:  "Kolkata",
            objectid:  "5f3e7eba43bec66f97b8f6ef",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Uttar 24 Parganas",
            objectid:  "5f3e856e43bec66f97b8f6ff",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Dakshin 24 Parganas",
            objectid:  "5f3e857e43bec66f97b8f700",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Alipurduar",
            objectid:  "5f3e859443bec66f97b8f701",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Bankura",
            objectid:  "5f3e85a843bec66f97b8f702",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Birbhum",
            objectid:  "5f3e85b443bec66f97b8f703",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Coochbehar",
            objectid:  "5f3e85cd43bec66f97b8f704",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Darjeeling",
            objectid:  "5f3e85e943bec66f97b8f705",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Uttar Dinajpur",
            objectid:  "5f3e862243bec66f97b8f706",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Dakshin Dinajpur",
            objectid:  "5f3e862e43bec66f97b8f707",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Hooghly",
            objectid:  "5f3e864f43bec66f97b8f708",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Howrah",
            objectid:  "5f3e868943bec66f97b8f709",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Jalpaiguri",
            objectid:  "5f3e869c43bec66f97b8f70a",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Jhargram",
            objectid:  "5f3e86aa43bec66f97b8f70b",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Kalimpong",
            objectid:  "5f3e86c943bec66f97b8f70c",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Maldah",
            objectid:  "5f3e86f243bec66f97b8f70d",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Purba Medinipur",
            objectid:  "5f3e871043bec66f97b8f70e",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Paschim Medinipur",
            objectid:  "5f3e871f43bec66f97b8f70f",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Murshidabad",
            objectid:  "5f3e873443bec66f97b8f710",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Nadia",
            objectid:  "5f3e873f43bec66f97b8f711",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Purba Bardhaman",
            objectid:  "5f3e877843bec66f97b8f712",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Paschim Bardhaman",
            objectid:  "5f3e878243bec66f97b8f713",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, {
            name:  "Purulia",
            objectid:  "5f3e879543bec66f97b8f714",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          }, 
          {
            name:  "None",
            objectid:  "xxxxx"
          }
        ]
      },
      states: {
        selected: '',
        options: [
          {
            "name": "West Bengal",
            "objectid": "5f3e7e6f43bec66f97b8f6ee"
          },
          {
            "name": "Uttarakhand",
            "objectid": "5f6cc9ce3a7d3d5dd5174781"
          },
          {
            "name": "None",
            "objectid": "xxxxx"
          }
        ]
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
