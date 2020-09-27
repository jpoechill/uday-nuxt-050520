<template>
  <div>
    <div class="container mb-3" @change="print('Hello')">
      <div class="row px-3">
        <div class="col-md-12 text-center bg-white rounded py-5">
          <div class="position-relative mx-auto overflow-hidden" style="width: 200px;">
            <div class="position-absolute ">
              <!-- <img class="w-100 pb-2" src="/avatar-girl_04.png"> -->
              <!-- {{ this.$store.state.profileImage }} -->
              <img class="w-100 pb-2" :src="profileImage" alt="">
            </div>
            <div style="padding-bottom: 100%;"></div>
          </div>
          <br>
          <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input">
          <!-- <button class="btn btn-dark px-4 mb-3">Upload Photo</button> -->
        </div>
        <div class="col-md-12 bg-white rounded pb-3">
          <div class="container">
            <div class="row">
              <div class="col-md-12 text-muted small mb-0 ">
                Demographic Information
                <hr>
              </div>
              <div class="col-md-6">
                <label for="">Name</label>
                <input type="text" class="w-100 p-2 mb-3" v-model="currUser.name" placeholder="Full Name">
                <label for="">Gender</label>
                <select class="custom-select mb-3" v-model="currUser.demographics.gender">
                  <option selected disabled>Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <label for="">Phone Number</label>
                <input type="text" class="w-100 p-2 mb-3" v-model="currUser.demographics.phone" placeholder="Phone Number">
              </div>
              <div class="col-md-6">
                <label for="">Age</label>
                <input type="text" class="w-100 p-2 mb-3" v-model="currUser.demographics.age" placeholder="Age">

                <label for="">Occupation</label>
                <select class="custom-select mb-3" v-model="currUser.demographics.occupation">
                  <option selected disabled value="">Select Occupation</option>
                  <option v-for="(occupation, index) in occupations.options" :key="index" :value="{name: occupation.name, objectid: occupation.objectid}">{{ occupation.name }}</option>
                </select>

                <label for="">Husband/Wife/Son/Daughter of</label>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Family Members's Name">
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-12 text-muted small mb-0">
                Geographic Information
                <hr>
              </div>
              <div class="col-md-6">
                <label for="">Address</label>
                <input type="text" class="w-100 p-2 mb-3" v-model="currUser.demographics.address" placeholder="Address 1">
                <label for="">District</label>          
                <select class="custom-select mb-4" v-model="currUser.demographics.district">
                  <option selected disabled value="">Select District</option>
                  <option v-for="(district, index) in districts.options" :key="index" :value="{name: district.name, objectid: district.objectid, state: district.state}">{{ district.name }}</option>
                </select>
                <label for="">Police Station</label>
                <select class="custom-select mb-2" v-model="currUser.demographics.policeStation">
                  <option selected disabled value="">Select Police Station</option>
                  <option v-for="(policeStation, index) in policeStations.options" :key="index" :value="{district: policeStation.district, name: policeStation.name, objectid: policeStation.objectid}">{{ policeStation.name }}</option>
                  </select>
              </div>
              <div class="col-md-6">
                <label for="">Address 2</label>
                <input type="text" class="w-100 p-2 mb-3" placeholder="Address 2">
                <label for="">State</label>
                <select class="custom-select mb-2" v-model="currUser.demographics.state">
                  <option selected disabled value="">Select State</option>
                  <option v-for="(state, index) in states.options" :key="index" :value="{name: state.name, objectid: state.objectid}">{{ state.name }}</option>
                </select>
                <label for="" class="mt-3 pb-2">Country</label><br>
                  <em>
                    <strong>
                      INDIA
                    </strong>
                  </em>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-3">
      <div class="row">
        <div class="col-md-12">
          <button @click="submitChanges()" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1 text-uppercase">
            Save Profile Information
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  beforeRouteLeave (to, from , next) {
    if (!this.formIsCompelete) {
      const answer = window.confirm('You have unsaved changes. Are you sure you want to leave? ')
      
      answer ? next() : next(false);
    } else {
      next()
    }
  },
  methods: {
    uploadImage: function (event) {
      let data = new FormData();
      data.append('name', 'my-picture');
      data.append('file', event.target.files[0]); 

      this.encodeImage(event.target.files[0])
      console.log(data)
    },
    encodeImage (input) {
      if (input) {
        const reader = new FileReader()
        let self = this
        reader.onload = (e) => {
          // this.profileImage = e.target.result
          console.log('Image upload')
          self.$store.commit('updateProfileImage', e.target.result)
        }
        reader.readAsDataURL(input)
      }
    },
    print: function () {
      console.log('123')
    },
    submitChanges: function () {
      this.formIsCompelete = true

      alert('Your profile information has been updated.')

      this.$router.push({ path: '/ha/' })
    }
  },
  mounted() {
    let path = [
      {
        title: 'Dashboard',
        url: '/ha'
      },
      {
        title: 'View/Edit Profile',
        url: '/ha/register-new'
      },
    ]

    this.currUser = JSON.parse(JSON.stringify(this.$store.state.currUser))

    this.$store.commit('updatePath', path)
  },
  computed: {
    profileImage: function () {
      return this.$store.state.profileImage
    },
  },
  data() {
    return {
      formIsCompelete: false,
      currUser: {
        HaId: "",
        cluster: "",
        name: "",
        email: "",
        id: '',
        demographics: {
          gender: "",
          age: "",
          ageType: '',
          address: "",
          address2: "",
          occupation: {
            name: '',
            id: ''
          },
          district: {
            name: '',
            id: ''
          },
          policeStation: {
            name: '',
            id: ''
          },
          state: {
            name: '',
            id: ''
          },
          phone: "",
          location: ""
        }
      },
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
    }
  },
}
</script>

<style>
</style>
