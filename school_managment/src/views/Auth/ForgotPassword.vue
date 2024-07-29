<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Reset your password
      </h2>
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <p class="mt-2 text-sm text-gray-600 text-left">
        Please enter your e-mail address below. We will send you instructions on
        how to create a new password.
      </p>
    </div>
    <ForgotPasswordForm />
  </div>
</template>

<script>
import ForgotPasswordForm from "@/components/AuthForms/forgotpassword.vue";
export default {
  name: "ForgotPassword",
  components: {
    ForgotPasswordForm,
  },
};
</script>

<style scoped></style>
