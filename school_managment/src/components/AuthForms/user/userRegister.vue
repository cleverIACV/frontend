<template>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form @submit.prevent="registerUser" class="space-y-6">
      <div>
        <label
          for="lastname"
          class="block text-sm font-medium leading-6 text-gray-900 text-left"
          >Lastname</label
        >
        <div class="mt-2">
          <input
            id="lastname"
            v-model="lastname"
            name="lastname"
            type="text"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <p v-if="errors.lastname" class="mt-2 text-left text-sm text-red-600">
            {{ errors.lastname }}
          </p>
        </div>
      </div>
      <div>
        <label
          for="firstname"
          class="block text-sm font-medium leading-6 text-gray-900 text-left"
          >Firstname</label
        >
        <div class="mt-2">
          <input
            id="firstname"
            v-model="firstname"
            name="firstname"
            type="text"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <p
            v-if="errors.firstname"
            class="mt-2 text-left text-sm text-red-600"
          >
            {{ errors.firstname }}
          </p>
        </div>
      </div>
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900 text-left"
          >Email address</label
        >
        <div class="mt-2">
          <input
            id="email"
            v-model="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <p v-if="errors.email" class="mt-2 text-left text-sm text-red-600">
            {{ errors.email }}
          </p>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900 text-left"
            >Password</label
          >
        </div>
        <div class="mt-2">
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <p v-if="errors.password" class="mt-2 text-left text-sm text-red-600">
            {{ errors.password }}
          </p>
        </div>
      </div>

      <div>
        <button
          v-if="!loading"
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          :disabled="loading"
        >
          Register
        </button>
        <div
          v-else
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
        >
          Registering...
        </div>
      </div>
    </form>
    <p v-if="message" class="mt-2 text-sm text-green-600">
      {{ message }}
    </p>
    <div class="mt-6 text-center">
      <p class="text-sm text-gray-600">
        Already have an account ?
        <a
          href="/login"
          class="font-semibold text-indigo-600 hover:text-indigo-500"
          >Log on to</a
        >
      </p>
    </div>
    <div class="mt-2 text-center">
      <p class="text-sm text-gray-600">
        By registering, you accept our
        <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">
          terms and conditions.
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "UserRegisterForm",
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      errors: {},
    };
  },
  computed: {
    ...mapGetters("users", ["isUserRegistered", "getUserInfo"]),
    error() {
      return this.$store.state.users.userRegisterState.error;
    },
    loading() {
      return this.$store.state.users.userRegisterState.loading;
    },
    message() {
      return this.$store.state.users.userRegisterState.success;
    },
  },
  methods: {
    ...mapActions("users", ["userRegister"]),
    async registerUser() {
      try {
        await this.userRegister({
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
        });
        this.errors = {};
      } catch (error) {
        if (error.response && error.response.data) {
          this.errors = error.response.data;
        } else {
          console.error("Registration failed:", error);
        }
      }
    },
  },
};
</script>

<style scoped></style>
