<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 rounded">
          <ul class="list-inline">
            <li class="list-inline-item" v-for="(tab, index) in tabs" :key="index">
              <div class="btn px-3 small mr-1 pointer" type="button" @click="getTab(tab.name, tab.isEnabled)" :class="tab.isActive ? 'btn-dark' : 'btn-light'">
                {{ tab.title }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Patient Medical History -->
    <div class="container" v-if="tabs[0].isActive">
      <div class="row">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 px-3 pb-3" style="min-height: 100px;">
            <!-- Start Patient History -->
            <div class="row pt-3">
              <div class="col-md-12 small text-muted pb-2">
                Health Diagnosis
                <hr>
              </div>
              <div class="col-md-6" v-for="(patientQuestion, index) in patientHistory.questions" :key="index">
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
              <div class="col-md-12 small text-muted pb-0">
                General Notes
                <hr>
              </div>
              <div class="col-md-12 mb-4">
                <textarea v-model="patientHistory.generalDescription" class="w-100 form-control" rows="5" placeholder="Please provide any additional or relevant information"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" v-if="tabs[1].isActive">
      <div class="row">
        <div class="col-md-12 rounded">
          <div class="w-100 bg-white mb-3 px-3 pb-3" style="min-height: 100px;">
            <div class="row pt-3">
              <div class="col-md-12 small text-muted pb-2">
                Health Diagnosis
                <hr>
              </div>
              <div class="col-md-6" v-for="(patientQuestion, index) in familyHistory.questions" :key="index">
                <div v-if="patientQuestion.placeholder" class="form-check ml-5 mb-4">
                  <input class="form-check-input" v-model="patientQuestion.isActive" type="checkbox" value="" :id="'patientQuestions' + index">
                  <label class="form-check-label ml-3 fake-link" :for="'patientQuestions' + index">
                    {{ patientQuestion.title }}
                  </label><br>
                  <input type="number" v-model="patientQuestion.value" min="0" class="ml-3 mr-3 p-2 mt-3 w-25" placeholder="0"> Sticks/packs per day.
                </div>
                <div class="form-check ml-5 mb-4" v-else>
                  <input class="form-check-input" v-model="patientQuestion.isActive" type="checkbox" value="" :id="'patientQuestions' + index">
                  <label class="form-check-label ml-3 fake-link" :for="'patientQuestions' + index">
                    {{ patientQuestion.title }}
                  </label><br>
                  <select v-model="patientQuestion.relationship" class="custom-select w-75 ml-3 mt-3">
                    <option :selected="true" :disabled="true" value="">Relationship</option>
                    <option value="Parent">Parent</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Other Relationship">Other Relationship</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row pt-3">
              <div class="col-md-12 small text-muted pb-0">
                General Notes
                <hr>
              </div>
              <div class="col-md-12 mb-4">
                <textarea v-model="familyHistory.generalDescription" class="w-100 form-control" rows="5" placeholder="Please provide any additional or relevant information"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mb-4">
      <div class="row">
        <div class="col-md-12">
          <div>
            <nuxt-link to="/ha/profile">
              <button @click="saveHistory()" class="w-100 btn btn-dark rounded font-weight-bold py-3 mb-1 text-uppercase">
                Save Medical History
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
        title: 'View Demographics',
        url: '/ha/profile'
      }
    ])

    console.log()
    
    this.patientHistory =  JSON.parse(JSON.stringify(this.currPatient.demographics.patientHistory));
    this.familyHistory =  JSON.parse(JSON.stringify(this.currPatient.demographics.familyHistory));
  },
  computed: {
    currPatient: function () {
      return this.$store.state.currPatient
    }
  },
  methods: {
    saveHistory: function () {
      this.$store.commit('updateHistory', [this.patientHistory, this.familyHistory])
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

        if (ref == (tabs.length - 1)) {
          this.showComplete = true
        } else {
          this.showComplete = false
        }
      }
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

      if ((ref + 1) >= (tabs.length-1)) {
        this.showComplete = true
      } 

      tabs[ref + 1].isActive = true
    }
  },
  data() {
    return {
      patientHistory: {},
      familyHistory: {},
      showComplete: false,
      tabs: [
        {
          name: 'medicalHistory',
          title: 'Patient Medical History',
          isActive: true,
        },
        {
          name: 'familyMedicalHistory',
          title: 'Family Medical History',
          isActive: false,
        },
      ]
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
