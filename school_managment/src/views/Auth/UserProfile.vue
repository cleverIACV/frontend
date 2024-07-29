<template>
    <div class="max-w-7xl mx-auto py-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Informations Générales -->
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 class="text-2xl font-bold mb-4">Informations Générales <span class="emoji">😊</span></h2>
          <form>
            <div class="mb-4">
              <label for="gender" class="block text-gray-700 text-sm font-bold mb-2">Genre</label>
              <input
                type="text"
                id="gender"
                :value="userProfile ? userProfile.gender : ''"
                disabled
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="mb-4">
              <label for="firstName" class="block text-gray-700 text-sm font-bold mb-2">Prénom</label>
              <input
                type="text"
                id="firstName"
                :value="userProfile && userProfile.user ? userProfile.user.name.firstname : ''"
                disabled
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="mb-4">
              <label for="lastName" class="block text-gray-700 text-sm font-bold mb-2">Nom</label>
              <input
                type="text"
                id="lastName"
                :value="userProfile && userProfile.user ? userProfile.user.name.lastname : ''"
                disabled
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="mb-4">
              <label for="dateOfBirth" class="block text-gray-700 text-sm font-bold mb-2">Date de naissance</label>
              <input
                type="text"
                id="dateOfBirth"
                :value="formattedDateOfBirth"
                disabled
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="text"
                id="email"
                :value="userProfile && userProfile.user ? userProfile.user.email : ''"
                disabled
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="mb-4">
              <label for="phoneNumber" class="block text-gray-700 text-sm font-bold mb-2">Téléphone mobile</label>
              <input
                type="text"
                id="phoneNumber"
                :value="userProfile ? userProfile.phoneNumber : ''"
                disabled
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </form>
        </div>
  
        <!-- Adresse postale -->
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 class="text-2xl font-bold mb-4">Adresse postale <span class="emoji">📍</span></h2>
          <div>
            <p class="text-gray-700">{{ userProfile && userProfile.address ? userProfile.address.street : '' }}</p>
            <p class="text-gray-700">{{ userProfile && userProfile.address ? userProfile.address.city : '' }}, {{ userProfile && userProfile.address ? userProfile.address.state : '' }}</p>
            <p class="text-gray-700">{{ userProfile && userProfile.address ? userProfile.address.postalCode : '' }}, {{ userProfile && userProfile.address ? userProfile.address.country : '' }}</p>
          </div>
          <div class="mt-4">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2843.857169227955!2d2.11109!3d44.538557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12ad1285dbadc707%3A0x644d09ee1e6d0f38!2s181%20Rue%20des%20Bleuets%2C%2012700%20Sonnac%2C%20France!5e0!3m2!1sfr!2sch!4v1722210399800!5m2!1sfr!2sch" 
            width="100%" 
            height="200" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          
        </div>
  
        <!-- Photo de profil -->
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center">
          <h2 class="text-2xl font-bold mb-4">Photo de profil <span class="emoji">📸</span></h2>
          <div class="mb-4">
            <img :src="userProfile && userProfile.image" alt="Profile Image" class="rounded-full w-32 h-32 mx-auto mb-4 imageCover" />
          </div>
          <button class="bg-red-500 text-white py-2 px-4 rounded">Changer de photo de profil</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";
  
  export default {
    name: "UserProfile",
    computed: {
      ...mapGetters("usersProfile", ["userAuthProfile"]),
      userProfile() {
        return this.userAuthProfile && this.userAuthProfile.userProfile;
      },
      formattedDateOfBirth() {
        return this.userProfile && this.userProfile.dateOfBirth ? new Date(this.userProfile.dateOfBirth).toLocaleDateString() : '';
      },
    //   googleMapSrc() {
    //     return this.userProfile && this.userProfile.address
    //       ? `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(this.userProfile.address.street)},${encodeURIComponent(this.userProfile.address.city)},${encodeURIComponent(this.userProfile.address.country)}`
    //       : '';
    //   },
    },
    methods: {
      ...mapActions("usersProfile", ["getUserAuthProfile"]),
    },
    mounted() {
      this.getUserAuthProfile();
    },
  };
  </script>
  
  <style scoped>
  .emoji {
    display: inline-block;
  }

  .imageCover{
    object-fit: cover;
    object-position: center;
  }
  </style>
  