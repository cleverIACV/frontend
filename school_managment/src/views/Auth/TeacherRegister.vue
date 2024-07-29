<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Register as a teacher
      </h2>
    </div>

    <TeacherRegisterForm />
  </div>
</template>

<script>
import TeacherRegisterForm from "@/components/AuthForms/teacher/teacherRegister.vue";
export default {
  name: "TeacherRegister",
  components: {
    TeacherRegisterForm
  },
};
</script>

<style scoped></style>
