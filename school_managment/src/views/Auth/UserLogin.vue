<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
    </div>

    <UserLoginForm />
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
