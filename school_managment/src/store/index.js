import { createStore } from "vuex";
import users from "./modules/auth/users.js";
import annoucement from './modules/Annoucement/annoucement.js';
import usersProfile from './modules/auth/usersProfile.js';
import categories from './modules/Categories/cagegories.js';
import contrat from './modules/Contrat/contrat.js';
import resume from "./modules/Resume/resume.js";
import coverletter from "./modules/CoverLetter/coverletter.js";
import applications from "./modules/Applications/applications.js";

const store = createStore({
    // Modules 
    modules: {
        users,
        annoucement,
        usersProfile, 
        categories, 
        contrat, 
        resume,
        coverletter, 
        applications
    }

})

export default store;