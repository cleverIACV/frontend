<template>
  <div class="max-w-4xl mx-auto py-10">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <h2 class="text-2xl font-bold mb-4">Création de votre annonce</h2>
        <div class="relative pt-1">
          <div class="flex mb-2 items-center justify-between">
            <div>
              <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200">
                Étape {{ currentStep }} sur 4
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
        <h2 class="text-xl font-bold mb-4">Informations de base</h2>
        <form @submit.prevent="nextStep">
          <div class="mb-4">
            <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Titre de l'offre :</label>
            <input type="text" id="title" v-model="formData.title" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <p v-if="errors.title" class="text-red-500 text-xs italic">{{ errors.title }}</p>
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description:</label>
            <textarea id="description" v-model="formData.description" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            <p v-if="errors.description" class="text-red-500 text-xs italic">{{ errors.description }}</p>
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Suivant</button>
          </div>
        </form>
      </div>

      <div v-else-if="currentStep === 2">
        <h2 class="text-xl font-bold mb-4">Exigences et localisation</h2>
        <form @submit.prevent="nextStep">
          <div class="mb-4">
            <label for="requirements" class="block text-gray-700 text-sm font-bold mb-2">Exigences:</label>
            <textarea id="requirements" v-model="formData.requirements" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            <p v-if="errors.requirements" class="text-red-500 text-xs italic">{{ errors.requirements }}</p>
          </div>
          <div class="mb-4">
            <label for="location" class="block text-gray-700 text-sm font-bold mb-2">Localisation:</label>
            <input type="text" id="location" v-model="formData.location" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <p v-if="errors.location" class="text-red-500 text-xs italic">{{ errors.location }}</p>
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Suivant</button>
          </div>
        </form>
      </div>

      <div v-else-if="currentStep === 3">
        <h2 class="text-xl font-bold mb-4">Détails supplémentaires</h2>
        <form @submit.prevent="nextStep">
          <div class="mb-4">
            <label for="deadline" class="block text-gray-700 text-sm font-bold mb-2">Date limite:</label>
            <input type="datetime-local" id="deadline" v-model="formData.deadline" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <p v-if="errors.deadline" class="text-red-500 text-xs italic">{{ errors.deadline }}</p>
          </div>
          <div class="mb-4">
            <label for="category" class="block text-gray-700 text-sm font-bold mb-2">Catégorie:</label>
            <select id="category" v-model="formData.category" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Sélectionner une catégorie</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
            <p v-if="errors.category" class="text-red-500 text-xs italic">{{ errors.category }}</p>
          </div>
          <div class="mb-4">
            <label for="contract_type" class="block text-gray-700 text-sm font-bold mb-2">Type de contrat:</label>
            <select id="contract_type" v-model="formData.contract_type" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Sélectionner un type de contrat</option>
              <option v-for="contrat in contrats" :key="contrat.id" :value="contrat.id">{{ contrat.name }}</option>
            </select>
            <p v-if="errors.contract_type" class="text-red-500 text-xs italic">{{ errors.contract_type }}</p>
          </div>
          <div class="mb-4">
            <label for="company_name" class="block text-gray-700 text-sm font-bold mb-2">Nom de l'entreprise:</label>
            <input type="text" id="company_name" v-model="formData.company_name" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <p v-if="errors.company_name" class="text-red-500 text-xs italic">{{ errors.company_name }}</p>
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Suivant</button>
          </div>
        </form>
      </div>

      <div v-else-if="currentStep === 4">
        <h2 class="text-xl font-bold mb-4">Résumé de votre annonce</h2>
        <form @submit.prevent="handleSubmitAnnouncement">
          <div class="mb-4">
            <p class="text-gray-700"><strong>Titre:</strong> {{ formData.title }}</p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700"><strong>Description:</strong> {{ formData.description }}</p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700"><strong>Exigences:</strong> {{ formData.requirements }}</p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700"><strong>Localisation:</strong> {{ formData.location }}</p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700"><strong>Date limite:</strong> {{ formData.deadline }}</p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700"><strong>Catégorie:</strong> {{ formData.category }}</p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700"><strong>Type de contrat:</strong> {{ formData.contract_type }}</p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700"><strong>Nom de l'entreprise:</strong> {{ formData.company_name }}</p>
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Soumettre</button>
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
        <button v-if="currentStep > 1" @click="previousStep" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Retour
        </button>
        <div>Étape {{ currentStep }} / 4</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { format } from 'date-fns';

export default {
  name: "CreateAnnouncement",
  data() {
    return {
      formData: {
        title: "",
        description: "",
        requirements: "",
        location: "",
        deadline: "",
        category: "",
        contract_type: "",
        company_name: "",
      },
      errors: {},
      showMessage: false,
    };
  },
  computed: {
    ...mapGetters("annoucement", ["announceCreatedData"]),
    ...mapGetters("categories", ["getCategories"]),
    ...mapGetters("contrat", ["getContrat"]),
    categories() {
      return this.getCategories;
    },
    contrats() {
      return this.getContrat;
    },
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
    ...mapActions("annoucement", ["saveAnnouncementData", "submitAnnouncement"]),
    ...mapActions("categories", ["getAllCategories"]),
    ...mapActions("contrat", ["getAllContrat"]),
    validateStep() {
      this.errors = {};
      if (this.currentStep === 1 && !this.formData.title) {
        this.errors.title = "Le titre est requis.";
      }
      if (this.currentStep === 1 && !this.formData.description) {
        this.errors.description = "La description est requise.";
      }
      if (this.currentStep === 2 && !this.formData.requirements) {
        this.errors.requirements = "Les exigences sont requises.";
      }
      if (this.currentStep === 2 && !this.formData.location) {
        this.errors.location = "La localisation est requise.";
      }
      if (this.currentStep === 3 && !this.formData.deadline) {
        this.errors.deadline = "La date limite est requise.";
      }
      if (this.currentStep === 3 && !this.formData.category) {
        this.errors.category = "La catégorie est requise.";
      }
      if (this.currentStep === 3 && !this.formData.contract_type) {
        this.errors.contract_type = "Le type de contrat est requis.";
      }
      if (this.currentStep === 3 && !this.formData.company_name) {
        this.errors.company_name = "Le nom de l'entreprise est requis.";
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
        // Formater la date au format ISO avant l'envoi
        this.formData.deadline = format(new Date(this.formData.deadline), "yyyy-MM-dd'T'HH:mm:ssXXX");
        await this.submitAnnouncement(this.formData);
        this.showMessage = true;
      } catch (error) {
        this.errors = error.response.data.errors || { general: "Une erreur est survenue" };
      }
    },
  },
  async mounted() {
    this.formData = { ...this.announceCreatedData };
    await this.getAllCategories();
    await this.getAllContrat();
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
