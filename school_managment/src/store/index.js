import { createStore } from "vuex";
import users from "./modules/auth/users.js";
import annoucement from './modules/Annoucement/annoucement.js';
import usersProfile from './modules/auth/usersProfile.js';

const store = createStore({
    // Modules 
    modules: {
        users,
        annoucement,
        usersProfile
    }

})

export default store;