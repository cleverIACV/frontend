<template>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form @submit.prevent="loginUser" class="space-y-6">
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900 text-left"
          >Email</label
        >
        <div class="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            v-model="email"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900 text-left"
            >Mot de passe</label
          >
          <div class="text-sm">
            <a
              href="/forgot-password"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
              >Mot de passe oublié?</a
            >
          </div>
        </div>
        <div class="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            v-model="password"
            autocomplete="current-password"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          v-if="!loading"
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          :disabled="loading"
        >
          Connexion
        </button>
        <div
          v-else
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
        >
          Connexion...
        </div>
      </div>
    </form>
    <div v-if="error" class="mt-4 text-red-600">{{ error.detail }}</div>
    <div class="mt-6 text-center">
      <p class="text-sm text-gray-600">Vous n'avez pas encore de compte ?</p>
      <a
        href="/recruiter-register"
        class="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
        >Inscrivez-vous en tant que recruteur
      </a>
      /
      <a
        href="/user-register"
        class="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
        >Inscrivez-vous en tant qu'utilisateur
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "UserLoginForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters("users", ["isAuthenticated", "getUserInfo"]),
    ...mapGetters("usersProfile", ["userAuthProfile"]),
    ...mapGetters("annoucement", ["getUserAuthAnnounceData"]),
    error() {
      return this.$store.state.users.userLoginState.error;
    },
    loading() {
      return this.$store.state.users.userLoginState.loading;
    },
  },
  methods: {
    ...mapActions("users", ["userLogin"]),
    ...mapActions("usersProfile", ["getUserAuthProfile"]),
    // ...mapActions("annoucement", ["getUserAuthAnnonce"]),
    async loginUser() {
      try {
        await this.userLogin({ email: this.email, password: this.password });

        await this.getUserAuthProfile();
        const userAuthProfile = this.userAuthProfile;

        if (userAuthProfile && Object.keys(userAuthProfile).length > 0) {
          this.$router.push('/');  // Redirect to home page if the user already has a profile
        } else {
          this.$router.push('/create-profile/step-1');  // Redirect to create profile page if the user doesn't have a profile
        }
        // Appel de la méthode pour récupérer les annonces de l'utilisateur

      } catch (error) {
        console.log(error); // Redirect to create profile page on any error
      }
    },
  },
};
</script>

<style scoped></style>
