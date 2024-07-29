<template>
  <div class="max-w-4xl mx-auto py-10">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <h2 class="text-2xl font-bold mb-4">Création de votre profil</h2>
        <div class="relative pt-1">
          <div class="flex mb-2 items-center justify-between">
            <div>
              <span
                class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200"
              >
                Étape {{ currentStep }} sur 3
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
        <h2 class="text-xl font-bold mb-4">Informations personnelles</h2>
        <form @submit.prevent="nextStep">
          <div class="mb-4">
            <label
              for="image"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Image URL:</label
            >
            <input
              type="text"
              id="image"
              v-model="formData.image"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.image" class="text-red-500 text-xs italic">
              {{ errors.image }}
            </p>
          </div>
          <div class="mb-4">
            <label
              for="gender"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Genre:</label
            >
            <select
              id="gender"
              v-model="formData.gender"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Sélectionnez un genre</option>
              <option value="Male">Masculin</option>
              <option value="Female">Féminin</option>
              <option value="Other">Autre</option>
            </select>
            <p v-if="errors.gender" class="text-red-500 text-xs italic">
              {{ errors.gender }}
            </p>
          </div>
          <div class="mb-4">
            <label
              for="dateOfBirth"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Date de naissance:</label
            >
            <input
              type="date"
              id="dateOfBirth"
              v-model="formData.dateOfBirth"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.dateOfBirth" class="text-red-500 text-xs italic">
              {{ errors.dateOfBirth }}
            </p>
          </div>
          <div class="mb-4">
            <label
              for="phoneNumber"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Numéro de téléphone:</label
            >
            <input
              type="text"
              id="phoneNumber"
              v-model="formData.phoneNumber"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.phoneNumber" class="text-red-500 text-xs italic">
              {{ errors.phoneNumber }}
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
        <h2 class="text-xl font-bold mb-4">Adresse</h2>
        <form @submit.prevent="nextStep">
          <div class="mb-4">
            <label
              for="street"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Rue:</label
            >
            <input
              type="text"
              id="street"
              v-model="formData.address.street"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.street" class="text-red-500 text-xs italic">
              {{ errors.street }}
            </p>
          </div>
          <div class="mb-4">
            <label for="city" class="block text-gray-700 text-sm font-bold mb-2"
              >Ville:</label
            >
            <input
              type="text"
              id="city"
              v-model="formData.address.city"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.city" class="text-red-500 text-xs italic">
              {{ errors.city }}
            </p>
          </div>
          <div class="mb-4">
            <label
              for="state"
              class="block text-gray-700 text-sm font-bold mb-2"
              >État:</label
            >
            <input
              type="text"
              id="state"
              v-model="formData.address.state"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.state" class="text-red-500 text-xs italic">
              {{ errors.state }}
            </p>
          </div>
          <div class="mb-4">
            <label
              for="postalCode"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Code postal:</label
            >
            <input
              type="text"
              id="postalCode"
              v-model="formData.address.postalCode"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.postalCode" class="text-red-500 text-xs italic">
              {{ errors.postalCode }}
            </p>
          </div>
          <div class="mb-4">
            <label
              for="country"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Pays:</label
            >
            <input
              type="text"
              id="country"
              v-model="formData.address.country"
              required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.country" class="text-red-500 text-xs italic">
              {{ errors.country }}
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
        <h2 class="text-xl font-bold mb-4">Résumé de votre profil</h2>
        <form @submit.prevent="handleSubmitProfile">
          <div class="mb-4">
            <p class="text-gray-700">
              <strong>Image:</strong>
              {{ formData.image }}
            </p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700">
              <strong>Genre:</strong> {{ formData.gender }}
            </p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700">
              <strong>Date de naissance:</strong> {{ formData.dateOfBirth }}
            </p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700">
              <strong>Numéro de téléphone:</strong> {{ formData.phoneNumber }}
            </p>
          </div>
          <div class="mb-4">
            <p class="text-gray-700"><strong>Adresse:</strong></p>
            <p>
              {{ formData.address.street }}, {{ formData.address.city }},
              {{ formData.address.state }}, {{ formData.address.postalCode }},
              {{ formData.address.country }}
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
            @click="handleCreateAnnonce"
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
          >
            Créer une annonce
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
          image: "",
          gender: "",
          dateOfBirth: "",
          phoneNumber: "",
          address: {
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
          },
        },
        errors: {},
        showMessage: false, // To control the visibility of the success message
      };
    },
    computed: {
      ...mapGetters("usersProfile", ["createdUserProfile"]),
      ...mapGetters("annoucement", ["getUserAuthAnnounceData"]),
      ...mapGetters("users", ["getUserInfo"]),

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
      ...mapActions("annoucement", ["getUserAuthAnnonce"]),
      validateStep() {
        this.errors = {};
        if (this.currentStep === 1 && !this.formData.image) {
          this.errors.image = "L'image est requise.";
        }
        if (this.currentStep === 1 && !this.formData.gender) {
          this.errors.gender = "Le genre est requis.";
        }
        if (this.currentStep === 1 && !this.formData.dateOfBirth) {
          this.errors.dateOfBirth = "La date de naissance est requise.";
        } else if (this.currentStep === 1) {
          const today = new Date();
          const birthDate = new Date(this.formData.dateOfBirth);
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDifference = today.getMonth() - birthDate.getMonth();
          if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
          ) {
            age--;
          }
          if (age < 18) {
            this.errors.dateOfBirth = "Vous devez avoir au moins 18 ans.";
          }
        }
        if (this.currentStep === 1 && !this.formData.phoneNumber) {
          this.errors.phoneNumber = "Le numéro de téléphone est requis.";
        }
        if (this.currentStep === 2 && !this.formData.address.street) {
          this.errors.street = "La rue est requise.";
        }
        if (this.currentStep === 2 && !this.formData.address.city) {
          this.errors.city = "La ville est requise.";
        }
        if (this.currentStep === 2 && !this.formData.address.state) {
          this.errors.state = "L'état est requis.";
        }
        if (this.currentStep === 2 && !this.formData.address.postalCode) {
          this.errors.postalCode = "Le code postal est requis.";
        }
        if (this.currentStep === 2 && !this.formData.address.country) {
          this.errors.country = "Le pays est requis.";
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

      async handleCreateAnnonce() {
        try {
          // Check if the user has an existing announcement
          const isTeacher = this.getUserInfo && this.getUserInfo.role && this.getUserInfo.role.some(role => role.name === 'teacher');
          if (!isTeacher) {
            this.$router.push('/');
            return;
          }

          await this.getUserAuthAnnonce();
          const userAuthAnnonce = this.getUserAuthAnnounceData;

          if (userAuthAnnonce && userAuthAnnonce.annonce && Object.keys(userAuthAnnonce.annonce).length > 0) {
            console.log('Existing announcement found');
            this.$router.push('/');  // Redirect to home page if the user already has an announcement
          } else {
            this.$router.push('/create-announcement/step-1');  // Redirect to create announcement page if the user doesn't have an announcement
          }
        } catch (error) {
          console.error(error);
          this.$router.push('/create-announcement/step-1');  // Redirect to create announcement page on any error
        }
      },
    },
    mounted() {
      if (this.createdUserProfile) {
        this.formData = {
          ...this.createdUserProfile,
          address: {
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            ...this.createdUserProfile.address,
          },
        };
      }
    },
  };
</script>

<style scoped>
/* Add any additional styles here */
</style>
