<template>
  <div>
    <form v-on:submit.prevent="registerPatientOnline">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <ul class="list-inline">
            <li class="list-inline-item" v-for="(tab, index) in tabs" :key="index">
              <div class="btn px-3 small mr-1 pointer" type="button" @click="getTab(tab.name, tab.isEnabled)" :class="tab.isActive ? 'btn-dark' : 'btn-light'">
                {{ tab.title }}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- {{ patientDataComputed }} -->

      <!-- Demographics -->
      <div class="row" v-if="tabs[0].isActive">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-4 pb-3">
            <div class="container">
              <div class="row">
                <div class="col-md-12 text-center">
                  <!-- <img src="/avatar-placeholder.jpg" class="m-3" style="width: 200px;" alt=""><br> -->
                  <div class="position-relative mx-auto" style="width: 200px;">
                    <div class="position-absolute">
                      <img src="/avatar-placeholder.jpg" alt="">
                    </div>
                    <div style="padding-bottom: 100%;"></div>
                  </div>
                  <br>
                  <button class="btn btn-dark px-4 mb-3">Upload Photo</button>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12 text-muted small mb-0">
                  Demographic Information
                  <hr>
                </div>
                <div class="col-md-6">
                  <label for="">Name</label>
                  <input type="text" class="w-100 p-2 mb-3" v-model="patientData.name" placeholder="Full Name">
                  
                </div>
                <div class="col-md-6">
                  <label for="">Age</label><br>
                  <input type="number" min="0" class="w-100 p-2 mb-3" v-model="patientData.age" placeholder="Age">
                  <select class="w-100 custom-select mb-3" v-model="patientData.ageType">
                    <option disabled value="">Age Type</option>
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                    <option value="days">Days</option>
                    
                  </select>
                </div>
              </div>
              
              <div class="row mt-3">
                <div class="col-md-6">
                  <label for="">Gender</label>
                  <select class="custom-select mb-3">
                    <option selected disabled>Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other</option>
                  </select>
                  <label for="">Phone Number</label>
                  <input type="text" class="w-100 p-2 mb-3" v-model="patientData.phone" placeholder="Phone Number">
                </div>
                <div class="col-md-6">
                  <label for="occupation">Occupation</label>
                  <select class="custom-select mb-3" v-model="occupations.selected">
                    <option selected disabled value="occupation">Occupation</option>
                    <option v-for="(occupation, index) in occupations.options" :key="index" :value="{ name: occupation.name, id: occupation.objectid}">{{ occupation.name }}</option>
                  </select>
                  <label for="">Husband/Wife/Son/Daughter of</label>
                  <input type="text" class="w-100 p-2 mb-3" v-model="patientData.hswd" placeholder="Family Members's Name">
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12 text-muted small mb-0">
                  Geographic Information
                  <hr>
                </div>
                <div class="col-md-6">

                  <label for="">Address</label>
                  <input type="text" class="w-100 p-2 mb-3" v-model="patientData.address" placeholder="Address 1">
                  
                  <label for="">District</label>
                  <select class="custom-select mb-4" v-model="districts.selected">
                    <option selected disabled value="district">District</option>
                    <option v-for="(district, index) in districts.options" :key="index" :value="{ name: district.name, id: district.objectid}">{{ district.name }}</option>
                  </select>
                  <label for="">Police Station</label>
                  <select class="custom-select mb-4" v-model="policeStations.selected">
                    <option selected disabled value="policestation">Police Station</option>
                    <option v-for="(policeStation, index) in policeStations.options" :key="index" :value="{ name: policeStation.name, id: policeStation.objectid}">{{ policeStation.name }}</option>
                  </select>
                </div>
                <div class="col-md-6">

                  <label for="">Address 2</label>
                  <input type="text" class="w-100 p-2 mb-3" v-model="patientData.address2" placeholder="Address 2">
                  
                  <label for="">State</label>
                  <select class="custom-select mb-4" v-model="states.selected">
                    <option selected disabled value="state">State</option>
                    <option v-for="(state, index) in states.options" :key="index" :value="{ name: state.name, id: state.objectid}">{{ state.name }}</option>
                  </select>
                  <label for="" class="pb-2">Country</label><br>
                  <em>
                    <strong>
                      {{ patientData.country }}
                    </strong>
                  </em>
                  <!-- <input type="text" class="w-100 p-2 mb-3" v-model="patientData.country" placeholder="India" value="India"> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 mb-3">
          <button type="button" @click="goToNext()" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">
            GO TO NEXT SECTION
          </button>
        </div>
      </div>

      <!-- Patient Medical History -->
      <div class="row" v-if="tabs[1].isActive">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 px-3 pb-3" style="min-height: 100px;">
            <!-- Start Patient History -->
            <div class="row pt-3">
              <div class="col-md-12 small text-muted pb-2">
                Health Diagnosis
                <hr>
              </div>
              <div class="col-md-6" v-for="(patientQuestion, index) in patientData.patientHistory.questions" :key="index">
                <div v-if="patientQuestion.placeholder" class="form-check ml-5 mb-4">
                  <input class="form-check-input" v-model="patientQuestion.isActive" type="checkbox" value="" :id="'patientQuestions' + index">
                  <label class="form-check-label ml-3 fake-link" :for="'patientQuestions' + index">
                    {{ patientQuestion.title }}
                  </label><br>
                  <input type="number" v-model="patientQuestion.value" min="0" class="ml-3 mr-3 p-2 mt-3 w-5" placeholder="0"> Sticks/packs per day.
                </div>
                <div class="form-check ml-5 mb-4" v-else>
                  <input class="form-check-input" v-model="patientQuestion.isActive" type="checkbox" value="" :id="'patientQuestions' + index">
                  <label class="form-check-label ml-3 fake-link" :for="'patientQuestions' + index">
                    {{ patientQuestion.title }}
                  </label>
                </div>
              </div>
            </div>
            <div class="row pt-3">
              <div class="col-md-12 small text-muted pb-2">
                General Notes 
                <!-- {{ patientDataComputed }} -->
                <hr>
              </div>
              <div class="col-md-12">
                <textarea v-model="patientData.patientHistory.generalDescription" class="w-100 form-control" rows="5" placeholder="Please provide any additional or relevant information"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 mb-3">
          <button type="button" @click="goToNext()" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">
            GO TO NEXT SECTION
          </button>
        </div>
      </div>

      <!-- Family Medical History -->
      <div class="row" v-if="tabs[2].isActive">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 px-3 pb-3" style="min-height: 100px;">
            <div class="row pt-3">
              <div class="col-md-12 small text-muted pb-2">
                Health Diagnosis
                <hr>
              </div>
              <div class="col-md-6" v-for="(patientQuestion, index) in patientData.familyHistory.questions" :key="index">
                <div v-if="patientQuestion.placeholder" class="form-check ml-5 mb-4">
                  <input class="form-check-input" v-model="patientQuestion.isActive" type="checkbox" value="" :id="'patientQuestions' + index">
                  <label class="form-check-label ml-3 fake-link" :for="'patientQuestions' + index">
                    {{ patientQuestion.title }}
                  </label><br>
                  <input type="number" v-model="patientQuestion.value" min="0"  @change="handleFormChange(patientQuestion)" class="ml-3 mr-3 p-2 mt-3 w-25" placeholder="0"> Sticks/packs per day.
                </div>
                <div class="form-check ml-5 mb-4" v-else>
                  <input class="form-check-input" v-model="patientQuestion.isActive" type="checkbox" value="" :id="'patientQuestions' + index">
                  <label class="form-check-label ml-3 fake-link" :for="'patientQuestions' + index">
                    {{ patientQuestion.title }}
                  </label><br>

                  <div v-for="(relationship, index) in patientQuestion.relationship" :key="index">
                    <select v-model="patientQuestion.relationship[index]" @change="handleFormChange(patientQuestion); addRelation(patientQuestion, index)" value="" class="custom-select w-75 ml-3 mt-3">
                      <option :selected="true" :disabled="true" value="">Relationship</option>
                      <option value="Parent">Parent</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Other Relationship">Other Relationship</option>
                    </select>
                  </div>

                </div>
              </div>
            </div>
            <div class="row pt-3">
              <div class="col-md-12 small text-muted pb-2">
                General Notes
                <hr>
              </div>
              <div class="col-md-12">
                <textarea v-model="patientData.familyHistory.generalDescription" class="w-100 form-control" rows="5" placeholder="Please provide any additional or relevant information"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 mb-3">
          <button type="submit" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">
            Register Patient
          </button>
        </div>
      </div>
    </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'dashboard',
  computed: {
    patientDataComputed() {
      return {
        name: this.patientData.name,
        occupation:  typeof this.occupations.selected == 'object' ? this.occupations.selected : { name: 'No Answer', id: 'xxxx'},
        gender: this.patientData.gender,
        age: this.patientData.age,
        ageType: this.patientData.ageType,
        hswd: this.patientData.hswd,
        address: this.patientData.address,
        address2: this.patientData.address2,
        district: typeof this.districts.selected == 'object' ? this.districts.selected : { name: 'No Answer', id: 'xxxx'},
        state: typeof this.states.selected == 'object' ? this.states.selected : { name: 'No Answer', id: 'xxxx'},
        policeStation: typeof this.policeStations.selected == 'object' ? this.policeStations.selected : { name: 'No Answer', id: 'xxxx'},
        phone: this.patientData.phone,
        location: this.patientData.location,
        country: this.patientData.country,
        patientHistory: this.patientData.patientHistory,
        familyHistory: this.patientData.familyHistory,
        generalDescription: this.patientData.generalDescription
      }
    }
  },
  beforeRouteLeave (to, from , next) {
    if (!this.formIsCompelete) {
      const answer = window.confirm('You have unsaved changes. Are you sure you want to leave? ')
      
      answer ? next() : next(false);
    } else {
      next()
    }
  },
  mounted() {
    let path = [
      {
        title: 'HA\'s Dashboard',
        url: '/ha'
      },
      {
        title: 'Register New Patient',
        url: '/ha/register-new'
      },
    ]

    this.$store.commit('updatePath', path)

    console.log(this.$store.state)

    // this.occupations.options = this.$store.state.occupationOptions
    // this.districts.options = this.$store.state.districtOptions
    // this.states.options = this.$store.state.stateOptions
    // this.policeStations.options = this.$store.state.policeStationOptions

    // this.generateFakeCredentials()
  },
  methods: {
    addRelation: function (question, questionIndex) {
      console.log(question)

      if (questionIndex === question.relationship.length - 1) {
        question.relationship.push('')
      }
    },
    handleFormChange: function (question) {
      question.isActive = true

      console.log('Select menu updated')
    },
    getPolice: function () {
      let self = this
      axios.get(this.baseURL + '/requestps')
        .then(function (response) {
          self.policeStations.options = response.data
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getDistricts: function () {
      let self = this
      axios.get(this.baseURL + '/requestdistrict')
        .then(function (response) {
          self.districts.options = response.data
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getStates: function () {
      let self = this
      axios.get(this.baseURL + '/requeststate')
        .then(function (response) {
          self.states.options = response.data
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getOccupations: function () {
      let self = this
      axios.get(this.baseURL + '/requestoccupation')
        .then(function (response) {
          self.occupations.options = response.data
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    generateFakeCredentials: function name(params) {
      let self = this
      axios.get('https://cors-anywhere.herokuapp.com/https://randomuser.me/api/').then(res => {
        
        const profile = res.data.results[0]
        console.log(profile)
        self.patientData.name = profile.name.first + ' ' + profile.name.last
        self.patientData.address = profile.location.street.number + ' ' + profile.location.street.name
        self.patientData.age = profile.dob.age
        self.patientData.phone = profile.phone
        self.patientData.gender = profile.gender[0].toUpperCase()
        self.patientData.location = profile.location.city + ', ' + profile.location.state + ', ' + profile.location.country
      })
    },
    goToNext: function () {
      let tabs = this.tabs
      let ref = 0

      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].isActive === true) {
          tabs[i].isActive = false
          ref = i
        }
      }

      window.scrollTo(0, 0);

      tabs[ref + 1].isActive = true
      tabs[ref + 1].isEnabled = true
    },
    getTab: function (tabName) {
      let tabs = this.tabs
      let ref = 0

      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].name === tabName) {
          tabs[i].isActive = true
          ref = i
        } else {
          tabs[i].isActive = false
        }
      }
    },
    registerPatient: function (event) {

      // console.log('Patient Data: ')
      // console.log(this.patientData.objectID)
      // console.log(this.patientData.patientRegID)

      let payload = {
        objectID: this.patientData.objectID,
        // regNo: this.patientData,
        regBy: this.$store.state.currUser.name,
        demographics: this.patientDataComputed
      }

      // event.preventDefault()
      
      // error checks
      if (payload.demographics.name === '') {
        payload.demographics.name = 'Un-named Patient'
      }

      this.$store.commit('registerPatient', payload)
      this.$store.commit('updateCurrPatient', payload)

      this.formIsCompelete = true
      this.$router.push({path: '/ha/'})

      // this.registerPatientOnline()
      alert('A new patient has been registered.')
    },
    registerPatientOnline: function () {

      // console.log(this.patientDataComputed)
      event.preventDefault()

      var data = {
        HaId: this.$store.state.currUser.HaId,
        name: this.patientData.name,
        gender: this.patientData.gender,
        age: this.patientData.age,
        ageType: this.patientData.ageType,
        phone: 1111,
        villOrCity: 'VILLAGE',
        stateId: this.patientDataComputed.state,
        districtId: '5f3e7eba43bec66f97b8f6ef',
        psId: '5f3e7eba43bec66f97b8f6ef',
        sdwOf: 'self.patientData.hswd',
        occupationId: '5f3e81a843bec66f97b8f6f3',
        cluster: this.$store.state.currUser.cluster
      }

      var headers = {      
        'Content-Type': 'application/json;charset=UTF-8',
      }
      
      const self = this

      // axios.post(this.baseURL + '/registerpatient', data, headers)
      //   .then(function (response) {
      //     console.log('Registration success: ');
      //     console.log(response.data);

      //     self.HaId = response.data
      //     self.patientData.objectID = response.data[0].objectid
      //     self.patientData.patientRegID = response.data[0].regno

      //     alert('Registration online successful.')

          self.registerPatient()
        // })
        // .catch(function (error) {
        //   console.log(error);
        //   // self.example = error
        //   alert('Registration online was NOT successful.')

        //   // self.$router.push({path: '/ha/'})
        // });
    },
  },
  data() {
    return {
      formIsCompelete: false,
      baseURL: 'https://powerful-thicket-49412.herokuapp.com',
      occupations: {
        selected: 'occupation',
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
      patientList: '',
      policeStations: {
        selected: 'policestation',
        options: [
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
        selected: 'district',
        options: [
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
        selected: 'state',
        options: [
          {
            "name": "West Bengal",
            "objectid": "5f3e7e6f43bec66f97b8f6ee"
          }, 
          {
            "name": "None",
            "objectid": "xxxxx"
          }
        ]
      },
      patientData: {
        objectID: '',
        patientRegID: '',
        name: "",
        occupation: "",
        gender: "m",
        age: "",
        ageType: 'years',
        hswd: '',
        address: "",
        address2: "",
        district: "",
        state: "",
        policeStation: "",
        phone: "",
        location: "",
        country: 'INDIA',
        patientHistory: {
          questions: {
            highBloodPressure: {
              title: 'High Blood Pressure',
              isActive: false,
            },
            heartAttack: {
              title: 'Heart Attack',
              isActive: false,
            },
            stroke: {
              title: 'Stroke',
              isActive: false,
            },
            diabetes: {
              title: 'Diabetes',
              isActive: false,
            },
            asthma: {
              title: 'Asthma',
              isActive: false,
            },
            tb: {
              title: 'Tuberculosis',
              isActive: false,
            },
            cancer: {
              title: 'Cancer',
              isActive: false,
            },
            other: {
              title: 'Other',
              isActive: false,
            },
            tobacco: {
              title: 'Tobacco',
              placeholder: 'Sticks/packs per day',
              isActive: false,
              value: 0,
            },
            alcohol: {
              title: 'Alcohol',
              placeholder: 'Cups/bottles per day',
              isActive: false,
              value: 0,
            },
          },
          generalDescription: ''
        },
        familyHistory: {
          questions: {
            highBloodPressure: {
              title: 'High Blood Pressure',
              isActive: false,
              relationship: ['']
            },
            heartAttack: {
              title: 'Heart Attack',
              isActive: false,
              relationship: ['']
            },
            stroke: {
              title: 'Stroke',
              isActive: false,
              relationship: ['']
            },
            diabetes: {
              title: 'Diabetes',
              isActive: false,
              relationship: ['']
            },
            asthma: {
              title: 'Asthma',
              isActive: false,
              relationship: ['']
            },
            tb: {
              title: 'Tuberculosis',
              isActive: false,
              relationship: ['']
            },
            cancer: {
              title: 'Cancer',
              isActive: false,
              relationship: ['']
            },
            other: {
              title: 'Other',
              isActive: false,
              relationship: ['']
            },
            tobacco: {
              title: 'Tobacco',
              placeholder: 'Sticks/packs per day',
              isActive: false,
              relationship: ['']
            },
            alcohol: {
              title: 'Alcohol',
              placeholder: 'Cups/bottles per day',
              isActive: false,
              relationship: ['']
            },
          },
          generalDescription: ''
        }
      },
      tabs: [
        {
          name: 'demographics',
          title: 'Patient Demographics',
          isActive: true,
          isEnabled: true
        },
        {
          name: 'medicalHistory',
          title: 'Patient Medical History',
          isActive: false,
          isEnabled: false
        },
        {
          name: 'familyHistory',
          title: 'Family Medical History',
          isActive: false,
          isEnabled: false
        },
      ]
    }
  }
}
</script>


<style>
.fake-link:hover {
  cursor: pointer;
}
</style>