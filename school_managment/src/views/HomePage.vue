<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header with Search Form -->
    <header class="bg-white shadow">
      <div class="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div class="text-3xl font-bold text-gray-900">superprof</div>
          <div class="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Que souhaitez-vous apprendre ?"
              class="border rounded-lg py-2 px-4 w-64"
              v-model="searchQuery"
            />
            <button
              @click="search"
              class="bg-red-500 text-white py-2 px-4 rounded-lg"
            >
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto py-10 px-4">
      <h1 class="text-4xl font-bold mb-6 text-center">
        Les professeurs de coaching sportif à proximité
      </h1>
      <div class="flex justify-center space-x-4 mb-6">
        <button class="bg-gray-200 rounded-full px-4 py-2">Type de cours</button>
        <button class="bg-gray-200 rounded-full px-4 py-2">Distance</button>
        <button class="bg-gray-200 rounded-full px-4 py-2">Tarif</button>
        <button class="bg-gray-200 rounded-full px-4 py-2">Niveau</button>
        <button class="bg-gray-200 rounded-full px-4 py-2">Temps de réponse</button>
      </div>
      <div class="text-center mb-6">{{ totalUsers }} professeurs disponibles</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        <div
          v-for="user in usersTeacher"
          :key="user._id"
          class="bg-white shadow-md rounded-lg overflow-hidden w-64 mx-auto"
        >
          <img
            :src="user.image"
            alt="Profile Image"
            class="w-full h-48 object-cover"
          />
          <div class="p-6">
            <h2 class="text-2xl font-bold">{{ user.name.firstname }} {{ user.name.lastname }}</h2>
            <div v-if="userAnnonces[user._id] && userAnnonces[user._id].length">
              <div class="mt-4">
                <span class="text-yellow-500">★</span>
                <span class="text-gray-600">({{ userAnnonces[user._id][0].reviews.length || 0 }} avis)</span>
              </div>
              <p class="mt-2 text-red-500">{{ userAnnonces[user._id][0].hourlyRate || 'N/A' }}€/h</p>
            </div>
            <button
              class="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg"
              @click="viewProfile(user._id)"
            >
              Voir le profil
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'HomePage',
  data() {
    return {
      searchQuery: '',
    };
  },
  computed: {
    ...mapGetters('usersProfile', ['allUsers']),
    ...mapGetters('annoucement', ['getAllUserAnnounceData']),
    usersTeacher() {
      return this.allUsers && this.allUsers.users;
    },
    totalUsers() {
      return this.usersTeacher && this.usersTeacher.length;
    },
    userAnnonces() {
      // Création d'un objet de correspondance des annonces par utilisateur
      const annoncesByUser = {};
      if (this.getAllUserAnnounceData && this.getAllUserAnnounceData.annonces && this.getAllUserAnnounceData.annonces.length) {
        this.getAllUserAnnounceData.annonces.forEach((annonce) => {
          if (!annoncesByUser[annonce.teacher._id]) {
            annoncesByUser[annonce.teacher._id] = [];
          }
          annoncesByUser[annonce.teacher._id].push(annonce);
        });
      }
      return annoncesByUser;
    }
  },
  methods: {
    ...mapActions('usersProfile', ['getAllUsers']),
    ...mapActions('annoucement', ['getAllUserAnnonces']),
    search() {
      this.getAllUsers({ mainSubject: this.searchQuery });
    },
    viewProfile(userId) {
      this.$router.push(`/profile/${userId}`);
    }
  },
  mounted() {
    this.getAllUsers({ page: 1, limit: 10 });
    this.getAllUserAnnonces();

    console.log(this.userAnnonces);
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
