<template>
  <div class="d-flex align-items-center" style="min-height: 100vh">
    <div class="container" v-if="showLoading">
      <div class="row">
        <div class="col-md-12">
          <div class="spinner mb-5">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-5" v-else>
      <div class="row text-center mx-2">
        <div class="shadow offset-md-4 col-md-4 bg-white rounded px-4 py-4">
          <div class="position-relative">
            <div class="position-absolute" style="left: 0; right: 0;">
              <img src="/uday-logo-orig.png" alt="">
            </div>
            <div style="padding-bottom: 44%;"></div>
          </div>
          <div class="text-secondary mt-1 pb-0">
            Welcome to Uday. 
          </div>
          <hr>
          <input type="text" name="" class="w-100 mb-2 p-2" placeholder="Username or Email" id="" v-model="email"><br>
          <input type="password" name="" class="w-100 p-2" v-model="password" placeholder="Password" id=""><br>
          <button @click="login" class="btn btn-dark mt-3 mb-2 p-2 w-100 text-uppercase">
            Login as HA
          </button>
          <nuxt-link to="/md">
            <button class="btn btn-dark mb-2 p-2 w-100 text-uppercase">
              Login as Doctor
            </button>
          </nuxt-link>
          <hr>
          <button class="btn mb-2 p-2 w-100 text-uppercase" :class="clearCacheState ? 'btn-dark' : 'btn-light'" @click="clearCache()">
            Clear Browser Cache
          </button>
          <nuxt-link to="/forgot-pass">
            <small class="text-secondary">Forgot password?</small>
          </nuxt-link>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <!-- <div class="container text-center mb-4 mt-5">
      <div class="row">
        <div class="col-md-12 text-secondary">
          <small>
            UdayHealth.org is a virtual, telemedicine application organized by medical professionals and volunteers worldwide.
          </small>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'default',
  data() {
    return {
      clearCacheState: false,
      email: 'poulami@gmail.com',
      password: 'abcd1234',
      type: 'HA',
      showLoading: false
    }
  },
  mounted() {
    // console.log('Local Storage')
    // console.log(localStorage)

    // console.log('Set data')
    // localStorage.setItem('key', 'value')

    // console.log('Get data')
    // localStorage.getItem('key')

  },
  methods: {
    clearCache() {
      let self = this
      this.clearCacheState = true

      setTimeout(() => {
        alert('The browser cache has been cleared. \n\n Please reload the page to completely clear all mock data.'); 
        localStorage.clear();
        self.clearCacheState = false
      }, 400)
    },
    login: function () {
      this.showLoading = true

      this.$store.commit('updateCurrUser', {
        HaId: "5f3eaf404be1fce03b7a5655",
        cluster: "5f3eacbde0dc1a1675cd2c1a",
        name: "Poulami Chakraborty",
        email: "poulami.chakraborty@udayhealth.org",
        id: 'xxxx',
        demographics: {
          gender: "female",
          age: "30",
          ageType: 'years',
          address: "5555 Market St.",
          address2: "",
          occupation: {
            name: "Student",
            objectid: "5f3e81a843bec66f97b8f6f3"
          },
          district: {
            name:  "Hooghly",
            objectid:  "5f3e864f43bec66f97b8f708",
            state:  "5f3e7e6f43bec66f97b8f6ee"
          },
          policeStation: {
            district: "5f6ccadc3a7d3d5dd5174782",
            name: "Pindar Valley",
            objectid: "5f6ccc723a7d3d5dd5174783"
          },
          state: {
            "name": "Uttarakhand",
            "objectid": "5f6cc9ce3a7d3d5dd5174781"
          },
          phone: "1 (415) 555-1234",
          location: "San Francisco, CA"
        }
      })

      this.$router.push({
        path: '/ha'
      })
    }
  }
}
</script>

<style>
.spinner {
  margin: auto;
  width: 70px;
  text-align: center;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: #333;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}
</style>
