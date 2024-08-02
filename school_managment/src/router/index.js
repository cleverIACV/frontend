import { createRouter, createWebHistory } from 'vue-router';
import store from '../store'; // Assurez-vous d'importer votre store Vuex

// Views import
import HomePage from '../views/HomePage.vue';
import UserLogin from '../views/Auth/UserLogin.vue';
import TeacherRegister from '../views/Auth/TeacherRegister.vue';
import UserRegistration from '../views/Auth/UserRegister.vue';
import ForgotPassword from '../views/Auth/ForgotPassword.vue';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import CreateAnnouncement from '@/views/Annoucement/CreateAnnoucement.vue';
import CreateUserProfile from '@/views/Auth/CreateUserProfile.vue';
import AnnonceDetails from '@/views/Annoucement/AnnonceDetail.vue';
import UserProfile from '@/views/Auth/UserProfile.vue';
import AnnonceDetail2 from '@/views/Annoucement/AnnonceDetail2.vue';
import UserAuthAnnonce from '@/views/Annoucement/UserAuthAnnonce.vue';
import UserApplicationPage from '@/views/Applications/UserAuthApplications.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'HomePage',
        component: HomePage,
        meta: { requiresAuth: true } 
      },
      {
        path: '/annonce-details',
        name: 'AnnonceDetails',
        component: AnnonceDetails,
        meta: { requiresAuth: true } // Ajoutez meta pour les routes protégées
      },
      {
        path: '/annonce-details/:id',
        name: 'AnnonceDetail2',
        component: AnnonceDetail2,
        meta: { requiresAuth: true } // Ajoutez meta pour les routes protégées
      },
      {
        path: '/user-profile',
        name: 'UserProfile',
        component: UserProfile,
        meta: { requiresAuth: true }
      },
      {
        path: '/user-annonce',
        name: 'UserAuthAnnonce',
        component: UserAuthAnnonce,
        meta: { requiresAuth: true }
      },
      {
        path: '/user-applications',
        name: 'UserApplicationPage',
        component: UserApplicationPage,
        meta: { requiresAuth: true }
      },
    ],
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin,
  },
  {
    path: '/user-register',
    name: 'UserRegistration',
    component: UserRegistration,
  },
  {
    path: '/recruiter-register',
    name: 'TeacherRegister',
    component: TeacherRegister,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    path: '/create-announcement/step-:step',
    name: 'CreateAnnouncement',
    component: CreateAnnouncement,
  },
  {
    path: '/create-profile/step-:step',
    name: 'CreateProfile',
    component: CreateUserProfile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Garde de navigation globale
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Cette route nécessite une authentification, vérifier si l'utilisateur est connecté
    if (!store.getters['users/isAuthenticated']) {
      // L'utilisateur n'est pas connecté, rediriger vers la page de connexion
      next({ name: 'UserLogin' });
    } else {
      // L'utilisateur est connecté, permettre la navigation
      next();
    }
  } else {
    // La route ne nécessite pas d'authentification, permettre la navigation
    next();
  }
});

export default router;
