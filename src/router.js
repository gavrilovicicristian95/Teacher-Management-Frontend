import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('./views/BoardAdmin.vue')
    },
    {
      path: '/mod',
      name: 'moderator',
      // lazy-loaded
      component: () => import('./views/BoardModerator.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    },
    {
      path:'/researchActivity',
      name: 'researchActivity',
      component: () => import('./views/ResearchActivity.vue')
    },
    {
      path:'/teachingActivity',
      name: 'teachingActivity',
      component: () => import('./views/TeachingActivity.vue')
    },
    {
      path:'/institutionalActivity',
      name: 'InstitutionalActivity',
      component: () => import('./views/InstitutionalActivity.vue')
    },
    {
      path:'/addArticle',
      name: 'addArticle',
      component: () => import('./views/AddArticle.vue')
    },
    {
      path:'/addBook',
      name: 'addBook',
      component: () => import('./views/AddBook.vue')
    },
    {
      path:'/addContract',
      name: 'addContract',
      component: () => import('./views/AddContract.vue')
    },
    
    {
      path:'/addPatent',
      name: 'addPatent',
      component: () => import('./views/AddPatent.vue')
    },
    {
      path:'/addProduct',
      name: 'addProduct',
      component: () => import('./views/AddProductService.vue')
    },
    {
      path:'/addCitation',
      name: 'addCitation',
      component: () => import('./views/AddCitation.vue')
    },
    {
      path:'/addConferenceParticipation',
      name: 'addConferenceParticipation',
      component: () => import('./views/AddConferenceParticipation.vue')
    },
    {
      path:'/editArticle/:id',
      name: 'editArticle',
      component: () => import('./views/EditArticle.vue')
    },
    {
      path:'/addCourse',
      name: 'addCourse',
      component: () => import('./views/AddCourse.vue')
    },
    {
      path:'/addActivity',
      name: 'addActivity',
      component: () => import('./views/AddTeachingActivity.vue')
    },
    {
      path:'/addWorkActivity',
      name: 'addWorkActivity',
      component: () => import('./views/AddWorkActivity.vue')
    },
    {
      path:'/addThesisCoord',
      name: 'addThesisCoord',
      component: () => import('./views/AddThesisCoordination.vue')
    },
    {
      path:'/addScientificWork',
      name: 'addScientificWork',
      component: () => import('./views/AddScientificWork.vue')
    },
  ]
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });
