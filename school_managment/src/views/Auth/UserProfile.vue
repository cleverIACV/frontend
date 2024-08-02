<template>
  <div class="max-w-7xl mx-auto py-10">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Informations Générales -->
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 class="text-2xl font-bold mb-4">Informations Générales <span class="emoji">😊</span></h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="gender" class="block text-gray-700 text-sm font-bold mb-2">Genre</label>
            <input
              type="text"
              id="gender"
              v-model="formData.gender"
              :disabled="!isEditing"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.gender" class="text-red-500 text-xs italic">{{ errors.gender }}</p>
          </div>
          <div class="mb-4">
            <label for="date_of_birth" class="block text-gray-700 text-sm font-bold mb-2">Date de naissance</label>
            <input
              type="date"
              id="date_of_birth"
              v-model="formData.date_of_birth"
              :disabled="!isEditing"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.date_of_birth" class="text-red-500 text-xs italic">{{ errors.date_of_birth }}</p>
          </div>
          <div class="mb-4">
            <label for="phone" class="block text-gray-700 text-sm font-bold mb-2">Téléphone mobile</label>
            <input
              type="text"
              id="phone"
              v-model="formData.phone"
              :disabled="!isEditing"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.phone" class="text-red-500 text-xs italic">{{ errors.phone }}</p>
          </div>
          <div class="mb-4">
            <label for="name_company" class="block text-gray-700 text-sm font-bold mb-2">Nom de l'entreprise</label>
            <input
              type="text"
              id="name_company"
              v-model="formData.name_company"
              :disabled="!isEditing"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.name_company" class="text-red-500 text-xs italic">{{ errors.name_company }}</p>
          </div>
          <div class="mb-4">
            <label for="phone_company" class="block text-gray-700 text-sm font-bold mb-2">Téléphone de l'entreprise</label>
            <input
              type="text"
              id="phone_company"
              v-model="formData.phone_company"
              :disabled="!isEditing"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.phone_company" class="text-red-500 text-xs italic">{{ errors.phone_company }}</p>
          </div>
          <div class="mb-4">
            <label for="job_title" class="block text-gray-700 text-sm font-bold mb-2">Intitulé du poste</label>
            <input
              type="text"
              id="job_title"
              v-model="formData.job_title"
              :disabled="!isEditing"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.job_title" class="text-red-500 text-xs italic">{{ errors.job_title }}</p>
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              id="description"
              v-model="formData.description"
              :disabled="!isEditing"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
            <p v-if="errors.description" class="text-red-500 text-xs italic">{{ errors.description }}</p>
          </div>
          <div class="mb-4">
            <label for="degree_level" class="block text-gray-700 text-sm font-bold mb-2">Niveau de diplôme</label>
            <input
              type="text"
              id="degree_level"
              v-model="formData.degree_level"
              :disabled="!isEditing"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.degree_level" class="text-red-500 text-xs italic">{{ errors.degree_level }}</p>
          </div>
          <div class="mb-4">
            <label for="availability" class="block text-gray-700 text-sm font-bold mb-2">Disponibilité</label>
            <input
              type="date"
              id="availability"
              v-model="formData.availability"
              :disabled="!isEditing"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.availability" class="text-red-500 text-xs italic">{{ errors.availability }}</p>
          </div>
          <div class="mb-4">
            <label for="resume" class="block text-gray-700 text-sm font-bold mb-2">Téléverser CV</label>
            <input
              type="file"
              id="resume"
              @change="handleResumeUpload"
              :disabled="!isEditing"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.resume" class="text-red-500 text-xs italic">{{ errors.resume }}</p>
            <p v-if="resumeUploadMessage" class="text-green-500 text-xs italic">{{ resumeUploadMessage }}</p>
          </div>
          <div class="mb-4">
            <label for="cover_letter" class="block text-gray-700 text-sm font-bold mb-2">Téléverser Lettre de Motivation</label>
            <input
              type="file"
              id="cover_letter"
              @change="handleCoverLetterUpload"
              :disabled="!isEditing"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.cover_letter" class="text-red-500 text-xs italic">{{ errors.cover_letter }}</p>
            <p v-if="coverLetterUploadMessage" class="text-green-500 text-xs italic">{{ coverLetterUploadMessage }}</p>
          </div>
          <div v-if="isEditing" class="mb-4">
            <button
              v-if="!updateLoading && !resumeLoading && !coverLoading"
              type="submit"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Enregistrer
            </button>
            <button
              v-if="updateLoading"
              type="button"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Enregistrement...
            </button>
            <button
              type="button"
              @click="cancelEdit"
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
            >
              Annuler
            </button>
          </div>
          <div v-else class="mb-4">
            <button
              type="button"
              @click="editProfile"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Modifier le profil
            </button>
          </div>
        </form>
      </div>

      <!-- Adresse postale -->
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 class="text-2xl font-bold mb-4">Adresse postale <span class="emoji">📍</span></h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="street" class="block text-gray-700 text-sm font-bold mb-2">Rue</label>
            <input
              type="text"
              id="street"
              v-model="formData.street"
              :disabled="!isEditing"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.street" class="text-red-500 text-xs italic">{{ errors.street }}</p>
          </div>
          <div class="mb-4">
            <label for="city" class="block text-gray-700 text-sm font-bold mb-2">Ville</label>
            <input
              type="text"
              id="city"
              v-model="formData.city"
              :disabled="!isEditing"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.city" class="text-red-500 text-xs italic">{{ errors.city }}</p>
          </div>
          <div class="mb-4">
            <label for="state" class="block text-gray-700 text-sm font-bold mb-2">État</label>
            <input
              type="text"
              id="state"
              v-model="formData.state"
              :disabled="!isEditing"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.state" class="text-red-500 text-xs italic">{{ errors.state }}</p>
          </div>
          <div class="mb-4">
            <label for="postal_code" class="block text-gray-700 text-sm font-bold mb-2">Code postal</label>
            <input
              type="text"
              id="postal_code"
              v-model="formData.postal_code"
              :disabled="!isEditing"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.postal_code" class="text-red-500 text-xs italic">{{ errors.postal_code }}</p>
          </div>
          <div class="mb-4">
            <label for="country" class="block text-gray-700 text-sm font-bold mb-2">Pays</label>
            <input
              type="text"
              id="country"
              v-model="formData.country"
              :disabled="!isEditing"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p v-if="errors.country" class="text-red-500 text-xs italic">{{ errors.country }}</p>
          </div>
        </form>
      </div>

      <!-- Photo de profil -->
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center">
        <h2 class="text-2xl font-bold mb-4">Photo de profil <span class="emoji">📸</span></h2>
        <div class="mb-4">
          <img :src="userProfile && userProfile.image" alt="Profile Image" class="rounded-full w-32 h-32 mx-auto mb-4 imageCover" />
        </div>
        <button class="bg-red-500 text-white py-2 px-4 rounded">Changer de photo de profil</button>
      </div>

      <!-- Analyses de CV -->
      <div v-if="userProfile && userProfile.final_analyse_cv_data" class="text-left col-span-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 class="text-2xl font-bold mb-4">Analyses de CV</h2>
        <div>{{ plainTextFromMarkdown(userProfile.final_analyse_cv_data) }}</div>
      </div>

      <!-- Analyses de Lettre de Motivation -->
      <div v-if="userProfile && userProfile.final_analyse_cover_letter_data" class="col-span-full text-left bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 class="text-2xl font-bold mb-4">Analyses de Lettre de Motivation</h2>
        <div>{{ plainTextFromMarkdown(userProfile.final_analyse_cover_letter_data) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import markdownToTxt from 'markdown-to-txt';

export default {
  name: "UserProfile",
  data() {
    return {
      isEditing: false,
      formData: {
        gender: '',
        date_of_birth: '',
        phone: '',
        name_company: '',
        phone_company: '',
        job_title: '',
        description: '',
        degree_level: '',
        availability: '',
        street: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
      },
      errors: {},
      resumeFile: null,
      coverLetterFile: null,
      resumeUploadMessage: '',
      coverLetterUploadMessage: '',
    };
  },
  computed: {
    ...mapGetters("usersProfile", ["userAuthProfile"]),
    ...mapGetters("resume", ["getResumeAnalyses"]),
    ...mapGetters("coverletter", ["getCoverAnalyses"]),
    userProfile() {
      return this.userAuthProfile;
    },
    resumeAnalyses() {
      return this.getResumeAnalyses;
    },
    coverLetterAnalyses() {
      return this.getCoverAnalyses;
    },
    formattedDateOfBirth() {
      return this.userProfile && this.userProfile.date_of_birth ? new Date(this.userProfile.date_of_birth).toISOString().split("T")[0] : '';
    },
    formattedAvailability() {
      return this.userProfile && this.userProfile.availability ? new Date(this.userProfile.availability).toISOString().split("T")[0] : '';
    },
    error() {
      return this.$store.state.usersProfile.updateUserAuthState.error;
    },
    updateLoading() {
      return this.$store.state.usersProfile.updateUserAuthState.loading;
    },
    resumeLoading() {
      return this.$store.state.resume.resumeUploadState.loading;
    },
    coverLoading() {
      return this.$store.state.coverletter.coverletterUploadState.loading;
    },
  },
  methods: {
    ...mapActions("usersProfile", ["getUserAuthProfile", "updateUserAuthProfil"]),
    ...mapActions("resume", ["uploadResume"]),
    ...mapActions("coverletter", ["uploadCoverLetter"]),
    editProfile() {
      this.isEditing = true;
      this.formData = { ...this.userProfile };
    },
    async handleSubmit() {
      try {
        await this.updateUserAuthProfil(this.formData);
        this.isEditing = false;
        await this.getUserAuthProfile();
      } catch (error) {
        this.errors = error.response.data || { general: "Une erreur est survenue" };
      }
    },
    cancelEdit() {
      this.isEditing = false;
      this.formData = { ...this.userProfile };
    },
    handleResumeUpload(event) {
      this.resumeFile = event.target.files[0];
      this.uploadResumeFile();
    },
    async uploadResumeFile() {
      if (!this.resumeFile) return;

      const formData = new FormData();
      formData.append('resume', this.resumeFile);

      try {
        const response = await this.uploadResume(formData);
        this.resumeUploadMessage = 'CV téléversé avec succès.';
        if (response.openai_analysis) {
          localStorage.setItem('resumeAnalyses', JSON.stringify(response.openai_analysis));
        }
      } catch (error) {
        this.errors.resume = 'Erreur lors du téléversement du CV.';
      }
    },
    handleCoverLetterUpload(event) {
      this.coverLetterFile = event.target.files[0];
      this.uploadCoverLetterFile();
    },
    async uploadCoverLetterFile() {
      if (!this.coverLetterFile) return;

      const formData = new FormData();
      formData.append('cover_letter', this.coverLetterFile);

      try {
        const response = await this.uploadCoverLetter(formData);
        this.coverLetterUploadMessage = 'Lettre de motivation téléversée avec succès.';
        if (response.openai_analysis) {
          localStorage.setItem('coverLetterAnalyses', JSON.stringify(response.openai_analysis));
        }
      } catch (error) {
        this.errors.cover_letter = 'Erreur lors du téléversement de la lettre de motivation.';
      }
    },
    plainTextFromMarkdown(markdown) {
      return markdownToTxt(markdown);
    }
  },
  mounted() {
    this.getUserAuthProfile();
  },
  watch: {
    userProfile: {
      handler(newProfile) {
        this.formData = { ...newProfile };
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.emoji {
  display: inline-block;
}

.imageCover {
  object-fit: cover;
  object-position: center;
}
</style>
