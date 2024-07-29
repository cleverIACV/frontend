<template>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form @submit.prevent="loginUser" class="space-y-6">
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900 text-left"
          >Email address</label
        >
        <div class="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            v-model="email"
            autocomplete="email"
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
            >Password</label
          >
          <div class="text-sm">
            <a
              href="/forgot-password"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
              >Forgot password?</a
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
          Sign in
        </button>
        <div
          v-else
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
        >
          Connexion...
        </div>
      </div>
    </form>
    <div v-if="error" class="mt-4 text-red-600">{{ error.message }}</div>
    <div class="mt-6 text-center">
      <p class="text-sm text-gray-600">Don't have an account yet ?</p>
      <a
        href="/teacher-register"
        class="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
        >Register as a teacher
      </a>
      /
      <a
        href="/user-register"
        class="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
        >Register as a user
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
    // Calculated value
    ...mapGetters("users", ["isAuthenticated", "getUserInfo"]),
    ...mapGetters("usersProfile", ["userAuthProfile"]),
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
    async loginUser() {
      await this.userLogin({ email: this.email, password: this.password });
      
      // CHeck if userProfile is not empty 
      try {
        await this.getUserAuthProfile();
        const userAuthProfile = this.userAuthProfile;

        if (userAuthProfile && userAuthProfile.userProfile && Object.keys(userAuthProfile.userProfile).length > 0) {
          console.log('wooork');
          this.$router.push('/');  // Redirect to home page if the user already has an announcement
        } else {
          this.$router.push('/create-profile/step-1');  // Redirect to create announcement page if the user doesn't have an announcement
        }
      } catch (error) {
          console.log(error);
          this.$router.push('/create-profile/step-1');  // Redirect to home page on any other error
      }
    },
  },

};
</script>

<style scoped></style>
