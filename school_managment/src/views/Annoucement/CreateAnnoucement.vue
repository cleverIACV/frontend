<template>
  <div class="max-w-4xl mx-auto py-10">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <h2 class="text-2xl font-bold mb-4">Création de votre annonce</h2>
        <div class="relative pt-1">
          <div class="flex mb-2 items-center justify-between">
            <div>
              <span
                class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200"
              >
                Étape {{ currentStep }} sur 4
              </span>
            </div>
            <div class="text-right">
              <span class="text-xs font-semibold inline-block text-pink-600">
                {{ progressPercentage }}%
              </span>
            </div>
          </div>
          <div
            class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200"
          >
            <div
              :style="{ width: progressPercentage + '%' }"
              class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
            ></div>
          </div>
        </div>
      </div>

      <div v-if="currentStep === 1">
        <h2 class="text-xl font-bold mb-4">Titre de votre annonce</h2>
        <form @submit.prevent="nextStep">
          <div class="mb-4">
            <label for="slug" class="block text-gray-700 text-sm font-bold mb-2"
              >Titre:</label
            >
            <input
              type="text"
              id="slug"
              v-model="formData.slug"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.slug" class="text-red-500 text-xs italic">
              {{ errors.slug }}
            </p>
          </div>
          <div class="mb-4">
            <label
              for="mainSubject"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Sujet principal:</label
            >
            <input
              type="text"
              id="mainSubject"
              v-model="formData.mainSubject"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.mainSubject" class="text-red-500 text-xs italic">
              {{ errors.mainSubject }}
            </p>
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Suivant
            </button>
          </div>
        </form>
      </div>

      <div v-else-if="currentStep === 2">
        <h2 class="text-xl font-bold mb-4">Description du cours</h2>
        <form @submit.prevent="nextStep">
          <div class="mb-4">
            <label
              for="description"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Description de vous:</label
            >
            <textarea
              id="description"
              v-model="formData.description"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
            <p v-if="errors.description" class="text-red-500 text-xs italic">
              {{ errors.description }}
            </p>
          </div>
          <div class="mb-4">
            <label
              for="courseDescription"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Description du cours:</label
            >
            <textarea
              id="courseDescription"
              v-model="formData.courseDescription"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
            <p
              v-if="errors.courseDescription"
              class="text-red-500 text-xs italic"
            >
              {{ errors.courseDescription }}
            </p>
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Suivant
            </button>
          </div>
        </form>
      </div>

      <div v-else-if="currentStep === 3">
        <h2 class="text-xl font-bold mb-4">Détails du cours</h2>
        <form @submit.prevent="nextStep">
          <div class="mb-4">
            <label
              for="subSpecialties"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Sous-spécialités:</label
            >
            <input
              type="text"
              id="subSpecialties"
              v-model="formData.subSpecialties"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.subSpecialties" class="text-red-500 text-xs italic">
              {{ errors.subSpecialties }}
            </p>
          </div>
          <div class="mb-4">
            <label
              for="courseMode"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Mode de cours:</label
            >
            <select
              id="courseMode"
              v-model="formData.courseMode"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Sélectionnez un mode</option>
              <option value="In-person">En personne</option>
              <option value="Webcome">En ligne</option>
            </select>
            <p v-if="errors.courseMode" class="text-red-500 text-xs italic">
              {{ errors.courseMode }}
            </p>
          </div>
          <div class="mb-4">
            <label for="city" class="block text-gray-700 text-sm font-bold mb-2"
              >Ville:</label
            >
            <multiselect
              v-model="formData.city"
              :options="cities"
              :searchable="true"
              :close-on-select="true"
              placeholder="Sélectionnez une ville"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.city" class="text-red-500 text-xs italic">
              {{ errors.city }}
            </p>
          </div>
          <div class="mb-4">
            <label
              for="hourlyRate"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Taux horaire:</label
            >
            <input
              type="number"
              id="hourlyRate"
              v-model="formData.hourlyRate"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.hourlyRate" class="text-red-500 text-xs italic">
              {{ errors.hourlyRate }}
            </p>
          </div>
          <div class="mb-4">
            <label
              for="responseTime"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Temps de réponse:</label
            >
            <select
              id="responseTime"
              v-model="formData.responseTime"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Sélectionnez un temps</option>
              <option value="1h">1 heure</option>
              <option value="2h">2 heures</option>
              <option value="24h">24 heures</option>
            </select>
            <p v-if="errors.responseTime" class="text-red-500 text-xs italic">
              {{ errors.responseTime }}
            </p>
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Suivant
            </button>
          </div>
        </form>
      </div>

      <div v-else-if="currentStep === 4">
        <h2 class="text-xl font-bold mb-4">Résumé de votre annonce</h2>
        <form @submit.prevent="handleSubmitAnnouncement">
          <div class="mb-4">
            <p class="text-gray-700">
              <strong>Titre:</strong> {{ formData.slug }}
            </p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700">
              <strong>Description:</strong> {{ formData.description }}
            </p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700">
              <strong>Description du cours:</strong>
              {{ formData.courseDescription }}
            </p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700">
              <strong>Sous-spécialités:</strong> {{ formData.subSpecialties }}
            </p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700">
              <strong>Mode de cours:</strong> {{ formData.courseMode }}
            </p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700">
              <strong>Ville:</strong> {{ formData.city }}
            </p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700">
              <strong>Taux horaire:</strong> {{ formData.hourlyRate }} €
            </p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700">
              <strong>Temps de réponse:</strong> {{ formData.responseTime }}
            </p>
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Soumettre
            </button>
          </div>
        </form>
        <p v-if="showMessage" class="mt-2 text-sm text-green-600">
            {{ message }}
          </p>
          <div class="flex justify-between mt-4" v-if="showMessage">
          <a
            href="/"
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
          >
            Retour a la page d'acceuil
          </a>
        </div>
      </div>

      <div class="flex justify-between mt-4">
        <button
          v-if="currentStep > 1"
          @click="previousStep"
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Retour
        </button>
        <div>Étape {{ currentStep }} / 4</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Multiselect from "vue-multiselect";
