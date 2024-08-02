<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Banner -->
    <div class="relative">
      <img
        :src="'https://images.pexels.com/photos/5668863/pexels-photo-5668863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'"
        alt="Annonce Image"
        class="w-full h-64 object-cover"
      />
      <div
        class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4"
      >
        <h1 class="text-4xl font-bold">Découvrez nos dernières annonces</h1>
        <p class="text-lg mt-2">
          Trouvez des offres d'emploi qui correspondent à vos compétences et à
          votre localisation
        </p>
      </div>
    </div>

    <!-- Header with Search Form -->
    <header class="bg-white shadow">
      <div class="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-center">
          <div class="flex items-center space-x-4">
            Rechercher par :
            <input
              type="text"
              placeholder="Compétences"
              class="border rounded-lg py-2 px-4 w-64"
              v-model="searchQuery"
            />
            <input
              type="text"
              placeholder="Ville"
              class="border rounded-lg py-2 px-4 w-64"
              v-model="searchCity"
            />
            <!-- <button
              @click="search"
              class="bg-pink-500 text-white py-2 px-4 rounded-lg flex items-center"
            >
              <svg v-if="loading" class="spinner" viewBox="0 0 50 50">
                <circle
                  class="path"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke-width="5"
                ></circle>
              </svg>
              <span v-if="!loading">Rechercher</span>
              <span v-else class="ml-2">Recherche en cours...</span>
            </button> -->
          </div>
        </div>
      </div>
    </header>
    <!-- Breadcrumb -->
    <div class="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Breadcrumb :crumbs="crumbs" />
    </div>

    <!-- Sorting Section -->
    <div class="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-end space-x-4">
        <label for="sortField" class="text-gray-700">Trier par:</label>
        <select
          id="sortField"
          v-model="sortField"
          @change="fetchAnnonces"
          class="border rounded-lg py-2 px-4"
        >
          <option value="created_date">Date</option>
        </select>
        <select
          id="sortOrder"
          v-model="sortOrder"
          @change="fetchAnnonces"
          class="border rounded-lg py-2 px-4"
        >
          <option value="asc">Croissant</option>
          <option value="desc">Décroissant</option>
        </select>
      </div>
    </div>

    <!-- Main Content -->
    <div v-if="loading">Chargement...</div>
    <div v-if="error">{{ error }}</div>
    <main v-if="annonces" class="container mx-auto py-10 px-4">
      <h1 class="text-4xl font-bold mb-6 text-center">
        Les annonces et offres d'emplois dans votre domaine d'activité
      </h1>
      <div class="text-center mb-6">
        {{ annonces.length }} annonces disponibles
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
      >
        <div
          v-for="annonce in annonces"
          :key="annonce.id"
          class="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
        >
          <img
            :src="'https://images.pexels.com/photos/290275/pexels-photo-290275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'"
            alt="Annonce Image"
            class="w-full h-40 object-cover"
          />
          <div class="p-6 flex-1 text-left">
            <div class="mb-4">
              <h2 class="text-xl font-bold text-gray-800 mb-2">
                {{ annonce.title }}
              </h2>
              <p class="text-gray-500">{{ annonce.location }}</p>
            </div>
            <div class="mb-4 text-gray-600 line-clamp-2">{{ annonce.description }}</div>
            <div class="flex justify-start items-center">
              <button
                class="bg-pink-500 text-white py-2 px-4 rounded-lg"
                @click="viewDetail(annonce.id)"
              >
                Voir le détails de l'offre
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination controls -->
      <div class="flex justify-center space-x-2 mt-6">
        <!-- <button
          @click="prevPage"
          :disabled="page === 1"
          class="px-4 py-2 bg-gray-300 rounded"
        >
          Précédent
        </button> -->
        <!-- <button
          @click="nextPage"
          :disabled="!pagination.next"
          class="px-4 py-2 bg-gray-300 rounded"
        >
          Suivant
        </button> -->
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumbs/breadcrumbs.vue";

export default {
  name: "HomePage",
  components: {
    Breadcrumb,
  },
  data() {
    return {
      searchQuery: "",
      searchCity: "",
      page: 1,
      limit: 3,
      sortField: "created_date",
      sortOrder: "desc",
      crumbs: [
        { text: "Home", path: "/" },
        { text: "Détails", path: this.$route.path },
      ],
    };
  },
  computed: {
    ...mapGetters("annoucement", ["getAllUserAnnounceData"]),

    annonces() {
      return this.getAllUserAnnounceData || [];
    },
    error() {
      return this.$store.state.annoucement.allUserAnnonceState.error;
    },
    loading() {
      return this.$store.state.annoucement.allUserAnnonceState.loading;
    },
  },
  methods: {
    ...mapActions("annoucement", ["getAllUserAnnonces"]),
    search() {
      this.page = 1; // Reset to first page on search
      this.fetchAnnonces();
    },
    fetchAnnonces() {
      this.getAllUserAnnonces();
    },
    viewDetail(id) {
      this.$router.push(`/annonce-details/${id}`);
    },
    nextPage() {
      if (this.pagination.next) {
        this.page++;
        this.fetchAnnonces();
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchAnnonces();
      }
    },
  },
  mounted() {
    this.fetchAnnonces();
  },
};
</script>

<style scoped>
/* Add any additional styles here */
.bg-pink-500 {
  background-color: #e91e63;
}

.text-pink-500 {
  color: #e91e63;
}

.spinner {
  animation: spin 1s linear infinite;
  margin-right: 5px;
  width: 20px;
  height: 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spinner .path {
  stroke: #fff;
  stroke-linecap: round;
}
</style>
