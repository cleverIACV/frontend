import axios from "axios";

const state = {
  annonceCreatedState: {
    announcementData: {},
    loading: false,
    error: null,
    success: null,
  },
  userAnnonceState: {
    announcementData: {},
    loading: false,
    error: null,
    success: null,
  },
  userAuthAnnonceState: {
    annonces: [], // Store an array of announcements
    loading: false,
    error: null,
    success: null,
  },
  allUserAnnonceState: {
    annonces: [], // Store an array of announcements
    loading: false,
    error: null,
    success: null,
  },
  updateUserAuthAnnonceState: {
    announcementData: {},
    loading: false,
    error: null,
    success: null,
  },
  selectedAnnonceDetail: {
    annonce: {}, // New state for selected annonce
    loading: false,
    error: null,
  },
};

const mutations = {
  // Save form data
  SAVE_ANNOUNCEMENT_DATA(state, payload) {
    state.annonceCreatedState.announcementData = {
      ...state.annonceCreatedState.announcementData,
      ...payload,
    };
  },
  // Announce creation mutations
  ANNOUNCE_CREATE_REQUEST(state) {
    state.annonceCreatedState.loading = true;
    state.annonceCreatedState.error = null;
    state.annonceCreatedState.success = null;
  },
  ANNOUNCE_CREATE_SUCCESS(state, payload) {
    state.annonceCreatedState.loading = false;
    state.annonceCreatedState.success = payload.message;
    state.annonceCreatedState.announcementData = payload.annonce;
  },
  ANNOUNCE_CREATE_FAILURE(state, error) {
    state.annonceCreatedState.loading = false;
    state.annonceCreatedState.error = error;
  },
  // All users announce
  ALL_USERS_ANNONCE_REQUEST(state) {
    state.allUserAnnonceState.loading = true;
    state.allUserAnnonceState.error = null;
    state.allUserAnnonceState.success = null;
  },
  ALL_USERS_ANNONCE_SUCCESS(state, payload) {
    state.allUserAnnonceState.loading = false;
    state.allUserAnnonceState.success = payload.message;
    state.allUserAnnonceState.annonces = payload;
  },
  ALL_USERS_ANNONCE_FAILURE(state, error) {
    state.allUserAnnonceState.loading = false;
    state.allUserAnnonceState.error = error;
  },
  // Get user's own announcement mutations
  GET_AUTH_ANNOUNCE_REQUEST(state) {
    state.userAuthAnnonceState.loading = true;
    state.userAuthAnnonceState.error = null;
    state.userAuthAnnonceState.success = null;
  },
  GET_AUTH_ANNOUNCE_SUCCESS(state, payload) {
    state.userAuthAnnonceState.loading = false;
    state.userAuthAnnonceState.annonces = payload; // Directly assign the array
  },
  GET_AUTH_ANNOUNCE_FAILURE(state, error) {
    state.userAuthAnnonceState.loading = false;
    state.userAuthAnnonceState.error = error;
  },
  // Delete user auth annonce
  DELETE_ANNOUNCE_REQUEST(state) {
    state.userAuthAnnonceState.loading = true;
    state.userAuthAnnonceState.error = null;
    state.userAuthAnnonceState.success = null;
  },
  DELETE_ANNOUNCE_SUCCESS(state, annonceId) {
    state.userAuthAnnonceState.loading = false;
    state.userAuthAnnonceState.success = "Annonce supprimée avec succès";
    state.userAuthAnnonceState.annonces =
      state.userAuthAnnonceState.annonces.filter(
        (annonce) => annonce.id !== annonceId
      );
  },
  DELETE_ANNOUNCE_FAILURE(state, error) {
    state.userAuthAnnonceState.loading = false;
    state.userAuthAnnonceState.error = error;
  },
  // Update announcement mutations
  UPDATE_ANNOUNCE_REQUEST(state) {
    state.annonceCreatedState.loading = true;
    state.annonceCreatedState.error = null;
    state.annonceCreatedState.success = null;
  },
  UPDATE_ANNOUNCE_SUCCESS(state, payload) {
    state.annonceCreatedState.loading = false;
    state.annonceCreatedState.success = payload.message;
    state.annonceCreatedState.announcementData = payload.data;
  },
  UPDATE_ANNOUNCE_FAILURE(state, error) {
    state.annonceCreatedState.loading = false;
    state.annonceCreatedState.error = error;
  },
  // Selected annonce mutations
  SELECT_ANNOUNCE_REQUEST(state) {
    state.selectedAnnonceDetail.loading = true;
    state.selectedAnnonceDetail.error = null;
  },
  SELECT_ANNOUNCE_SUCCESS(state, payload) {
    state.selectedAnnonceDetail.loading = false;
    state.selectedAnnonceDetail.annonce = payload.data;
  },
  SELECT_ANNOUNCE_FAILURE(state, error) {
    state.selectedAnnonceDetail.loading = false;
    state.selectedAnnonceDetail.error = error;
  },
};

