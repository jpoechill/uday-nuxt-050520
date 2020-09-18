<template>
  <div class="d-flex align-items-center">
    <div class="container">
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
      type: 'HA'
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

      axios.post(this.$store.state.baseURL + '/login', data, headers)
        .then(function (response) {
          console.log(response.data);
          alert('You are logged in as ' + response.data[0].name + '.')
          
          self.$store.commit('updateCurrUser', response.data[0])

          self.$router.push({
            path: '/ha'
          })
        })
        .catch(function (error) {
          console.log(error);
          alert('Could not login.')
        });
    }
  }
}
</script>

<style>
/* .no-underline {

} */
</style>
