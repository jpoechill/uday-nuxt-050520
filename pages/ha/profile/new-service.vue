<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <ul class="list-inline">
            <!-- <li class="list-inline-item">
              <button class="btn btn-light px-3 small">
                {{ this.$store.state.currEpisode.title }}
              </button>
            </li> -->
            <li class="list-inline-item">
              <button class="btn btn-dark px-3 small">
                New Service 
                <!-- (for Episode: {{ this.$store.state.currEpisode.episodeID }}) -->
                 <!-- {{ this.$store.state.currEpisode }} -->
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline mb-2">
            <li class="list-inline-item mr-0">
              <div class="px-2 mr-2 pb-1 mb-1 underline" role="button">
                Service Details
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 mt-0 px-3 pt-3 pb-3" style="min-height: 200px;" v-if="tabs[0].isActive">
            <div class="row mt-1">
              <div class="col-md-12 text-muted small mb-3">
                  Please describe details relating to the service performed.
                </div>
              <div class="col-md-12">
                <label for="">What service did you provide?</label><br>
                <button class="btn mb-2 mr-2" :class="service.isActive ? 'btn-dark' : 'btn-light'" v-for="(service, index) in serviceOptions" :key="index" @click="handleServiceOptions(index)">
                  {{ service.title }}
                </button>
              </div>
              <div class="col-md-12 mt-2">
                <label for="">What were the results?</label>
                <input type="text" class="w-100 p-2 mb-3" v-model="serviceDetails.serviceResults" placeholder="Describe the results from the tests performed">
              </div>
              <div class="col-md-12 mt-2">
                <label for="">Please provide any additional information</label>
                <textarea class="w-100 p-2" rows="5" v-model="serviceDetails.serviceDescription" placeholder="Additional information..."></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mb-3">
      <div class="row">
        <div class="col-md-12">
          <nuxt-link :to="'/ha/profile/visit?id=' + this.$store.state.currEpisode.episodeID" v-if="this.$store.state.currEpisode.episodeID"> 
            <button @click="recordNewService()" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">Record New Service</button>
          </nuxt-link>
          <nuxt-link :to="'/ha/profile/'" v-else> 
            <button @click="recordNewService()" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1  text-uppercase">Record New Service</button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  mounted () {
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
        title: 'New Service',
        url: '/ha/new-service'
      },
    ])
  },
  methods: {
    recordNewService: function () {
      alert('A new service has been recorded.')

      this.formIsCompelete = true

      const episodeID = this.$route.query.id

      this.$store.commit('recordNewService', [this.serviceDetails, episodeID])
    },
    handleServiceOptions: function (serviceIndex) {
      let self = this
      this.serviceOptions.forEach((service, index) => {
        if (index === serviceIndex) {
          service.isActive = true
          self.serviceDetails.chiefComplaints = [[service.title]]
        } else {
          service.isActive = false
        }
      })
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
  data() {
    return {
      formIsCompelete: false,
      list: [],
      serviceDetails: {
        chiefComplaints: [[]],
        serviceResults: '',
        serviceDescription: '',
      },
      currService: '',
      serviceOptions: [
        {
          name: 'ecg',
          title: 'ECG',
          isActive: false
        },
        {
          name: 'bloodtest',
          title: 'Blood Test',
          isActive: false
        },
        {
          name: 'bloodtest',
          title: 'Blood Test',
          isActive: false
        },
        {
          name: 'xray',
          title: 'X-Ray',
          isActive: false
        },
        {
          name: 'mri',
          title: 'MRI',
          isActive: false
        },
        {
          name: 'ctscan',
          title: 'CT Scan',
          isActive: false
        }
      ],
      showDemographics: true,
      showComplete: false,
      tabs: [
        {
          name: 'allocated',
          title: 'Service Details',
          isActive: true,
        }
      ]
    }
  },
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