import { cities } from "@/assets/cities/cities.js";

export default {
  name: "CreateAnnouncement",
  components: {
    Multiselect,
  },
  data() {
    return {
      formData: {
        slug: "",
        description: "",
        courseDescription: "",
        mainSubject: "",
        subSpecialties: "",
        courseMode: "",
        city: "",
        hourlyRate: "",
        responseTime: "",
      },
      errors: {},
      cities,
      showMessage: false,
    };
  },
  computed: {
    ...mapGetters("annoucement", ["announceCreatedData"]),
    currentStep() {
      return parseInt(this.$route.params.step) || 1;
    },
    progressPercentage() {
      return Math.round((this.currentStep / 4) * 100);
    },
    message() {
      return this.$store.state.annoucement.annonceCreatedState.success;
    },
  },
  methods: {
    ...mapActions("annoucement", [
      "saveAnnouncementData",
      "submitAnnouncement",
    ]),
    validateStep() {
      this.errors = {};
      if (this.currentStep === 1 && !this.formData.slug) {
        this.errors.slug = "Le titre est requis.";
      }
      if (this.currentStep === 1 && this.formData.slug.split(" ").length > 10) {
        this.errors.slug = "Le titre ne doit pas dépasser 10 mots.";
      }
      if (this.currentStep === 2 && !this.formData.description) {
        this.errors.description = "La description est requise.";
      }
      if (this.currentStep === 2 && !this.formData.courseDescription) {
        this.errors.courseDescription = "La description du cours est requise.";
      }
      if (this.currentStep === 3 && !this.formData.courseMode) {
        this.errors.courseMode = "Le mode de cours est requis.";
      }
      if (this.currentStep === 3 && !this.formData.city) {
        this.errors.city = "La ville est requise.";
      }
      if (this.currentStep === 3 && !this.formData.hourlyRate) {
        this.errors.hourlyRate = "Le taux horaire est requis.";
      }
      if (this.currentStep === 3 && !this.formData.responseTime) {
        this.errors.responseTime = "Le temps de réponse est requis.";
      }
      return Object.keys(this.errors).length === 0;
    },
    async nextStep() {
      if (this.validateStep()) {
        this.saveAnnouncementData(this.formData);
        const nextStep = this.currentStep + 1;
        this.$router.push(`/create-announcement/step-${nextStep}`);
      }
    },
    previousStep() {
      const prevStep = this.currentStep - 1;
      if (prevStep >= 1) {
        this.$router.push(`/create-announcement/step-${prevStep}`);
      }
    },
    async handleSubmitAnnouncement() {
      try {
        await this.submitAnnouncement(this.formData);
        this.showMessage = true;
      } catch (error) {
        this.errors = error.response.data.errors || {
          general: "Une erreur est survenue",
        };
      }
    },
  },
  mounted() {
    this.formData = { ...this.announceCreatedData };
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
