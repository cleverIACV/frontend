import axios from 'axios';

const state = {
  resumeUploadState: {
    loading: false,
    error: null,
    success: null,
    analyses: null,
  },
};

const mutations = {
  RESUME_UPLOAD_REQUEST(state) {
    state.resumeUploadState.loading = true;
    state.resumeUploadState.error = null;
  },
  RESUME_UPLOAD_SUCCESS(state, payload) {
    state.resumeUploadState.loading = false;
    state.resumeUploadState.success = payload.message;
    state.resumeUploadState.analyses = payload.openai_analysis;
  },
  RESUME_UPLOAD_FAILURE(state, error) {
    state.resumeUploadState.loading = false;
    state.resumeUploadState.error = error;
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
  async uploadResume({ commit }, formData) {
    commit('RESUME_UPLOAD_REQUEST');
    try {
      const authToken = getCookie("authToken");

      if (!authToken) {
        return commit("RESUME_UPLOAD_FAILURE", {
          message: "You need to be logged in to upload a resume. Please log in or create an account.",
        });
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await axios.post('http://77.37.86.249:8124/api/profil/upload_resume/', formData, config);
      commit('RESUME_UPLOAD_SUCCESS', response.data);
    } catch (error) {
      commit('RESUME_UPLOAD_FAILURE', error.response && error.response.data ? error.response.data : error.message);
    }
  },
};

const getters = {
  uploadResumeResult: (state) => state.resumeUploadState.success,
  getResumeAnalyses: (state) => state.resumeUploadState.analyses,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