// Fonction pour obtenir un cookie spécifique
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const actions = {
  // Save previous announcement form data
  saveAnnouncementData({ commit }, formData) {
    commit("SAVE_ANNOUNCEMENT_DATA", formData);
  },

  // Submit a new announcement
  async submitAnnouncement({ commit, state }) {
    commit("ANNOUNCE_CREATE_REQUEST");
    try {
      // Récupérer le authToken depuis les cookies
      const authToken = getCookie("authToken");

      if (!authToken) {
        return commit("ANNOUNCE_CREATE_FAILURE", {
          message:
            "You need to be logged in to create an announcement. Please log in or create an account.",
        });
      }

      // Configuration des en-têtes
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      // Extracting data from state
      const {
        title,
        description,
        requirements,
        location,
        deadline,
        category,
        contract_type,
        company_name,
      } = state.annonceCreatedState.announcementData;

      const response = await axios.post(
        "http://77.37.86.249:8124/api/jobs/create/",
        {
          title,
          description,
          requirements,
          location,
          deadline,
          category,
          contract_type,
          company_name,
        },
        config
      );
      commit("ANNOUNCE_CREATE_SUCCESS", {
        annonce: response.data,
        message: "votre annonce a été créer avec succès",
      });
    } catch (error) {
      commit(
        "ANNOUNCE_CREATE_FAILURE",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  // Get the authenticated user's announcement
  async getUserAuthAnnonce({ commit }) {
    commit("GET_AUTH_ANNOUNCE_REQUEST");
    try {
      // Récupérer le authToken depuis les cookies
      const authToken = getCookie("authToken");

      if (!authToken) {
        return commit("GET_AUTH_ANNOUNCE_FAILURE", {
          message:
            "You need to be logged in to create an announcement. Please log in or create an account.",
        });
      }

      // Configuration des en-têtes
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await axios.get(
        "http://77.37.86.249:8124/api/jobs/recruiter/",
        config
      );
      commit("GET_AUTH_ANNOUNCE_SUCCESS", response.data);
    } catch (error) {
      commit(
        "GET_AUTH_ANNOUNCE_FAILURE",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  async deleteAnnonce({ commit }, annonceId) {
    commit("DELETE_ANNOUNCE_REQUEST");
    try {
      // Récupérer le authToken depuis les cookies
      const authToken = getCookie("authToken");

      if (!authToken) {
        return commit("DELETE_ANNOUNCE_FAILURE", {
          message:
            "You need to be logged in to delete an announcement. Please log in or create an account.",
        });
      }

      // Configuration des en-têtes
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      await axios.delete(
        `http://77.37.86.249:8124/api/jobs/${annonceId}/delete/`,
        config
      );
      commit("DELETE_ANNOUNCE_SUCCESS", annonceId);
    } catch (error) {
      commit(
        "DELETE_ANNOUNCE_FAILURE",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  // Update an existing announcement
  async updateAnnonce({ commit }, updateData) {
    commit("UPDATE_ANNOUNCE_REQUEST");
    try {
      const authToken = getCookie("authToken");
      if (!authToken) {
        return commit("UPDATE_ANNOUNCE_FAILURE", {
          message: "You need to be logged in to update the announcement.",
        });
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      };

      // Verify that all necessary fields are present in updateData
      const {
        slug,
        description,
        courseDescription,
        mainSubject,
        subSpecialties,
        courseMode,
        city,
        hourlyRate,
        responseTime,
      } = updateData;

      if (
        !slug ||
        !description ||
        !courseDescription ||
        !mainSubject ||
        !subSpecialties ||
        !courseMode ||
        !city ||
        !hourlyRate ||
        !responseTime
      ) {
        return commit("UPDATE_ANNOUNCE_FAILURE", {
          message: "All fields are required to update the announcement.",
        });
      }

      const response = await axios.put(
        "http://localhost:7000/api/v1/annonce/update-annonce",
        updateData,
        config
      );
      commit("UPDATE_ANNOUNCE_SUCCESS", response.data);
    } catch (error) {
      console.error("Update announcement error:", error); // Log the error
      commit(
        "UPDATE_ANNOUNCE_FAILURE",
        error.response ? error.response.data : error.message
      );
    }
  },

  // Get all users' announcements
  async getAllUserAnnonces({ commit }) {
    commit("ALL_USERS_ANNONCE_REQUEST");

    try {
      // Récupérer le authToken depuis les cookies
      const authToken = getCookie("authToken");

      if (!authToken) {
        return commit("ANNOUNCE_CREATE_FAILURE", {
          message:
            "You need to be logged in to create an announcement. Please log in or create an account.",
        });
      }

      // Configuration des en-têtes
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await axios.get(
        "http://77.37.86.249:8124/api/jobs/",
        config
      );

      commit("ALL_USERS_ANNONCE_SUCCESS", response.data);
    } catch (error) {
      commit(
        "ALL_USERS_ANNONCE_FAILURE",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },

  // Get annonce by ID
  async getAnnonceById({ commit }, annonceId) {
    commit("SELECT_ANNOUNCE_REQUEST");
    try {
      // Récupérer le authToken depuis les cookies
      const authToken = getCookie("authToken");

      if (!authToken) {
        return commit("ANNOUNCE_CREATE_FAILURE", {
          message:
            "You need to be logged in to create an announcement. Please log in or create an account.",
        });
      }

      // Configuration des en-têtes
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await axios.get(
        `http://77.37.86.249:8124/api/jobs/${annonceId}`,
        config
      );
      commit("SELECT_ANNOUNCE_SUCCESS", { data: response.data });
    } catch (error) {
      commit(
        "SELECT_ANNOUNCE_FAILURE",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  },
};

const getters = {
  announceCreatedData: (state) => state.annonceCreatedState.announcementData,
  getUserAuthAnnounceData: (state) => state.userAuthAnnonceState.annonces,
  getUpdateUserAuthAnnounceData: (state) =>
    state.updateUserAuthAnnonceState.announcementData,
  getAllUserAnnounceData: (state) => state.allUserAnnonceState.annonces,
  getAnnonceDetailData: (state) => state.selectedAnnonceDetail.annonce,
};
export default {
  namespaced: true, // Ensure the module is namespaced
  state,
  mutations,
  actions,
  getters,
};
