<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Breadcrumb -->
    <div class="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Breadcrumb :crumbs="crumbs" />
    </div>
    <!-- Main Content -->
    <main class="container mx-auto px-4">
      <div v-if="loading" class="text-center">Chargement...</div>
      <div v-if="error" class="text-center text-red-500">{{ error }}</div>
      <div v-if="annonce" class="bg-white shadow-md rounded-lg overflow-hidden">
        <!-- Banner Image -->
        <div class="relative">
          <img
            :src="
              annonce.image ||
              'https://images.pexels.com/photos/5668863/pexels-photo-5668863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            "
            alt="Annonce Image"
            class="w-full h-64 object-cover"
          />
          <div
            class="flex flex-col justify-start items-start text-left absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4"
          >
            <h1 class="text-4xl font-bold">{{ annonce.title }}</h1>
            <p class="text-lg">{{ annonce.company_name }}</p>
          </div>
        </div>
        <!-- Action Buttons -->
        <div class="flex p-6 space-x-4">
          <button
            v-if="!isRecruiter && !applicationLoading"
            @click="handleApplicationSubmit"
            class="bg-pink-500 text-white py-2 px-4 rounded-lg"
          >
            Postuler
          </button>
          <button
            v-if="!isRecruiter && applicationLoading"
            class="bg-pink-500 text-white py-2 px-4 rounded-lg"
            disabled
          >
            Postulation en cours...
          </button>
          <button
            class="bg-gray-200 text-black py-2 px-4 rounded-lg flex items-center"
          >
            <i class="fas fa-heart mr-2"></i>
            Sauvegarder
          </button>
          <button
            v-if="!isRecruiter"
            class="bg-blue-900 text-white py-2 px-4 rounded-lg"
          >
            Evaluer votre candidature
          </button>
        </div>
        <!-- Display Application Error -->
        <div v-if="applicationError" class="text-center text-red-500 mt-4">{{ applicationError }}</div>
        <!-- Details Section -->
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <span class="bg-black text-white py-1 px-3 rounded-full text-sm">{{
              annonce.location
            }}</span>
          </div>
          <h2 class="text-2xl font-bold mb-2 flex justify-start">
            Description du poste
          </h2>
          <p class="text-gray-600 mb-4 flex justify-start text-left">
            {{ annonce.description }}
          </p>

          <h2 class="text-2xl font-bold mb-2 flex justify-start">
            Requis pour le poste
          </h2>
          <p class="text-gray-600 mb-4 flex justify-start">
            {{ annonce.requirements }}
          </p>
        </div>
        <div class="p-6 flex justify-between items-center">
          <p class="text-gray-600 flex justify-start">
            Publié le : {{ annonce.created_date }} -
          </p>
          <p class="text-gray-600 flex justify-start">
            Deadline : {{ annonce.deadline }} -
          </p>
        </div>
      </div>
      <!-- Job Applications Table -->
      <div v-if="jobApplications && jobApplications.length > 0" class="bg-white shadow-md rounded-lg overflow-hidden mt-6">
        <h2 class="text-2xl font-bold p-6">Applications</h2>
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b border-gray-200 text-left text-gray-800">Candidate ID</th>
              <th class="py-2 px-4 border-b border-gray-200 text-left text-gray-800">Job ID</th>
              <th class="py-2 px-4 border-b border-gray-200 text-left text-gray-800">Status</th>
              <th class="py-2 px-4 border-b border-gray-200 text-left text-gray-800">Score</th>
              <th class="py-2 px-4 border-b border-gray-200 text-left text-gray-800">Review</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="application in jobApplications" :key="application.id">
              <td class="py-2 px-4 border-b border-gray-200">{{ application.candidate }}</td>
              <td class="py-2 px-4 border-b border-gray-200">{{ application.job }}</td>
              <td class="py-2 px-4 border-b border-gray-200">{{ application.status }}</td>
              <td class="py-2 px-4 border-b border-gray-200">{{ application.score }}</td>
              <td class="py-2 px-4 border-b border-gray-200">{{ application.review }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="!jobApplications || jobApplications.length === 0" class="bg-white shadow-md rounded-lg overflow-hidden mt-6">
        <h4 class="text-2xl text-left font-bold p-6">Aucune candidature enregistrée</h4>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumbs/breadcrumbs.vue";

export default {
  data() {
    return {
      annonceId: this.$route.params.id,
      crumbs: [
        { text: "Home", path: "/" },
        { text: this.$route.path, path: this.$route.path },
      ],
      errors: {},
    };
  },
  components: {
    Breadcrumb,
  },
  computed: {
    ...mapGetters("annoucement", ["getAnnonceDetailData"]),
    ...mapGetters("users", ["isAuthenticated", "getUserInfo"]),
    ...mapGetters("usersProfile", ["userAuthProfile"]),
    ...mapGetters("applications", ["getAllJobApplications", "createdApplication"]),
    
    userProfileId() {
      return this.userAuthProfile.id;
    },
    annonce() {
      return this.getAnnonceDetailData;
    },
    loading() {
      return this.$store.state.annoucement.selectedAnnonceDetail.loading;
    },
    error() {
      return this.$store.state.annoucement.selectedAnnonceDetail.error;
    },
    isRecruiter() {
      return this.getUserInfo && this.getUserInfo.group === "recruiter";
    },
    jobApplications() {
      return this.getAllJobApplications;
    },
    applicationLoading() {
      return this.$store.state.applications.createApplicationState.loading;
    },
    applicationError() {
      return this.$store.state.applications.createApplicationState.error;
    },
  },
  methods: {
    ...mapActions("annoucement", ["getAnnonceById"]),
    ...mapActions("applications", ["addApplication", "getAllJobApplication"]),
    ...mapActions("usersProfile", ["getUserAuthProfile"]),

    async handleApplicationSubmit() {
      try {
        const applicationData = {
          candidate: this.userProfileId,
          job: this.annonceId,
          status: "pending",
          score: 0,
          review: "string"
        };
        await this.addApplication(applicationData);
      } catch (error) {
        this.errors = error.response.data || { general: "Une erreur est survenue lors de la soumission de votre candidature." };
      }
    },
    async fetchJobApplications() {
      try {
        await this.getAllJobApplication(this.annonceId);
      } catch (error) {
        this.errors = error.response.data || { general: "Une erreur est survenue lors de la récupération des candidatures." };
      }
    },
    search() {
      // Implémentation de la recherche
    },
  },
  mounted() {
    this.getAnnonceById(this.annonceId);
    this.getUserAuthProfile();
    this.fetchJobApplications();
  },
};
</script>

<style scoped>
.bg-pink-500 {
  background-color: #e91e63;
}

.text-pink-500 {
  color: #e91e63;
}

.bg-black {
  background-color: #000;
}

.text-black {
  color: #000;
}

.bg-gray-200 {
  background-color: #f7fafc;
}

.text-gray-600 {
  color: #718096;
}
</style>
