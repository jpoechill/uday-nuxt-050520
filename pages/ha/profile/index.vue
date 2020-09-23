<template>
  <div>
    <div class="container">
      <transition appear name="u-fade">
        <div class="row">
          <div class="col-md-3 text-left responsive-padding-bottom" style="min-height: 200px;">
            <div class="position-relative">
              <div class="position-absolute">
                <nuxt-link to="/ha/profile">
                  <img class="w-100" src="/avatar-man_09.png">
                </nuxt-link>
              </div>
              <div class="w-100" style="padding-bottom: 100%;"></div>
            </div>
          </div>
          <div class="col-md-9">
            <div class="row">
              <div class="col-md-12 text-capitalize">
                <h5 class="d-inline text-decoration-none">{{ currPatient.demographics.name ? currPatient.demographics.name : '' }} </h5>  
                <div class="d-inline float-right">
                  <!-- {{ currPatient }} -->
                  <img v-if="currPatient.status == 'registered'" src="/circle-green.svg" class="shape-status" alt="">
                  <img v-if="currPatient.status == 'released'" src="/circle-yellow.svg" class="shape-status" alt="">
                  <img v-if="currPatient.status == 'allocated'" src="/circle-red.svg" class="shape-status" alt="">
                  <img v-if="currPatient.status == 'queued'" src="/circle-orange.svg" class="shape-status" alt="">
                  {{ currPatient.status }}
                </div>
              </div>
            </div>
            <br>
            
            <div class="row">
              <div class="col-md-6"> 
                {{ currPatient.demographics.occupation.name }} | {{ currPatient.demographics.age }} {{ currPatient.demographics.ageType }} old <br>
                {{ currPatient.demographics.phone }} <br>
                {{ currPatient.demographics.policeStation.name }}
              </div>
              <div class="col-md-6">
                {{ currPatient.demographics.address }} <br>
                {{ currPatient.demographics.district.name }} <br>
                {{ currPatient.demographics.state.name }}, IN
              </div>
              <div class="col-md-12 mt-1">
                <hr>
              </div>
              <div class="col-md-12">
                <nuxt-link to="/ha/profile/">
                  <button class="btn btn-light py-1 px-3">
                    <small>
                      All Visits
                    </small>
                  </button>
                </nuxt-link>
                <nuxt-link to="/ha/profile/update-demo" class="mr-2">
                  <button class="btn btn-light py-1 px-3">
                    <small>
                      View Demographics
                    </small>
                  </button>
                </nuxt-link>
                <nuxt-link to="/ha/profile/update-history">
                  <button class="btn btn-light py-1 px-3">
                    <small>
                      View Medical History 
                    </small>
                  </button>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="row">
        <div class="col-md-12">
          <hr>
        </div>
      </div>
    </div>

    <transition name="u-fade" :key="routerViewKey">
      <nuxt-child />
    </transition>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  computed: {
    currPatient: function () {
      return this.$store.state.currPatient
    },
    routerViewKey () {
      return this.$route.fullPath
    }
  },
  data() {
    return {
      showDemographics: true,
      loaded: false,
      fullPath: [
        {
          title: 'Dashboard',
          url: '/ha'
        },
        {
          title: 'Patient\'s Profile',
          url: '/ha'
        },
      ]
    }
  },
  mounted () {
    console.log('ooga booga') 

    let queryID = this.$route.query.id
    console.log('Query ID: ' + queryID)
    console.log('Curr Pateint ID: ' + this.$store.state.currPatient.id)

    // this.$store.commit('updateCurrPatient', { id: queryID })
    if (queryID !== this.$store.state.currPatient.id) {
      // request ID does not equal curr ID,
      // get that patient profile
      this.$store.commit('updateCurrPatient', { id: queryID })
    } else {
      // display current Patient in store
      // console.log(this.currPatient.demographics)

      // this.$store.commit('clearVisitID')

      window.scrollTo(0, 0);
    }

    this.$store.commit('updatePath', this.fullPath)
  },
  transition: 'u-fade'
}
</script>

<style>
.u-fade-enter-active, .u-fade-leave-active {
  transition: opacity .4s;
}
.u-fade-enter, .u-fade-leave-active {
  opacity: 0;
}

@media only screen and (max-width: 600px) {
  .responsive-padding-bottom {
    padding-bottom: 2rem!important;;
  }
}
</style>
