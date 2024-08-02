<template>
  <nav aria-label="breadcrumb">
    <ol class="flex leading-none text-indigo-600 divide-x divide-indigo-400">
      <li v-if="!isHomePage" class="pr-4 flex items-center">
        <a @click.prevent="goBack" href="#" class="hover:underline cursor-pointer flex items-center">
          <svg class="h-5 w-5 text-indigo-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Retour
        </a>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumb',
  computed: {
    isHomePage() {
      return this.$route.path === '/';
    }
  },
  methods: {
    goBack() {
      if (!this.isHomePage) {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style scoped>
/* Add any additional styles for the breadcrumb component here */
</style>
