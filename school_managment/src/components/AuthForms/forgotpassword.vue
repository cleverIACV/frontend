<template>
  <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST">
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900 text-left"
          >Adresse e-mail</label
        >
        <div class="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Envoyer un lien de connexion
        </button>
      </div>
    </form>
    <div class="mt-6 text-center">
      <p class="text-sm text-gray-600">
        Vous n'avez pas encore de compte ?
      </p>
      <a href="/teacher-register" class=" text-sm font-semibold text-indigo-600 hover:text-indigo-500">Inscrivez-vous en tant que professeur </a> /
      <a href="/user-register" class=" text-sm font-semibold text-indigo-600 hover:text-indigo-500">Inscrivez-vous en tant qu'utilisateur </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPasswordForm",
};
</script>

<style scoped></style>
