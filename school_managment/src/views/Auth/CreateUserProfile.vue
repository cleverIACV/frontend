<template>
  <div class="max-w-4xl mx-auto py-10">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <h2 class="text-2xl font-bold mb-4">Création de votre profil</h2>
        <div class="relative pt-1">
          <div class="flex mb-2 items-center justify-between">
            <div>
              <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200">
                Étape {{ currentStep }} sur 3
              </span>
            </div>
            <div class="text-right">
              <span class="text-xs font-semibold inline-block text-pink-600">
                {{ progressPercentage }}%
              </span>
            </div>
          </div>
          <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
            <div :style="{ width: progressPercentage + '%' }" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
          </div>
        </div>
      </div>

      <div v-if="currentStep === 1">
        <h2 class="text-xl font-bold mb-4">Informations personnelles</h2>
        <form @submit.prevent="nextStep">
          <!-- <div class="mb-4">
            <label for="image" class="block text-gray-700 text-sm font-bold mb-2">Image URL:</label>
            <input
              type="text"
              id="image"
              v-model="formData.image"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.image" class="text-red-500 text-xs italic">{{ errors.image }}</p>
          </div> -->
          <div class="mb-4">
            <label for="gender" class="block text-gray-700 text-sm font-bold mb-2">Genre:</label>
            <select
              id="gender"
              v-model="formData.gender"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Sélectionnez un genre</option>
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
              <option value="Other">Autre</option>
            </select>
            <p v-if="errors.gender" class="text-red-500 text-xs italic">{{ errors.gender }}</p>
          </div>
          <div class="mb-4">
            <label for="date_of_birth" class="block text-gray-700 text-sm font-bold mb-2">Date de naissance:</label>
            <input
              type="date"
              id="date_of_birth"
              v-model="formData.date_of_birth"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.date_of_birth" class="text-red-500 text-xs italic">{{ errors.date_of_birth }}</p>
          </div>
          <div class="mb-4">
            <label for="phone" class="block text-gray-700 text-sm font-bold mb-2">Numéro de téléphone:</label>
            <input
              type="text"
              id="phone"
              v-model="formData.phone"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.phone" class="text-red-500 text-xs italic">{{ errors.phone }}</p>
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
        <h2 class="text-xl font-bold mb-4">Adresse</h2>
        <form @submit.prevent="nextStep">
          <div class="mb-4">
            <label for="street" class="block text-gray-700 text-sm font-bold mb-2">Rue:</label>
            <input
              type="text"
              id="street"
              v-model="formData.street"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.street" class="text-red-500 text-xs italic">{{ errors.street }}</p>
          </div>
          <div class="mb-4">
            <label for="city" class="block text-gray-700 text-sm font-bold mb-2">Ville:</label>
            <input
              type="text"
              id="city"
              v-model="formData.city"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.city" class="text-red-500 text-xs italic">{{ errors.city }}</p>
          </div>
          <div class="mb-4">
            <label for="state" class="block text-gray-700 text-sm font-bold mb-2">État:</label>
            <input
              type="text"
              id="state"
              v-model="formData.state"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.state" class="text-red-500 text-xs italic">{{ errors.state }}</p>
          </div>
          <div class="mb-4">
            <label for="postal_code" class="block text-gray-700 text-sm font-bold mb-2">Code postal:</label>
            <input
              type="text"
              id="postal_code"
              v-model="formData.postal_code"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.postal_code" class="text-red-500 text-xs italic">{{ errors.postal_code }}</p>
          </div>
          <div class="mb-4">
            <label for="country" class="block text-gray-700 text-sm font-bold mb-2">Pays:</label>
            <input
              type="text"
              id="country"
              v-model="formData.country"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.country" class="text-red-500 text-xs italic">{{ errors.country }}</p>
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
        <h2 class="text-xl font-bold mb-4">Informations professionnelles</h2>
        <form @submit.prevent="handleSubmitProfile">
          <div class="mb-4">
            <label for="name_company" class="block text-gray-700 text-sm font-bold mb-2">Nom de l'entreprise:</label>
            <input
              type="text"
              id="name_company"
              v-model="formData.name_company"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.name_company" class="text-red-500 text-xs italic">{{ errors.name_company }}</p>
          </div>
          <div class="mb-4">
            <label for="phone_company" class="block text-gray-700 text-sm font-bold mb-2">Numéro de téléphone de l'entreprise:</label>
            <input
              type="text"
              id="phone_company"
              v-model="formData.phone_company"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.phone_company" class="text-red-500 text-xs italic">{{ errors.phone_company }}</p>
          </div>
          <div class="mb-4">
            <label for="job_title" class="block text-gray-700 text-sm font-bold mb-2">Intitulé du poste:</label>
            <input
              type="text"
              id="job_title"
              v-model="formData.job_title"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.job_title" class="text-red-500 text-xs italic">{{ errors.job_title }}</p>
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description:</label>
            <textarea
              id="description"
              v-model="formData.description"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
            <p v-if="errors.description" class="text-red-500 text-xs italic">{{ errors.description }}</p>
          </div>
          <div class="mb-4">
            <label for="degree_level" class="block text-gray-700 text-sm font-bold mb-2">Niveau de diplôme:</label>
            <input
              type="text"
              id="degree_level"
              v-model="formData.degree_level"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.degree_level" class="text-red-500 text-xs italic">{{ errors.degree_level }}</p>
          </div>
          <div class="mb-4">
            <label for="availability" class="block text-gray-700 text-sm font-bold mb-2">Disponibilité:</label>
            <input
              type="date"
              id="availability"
              v-model="formData.availability"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.availability" class="text-red-500 text-xs italic">{{ errors.availability }}</p>
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
        <p v-if="showMessage" class="mt-2 text-sm text-green-600">{{ message }}</p>
        <div class="flex justify-between mt-4" v-if="showMessage">
          <a href="/" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer">
            Retour à la page d'accueil
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
        <div>Étape {{ currentStep }} / 3</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CreateUserProfile",
  data() {
    return {
      formData: {
        image: null,
        gender: "",
        date_of_birth: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        name_company: "",
        phone_company: "",
        job_title: "",
        description: "",
        degree_level: "",
        availability: "",
      },
      errors: {},
      showMessage: false, // To control the visibility of the success message
    };
  },
  computed: {
    ...mapGetters("usersProfile", ["createdUserProfile"]),
    currentStep() {
      return parseInt(this.$route.params.step) || 1;
    },
    progressPercentage() {
      return Math.round((this.currentStep / 3) * 100);
    },
    message() {
      return this.$store.state.usersProfile.createdUserProfileState.success;
    },
    error() {
      return this.$store.state.usersProfile.createdUserProfileState.error;
    },
  },
  methods: {
    ...mapActions("usersProfile", ["saveUserProfileData", "createUserProfile"]),
    validateStep() {
      this.errors = {};
      // if (this.currentStep === 1 && !this.formData.image) {
      //   this.errors.image = "L'image est requise.";
      // }
      if (this.currentStep === 1 && !this.formData.gender) {
        this.errors.gender = "Le genre est requis.";
      }
      if (this.currentStep === 1 && !this.formData.date_of_birth) {
        this.errors.date_of_birth = "La date de naissance est requise.";
      } else if (this.currentStep === 1) {
        const today = new Date();
        const birthDate = new Date(this.formData.date_of_birth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (
          monthDifference < 0 ||
          (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        if (age < 18) {
          this.errors.date_of_birth = "Vous devez avoir au moins 18 ans.";
        }
      }
      if (this.currentStep === 1 && !this.formData.phone) {
        this.errors.phone = "Le numéro de téléphone est requis.";
      }
      if (this.currentStep === 2 && !this.formData.street) {
        this.errors.street = "La rue est requise.";
      }
      if (this.currentStep === 2 && !this.formData.city) {
        this.errors.city = "La ville est requise.";
      }
      if (this.currentStep === 2 && !this.formData.state) {
        this.errors.state = "L'état est requis.";
      }
      if (this.currentStep === 2 && !this.formData.postal_code) {
        this.errors.postal_code = "Le code postal est requis.";
      }
      if (this.currentStep === 2 && !this.formData.country) {
        this.errors.country = "Le pays est requis.";
      }
      if (this.currentStep === 3 && !this.formData.name_company) {
        this.errors.name_company = "Le nom de l'entreprise est requis.";
      }
      if (this.currentStep === 3 && !this.formData.phone_company) {
        this.errors.phone_company = "Le numéro de téléphone de l'entreprise est requis.";
      }
      if (this.currentStep === 3 && !this.formData.job_title) {
        this.errors.job_title = "L'intitulé du poste est requis.";
      }
      if (this.currentStep === 3 && !this.formData.description) {
        this.errors.description = "La description est requise.";
      }
      if (this.currentStep === 3 && !this.formData.degree_level) {
        this.errors.degree_level = "Le niveau de diplôme est requis.";
      }
      if (this.currentStep === 3 && !this.formData.availability) {
        this.errors.availability = "La disponibilité est requise.";
      }
      return Object.keys(this.errors).length === 0;
    },
    async nextStep() {
      if (this.validateStep()) {
        this.saveUserProfileData(this.formData);
        const nextStep = this.currentStep + 1;
        this.$router.push(`/create-profile/step-${nextStep}`);
      }
    },
    previousStep() {
      const prevStep = this.currentStep - 1;
      if (prevStep >= 1) {
        this.$router.push(`/create-profile/step-${prevStep}`);
      }
    },
    async handleSubmitProfile() {
      try {
        // Envoyer les données du formulaire
        await this.createUserProfile(this.formData);
        this.showMessage = true; // Afficher le message de succès après la soumission du profil
      } catch (error) {
        this.errors = error.response.data.errors || {
          general: "Une erreur est survenue",
        };
      }
    },
  },
  mounted() {
    if (this.createdUserProfile) {
      this.formData = { ...this.createdUserProfile };
    }
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
