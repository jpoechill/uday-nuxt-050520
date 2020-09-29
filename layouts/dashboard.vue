<template>
  <div>    
            <client-only>
    <transition name="u-fade" appear>
      <div>
        <!-- Header -->
        <div class="fixed-top">
          <div class="w-100 bg-dark text-white">
            <div class="container bg-dark">
              <div class="row py-2">
                <div class="col-md-12 pt-2"> 
                  <span v-if="this.$store.state.currUser.name" class="font-weight-bold" style="font-size: 24px;">
                    <nuxt-link to="/ha" class="text-white text-decoration-none">UD</nuxt-link>
                  </span>
                  <span v-else class="font-weight-bold" style="font-size: 24px;">
                    <nuxt-link to="/" class="text-white text-decoration-none">UD</nuxt-link>
                  </span>
                  <div class="float-right pt-1 dropdown d-inline">
                    <span class="dropdown-toggle dropdown-no-caret pointer" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <!-- ritwikaghosh48@gmail.org -->
                      <!-- {{ this.$store.state.currUser.name }} -->
                      {{ this.$store.state.currUser.email }}
                    </span>
                    <div class="dropdown-menu">
                      <nuxt-link to="/ha" class="dropdown-item">Dashboard</nuxt-link>
                      <div class="dropdown-divider"></div>
                      <nuxt-link to="/ha/edit-profile" class="dropdown-item">Edit Profile</nuxt-link>
                      <nuxt-link to="/ha/edit-password" class="dropdown-item">Change Password</nuxt-link>
                      <div class="dropdown-divider"></div>
                      <nuxt-link to="/ha/mis-reports" class="dropdown-item">MIS Reports</nuxt-link>
                      <!-- <div class="dropdown-divider"></div>
                      <div class="dropdown-item fake-link" @click="clearCache()">Clear Cache</div> -->
                    </div>
                      | 
                    <nuxt-link to="/" class="text-white">Logout</nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Start Body -->
        <div style="margin-top: 72px;">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <small>
                  <!-- {{ currPath }} -->
                  <span v-for="(path,index) in currPath" :key="index">
                    <span v-if="index !== currPath.length - 1">
                      <nuxt-link :to="path.url" class="text-muted">
                        {{ path.title }}</nuxt-link> 
                    </span>
                    <span v-else>
                      {{ path.title }}
                    </span>
                    <span v-if="index !== currPath.length - 1"> > </span>
                  </span>
                </small>
                <div class="float-right d-inline">
                  <small>Cluster {{ this.$store.state.currUser.cluster }}</small>
                </div>
                <!-- Lorem ipsum dolor sit amet. {{ counter }} <button @click="increment()">Click</button> <br> -->
                <!-- <button @click="increment()">Click</button> -->
              </div>
              <div class="col-md-12">
                <hr>
              </div>
            </div>
          </div>
          <transition appear name="u-fade" mode="out-in">
              <nuxt  />
            <!-- </client-only> -->
            <!-- :key="routerViewKey" -->
          </transition>
        </div>

        <!-- Footer -->
        <!-- <div class="container text-center mb-4">
          <div class="row">
            <div class="col-md-12 text-secondary">
              <small>
                UdayHealth.org is a virtual, telemedicine application organized by medical professionals and volunteers worldwide.
              </small>
            </div>
          </div>
        </div> -->
      </div>
    </transition>
        </client-only>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    counter () {
      return this.$store.state.counter
    },
    currPath () {
      return this.$store.state.currPath
    },
    // routerViewKey () {
    //   return this.$route.fullPath
    // }
  },
  data() {
    return {
      path: [
        // {
        //   title: 'Dashboard',
        //   url: '/ha'
        // },
      ]
    }
  },
  created() {
    console.log('BROWSER REFRESH')
    console.log('ROUTE: ')
    console.log(this.$route)

    // if (this.$route.fullPath !== '/ha') {
    //   this.$router.push({
    //     path: '/ha'
    //   })
    // }

    console.log(this.$store.state)
  },
  mounted () {
    this.setPath()
  },
  methods: {
    clearCache() {
      alert('The browser cache has been cleared.')
      localStorage.clear();
    },
    setPath () {
      // this.$store.commit('increment', this.path)
    },
    sendAlert (msg) {
      alert(msg)
    }
  },
  transition: 'u-fade'
}
</script>

<style>
html, body {
  background-color: #eee;
}

/* html {
  scroll-behavior: smooth;
} */

.underline {
  border-bottom: 2px solid #aaa;
}

.dropdown-no-caret:after { content: none }

.u-fade-enter-active, .u-fade-leave-active {
  transition: opacity .4s;
}
.u-fade-enter, .u-fade-leave-active {
  opacity: 0;
}

.u-fade-list-enter-active, .u-fade-list-leave-active {
  transition: opacity .4s;
  transform: translateY(30px);
}
.u-fade-list-enter, .u-fade-list-leave-active {
  opacity: 0;
}

tr.pointer td, tr.pointer th {
  padding-top: 7px;
}

.__layout {
  height: none;
}
</style>
