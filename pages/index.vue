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
    <div class="container" v-else>
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
      email: 'poulami@gmail.com',
      password: 'abcd1234',
      type: 'HA',
      showLoading: false
    }
  },
  methods: {
    login: function () {
      var headers = {      
        'Content-Type': 'application/json;charset=UTF-8',
      }

      var data = {
        email: this.email,
        password: this.password,
        type: 'HA'
      }
      
    // this.$store.commit('updateCurrUser')
      const self = this

      this.showLoading = true

      axios.post(this.$store.state.baseURL + '/login', data, headers)
        .then(function (response) {
          console.log(response.data);
          // alert('Welcome ' + response.data[0].name + '.')
          
          self.$store.commit('updateCurrUser', response.data[0])

          self.$router.push({
            path: '/ha'
          })
        })
        .catch(function (error) {
          console.log(error);

          self.showLoading = false

          alert('Could not login.')
        });
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
