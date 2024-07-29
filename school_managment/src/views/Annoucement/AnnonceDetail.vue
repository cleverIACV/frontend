<template>
  <div class="max-w-6xl mx-auto py-10" v-if="annonceData && userInfo">
    <div class="flex space-x-6">
      <!-- Profil de l'utilisateur -->
      <div class="w-1/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 userProfile">
        <div class="text-center">
          <img :src="userProfile && userProfile.image" alt="Profile Image" class="w-24 h-24 rounded-full mx-auto mb-4 imageCover">
          <h2 class="text-xl font-bold mb-2">{{ userInfo.name.firstname }} {{ userInfo.name.lastname }}</h2>
        </div>
        <div class="mt-4">
          <p class="text-gray-700"><strong>Tarif:</strong> {{ annonceData.hourlyRate }} €</p>
          <p class="text-gray-700"><strong>Réponse:</strong> {{ annonceData.responseTime }}</p>
          <p class="text-gray-700"><strong>Élèves:</strong> {{ userInfo.studentsCount || 'N/A' }}</p>
        </div>
        <div class="mt-6 text-center">
          <button class="bg-red-500 text-white py-2 px-4 rounded">Voir le profil</button>
        </div>
      </div>

      <!-- Détails de l'annonce -->
      <div class="w-2/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-left">
        <div class="tags-container">
          <p class="text-sm text-gray-500 mb-4 tags">{{ annonceData.mainSubject }}</p>
          <p class="text-sm text-gray-500 mb-4 tags">{{ annonceData.subSpecialties.join(', ') }}</p>
        </div>
        <h2 class="text-4xl font-bold mb-4">{{ annonceData.slug }}</h2>

        <h3 class="text-xl font-bold mb-2">Lieux du cours</h3>
        <p class="mb-4 note flex items-center">
          <MapPinIcon class="w-5 h-5 text-gray-500 mr-1" />
          chez {{ userInfo.name.firstname }}: {{ annonceData.city }}
        </p>

        <h3 class="text-xl font-bold mb-2">À propos de {{ userInfo.name.firstname }} {{ userInfo.name.lastname }}</h3>
        <p class="mb-6">{{ annonceData.description }}</p>

        <h3 class="text-xl font-bold mb-2">Description du cours </h3>
        <p class="mb-6">{{ annonceData.courseDescription }}</p>

        <h3 class="text-xl font-bold mb-2">Détails</h3>
        <ul class="list-disc pl-5 mb-6">
          <li>Mode de cours: {{ annonceData.courseMode }}</li>
          <li>Taux horaire: {{ annonceData.hourlyRate }} €</li>
        </ul>

        <h3 class="text-xl font-bold mb-2">Tarifs</h3>
        <table class="w-full text-left mb-6">
          <thead>
            <tr>
              <th class="border px-4 py-2">Tarif</th>
              <th class="border px-4 py-2">Tarifs packs</th>
              <th class="border px-4 py-2">Webcam</th>
              <th class="border px-4 py-2">Cours offert</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">{{ annonceData.hourlyRate }} €</td>
              <td class="border px-4 py-2">5h : 600 €<br>10h : 1 200 €</td>
              <td class="border px-4 py-2">{{ annonceData.hourlyRate }} €/h</td>
              <td class="border px-4 py-2">30mn</td>
            </tr>
          </tbody>
        </table>

        <h3 class="text-xl font-bold mb-2">Avis</h3>
        <div v-for="review in annonceData.reviews" :key="review._id" class="mb-4">
          <div class="flex items-center">
            <div class="text-lg font-bold">{{ review.user.name }}</div>
            <div class="ml-2 text-yellow-500">★ {{ review.rating }}</div>
          </div>
          <p>{{ review.comment }}</p>
        </div>

        <div class="text-center">
          <button class="bg-red-500 text-white py-2 px-4 rounded">Mettre à jour l'annonce</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center text-gray-500">Chargement...</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { MapPinIcon } from '@heroicons/vue/24/solid';

export default {
  name: 'AnnonceDetails',
  components: {
    MapPinIcon,
  },
  computed: {
    ...mapGetters('annoucement', ['getUserAuthAnnounceData']),
    ...mapGetters('users', ['getUserInfo']),
    ...mapGetters('usersProfile', ['userAuthProfile']),
    annonceData() {
      return this.getUserAuthAnnounceData ? this.getUserAuthAnnounceData.annonce : null;
    },
    userInfo() {
      return this.getUserInfo;
    },
    userProfile() {
      return this.userAuthProfile ? this.userAuthProfile.userProfile : null;
    },
  },
  methods: {
    ...mapActions('annoucement', ['getUserAuthAnnonce']),
    ...mapActions('usersProfile', ['getUserAuthProfile']),
  },
  mounted() {
    this.getUserAuthAnnonce();
    this.getUserAuthProfile();
  },
};
</script>

<style scoped>
.tags-container {
  width: 100%;
  padding: 0.3em;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
}
.tags {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--base-size-x1);
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 6px;
  padding-bottom: 6px;
  font-weight: 600;
  line-height: 0.8;
  white-space: nowrap;
  color: rgb(243, 86, 112);
  background-color: rgb(255, 216, 223);
  border-radius: 24px;
}
.note {
  display: flex;
  align-items: center;
  padding-left: 18px;
  padding-right: 18px;
  padding-top: 13px;
  padding-bottom: 13px;
  font-weight: 600;
  line-height: 0.8;
  white-space: nowrap;
  border-radius: 24px;
  border: 1px rgba(0, 0, 0, 0.3) solid;
  width: fit-content;
  font-size: 0.9rem;
}
.userProfile {
  height: fit-content;
}

.imageCover{
  object-fit: cover;
  object-position: center;
}
</style>
