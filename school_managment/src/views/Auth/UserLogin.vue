<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-4xl flex flex-col md:flex-row gap-6">
      <!-- Formulaires -->
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-10 w-auto"
          src="../../../public/logo-cv.png"
          alt="Your Company"
        />
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
          v-if="!isAuthenticated"
        >
          Connectez-vous à votre compte
        </h2>
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
          v-else
        >
          Bienvenue
        </h2>
        <UserLoginForm />
      </div>

      <!-- Identifiants par défaut -->
      <div class="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-start justify-center">
        <h2
          class="mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          Identifiants par défaut
        </h2>
        <ul class="mt-6 list-disc list-inside text-gray-700 text-left">
          <li><strong>Email recruiter:</strong> admin2@admin1.com</li>
          <li><strong>Mot de passe:</strong> 123456</li>
          <li><strong>Email candidat:</strong> candidat500@test.com</li>
          <li><strong>Mot de passe Admin:</strong> 123456</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import UserLoginForm from "@/components/AuthForms/login.vue";
import { mapGetters } from "vuex";

export default {
  name: "UserLogin",
  components: {
    UserLoginForm,
  },
  computed: {
    ...mapGetters("users", ["isAuthenticated", "getUserInfo"]),
    
    userFullName() {
      const user = this.getUserInfo;
      return `${user.name.firstname} ${user.name.lastname}`;
    },
  },
  mounted() {
    const storedUserLoginState = JSON.parse(localStorage.getItem('userLoginState'));
    if (storedUserLoginState && storedUserLoginState.isAuthenticated) {
      this.$store.dispatch('users/setUserState', storedUserLoginState);
    }
  },
};
</script>

<style scoped></style>
