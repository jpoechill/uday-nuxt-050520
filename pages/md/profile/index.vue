<template>
  <div>
    <div class="container">
      <transition name="u-fade">
        <div class="row">
          <div class="col-md-3 mt-2 text-left" style="min-height: 200px;">
            <div class="position-relative">
              <div class="position-absolute">
                <img class="w-100" src="/avatar-man_08.png">
              </div>
              <div class="w-100" style="padding-bottom: 100%;"></div>
            </div>
          </div>
          <div class="col-md-9 mt-2">
            <div class="row">
              <div class="col-md-6">
                <h5 class="d-inline text-decoration-none">{{ currPatient.demographics.name }} </h5>  
              </div>
              <div class="col-md-6 text-right text-capitalize">
                <img v-if="currPatient.status == 'registered'" src="/circle-green.svg" class="shape-status" alt="">
                <img v-if="currPatient.status == 'released'" src="/circle-yellow.svg" class="shape-status" alt="">
                <img v-if="currPatient.status == 'allocated'" src="/circle-red.svg" class="shape-status" alt="">
                <img v-if="currPatient.status == 'queued'" src="/circle-orange.svg" class="shape-status" alt="">
                {{ currPatient.status }}
              </div>
            </div>
            <br>
            
            <div class="row">
              <div class="col-md-6">
                {{ currPatient.demographics.occupation.name }} <br>
                {{ currPatient.demographics.phone }} <br>
                {{ currPatient.demographics.hswd }} <br><br>
                {{ currPatient.demographics.location }}
              </div>
              <div class="col-md-6">
                {{ currPatient.demographics.address }} <br>
                {{ currPatient.demographics.address2 }} <br>
                {{ currPatient.demographics.age }} years old <br>
                <br>
                {{ currPatient.demographics.policeStation.name }}<br><br>
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
      <!-- <nuxt-child /> -->
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
  mounted() {
    if (this.$store.state.currPatient.id === "") {
      this.$router.push({
          path: '/md/'
      })
    }
  },
  data() {
    return {
      showDemographics: true,
      fullPath: [
        {
          title: 'Doctor\'s Dashboard',
          url: '/md'
        },
        {
          title: 'Patient\'s Profile',
          url: '/md/profile'
        },
      ]
    }
  },
  created() {
    // this.$store.commit('increment', this.fullPath)
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
</style>
