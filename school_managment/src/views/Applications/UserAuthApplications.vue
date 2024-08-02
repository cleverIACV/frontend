<template>
    <div class="min-h-screen bg-gray-100">
      <!-- Banner -->
      <div class="relative">
        <img
          :src="'https://images.pexels.com/photos/6182776/pexels-photo-6182776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'"
          alt="Banner Image"
          class="w-full h-64 object-cover"
        />
        <div
          class="absolute inset-0 flex flex-col justify-center items-center text-white p-4"
        >
          <h1 class="text-4xl font-bold">Mes candidatures</h1>
        </div>
      </div>
      <!-- Header with Breadcrumb -->
      <div class="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Breadcrumb :crumbs="crumbs" />
      </div>
      <!-- Main Content -->
      <main class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- User Annonces Column -->
          <div class="md:col-span-3">
            <div v-if="loading" class="text-center">Chargement...</div>
            <div v-if="error" class="text-center text-red-500">{{ error }}</div>
            <div v-if="userApplications.length > 0" class="space-y-4">
              <div
                v-for="annonce in userApplications"
                :key="annonce.id"
                class="bg-white shadow-md rounded-lg p-6 cursor-pointer"
              >
                <div class="flex justify-between items-start">
                  <div 
                      class="flex justify-start flex-col items-start">
                    <h2 class="text-xl text-left font-bold mb-2">{{ annonce.title }}</h2>
                    <p class="text-gray-600 mb-2">{{ annonce.location }}</p>
                    <p class="text-gray-600 mb-4">{{ annonce.description }}</p>
                    <span
                      class="bg-black text-white py-1 px-3 rounded-full text-sm"
                      >{{ annonce.category }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center">Aucune candidatures trouvée</div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from "vuex";
  import Breadcrumb from "@/components/Breadcrumbs/breadcrumbs.vue";
  
  export default {
    name: "UserApplicationPage",
    components: {
      Breadcrumb,
    },
    data() {
      return {
        crumbs: [
          { text: "Home", path: "/" },
          { text: "Mes Annonces", path: this.$route.path },
        ],
      };
    },
    computed: {
      ...mapGetters("applications", ["userAuthApplication"]),
      ...mapGetters("users", ["getUserInfo"]),
      userApplications() {
        return this.userAuthApplication || [];
      },
      loading() {
        return this.$store.state.annoucement.userAuthAnnonceState.loading;
      },
      error() {
        return this.$store.state.annoucement.userAuthAnnonceState.error;
      },
    },
    methods: {
      ...mapActions("applications", ["getUserAuthApplication"]),
      viewAnnonceDetail(annonceId) {
        this.$router.push(`/annonce-details/${annonceId}`);
      },
    },
    mounted() {
      this.getUserAuthApplication().then(() => {
        console.log("Annonces:", this.userApplications);
      });
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  .bg-black {
    background-color: #000;
  }
  
  .text-black {
    color: #000;
  }
  
  .bg-gray-100 {
    background-color: #f7fafc;
  }
  
  .text-gray-600 {
    color: #718096;
  }
  
  .shadow-md {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  .rounded-lg {
    border-radius: 0.5rem;
  }
  </style>
  