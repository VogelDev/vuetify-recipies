import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VueRouter from 'vue-router'

import Users from './components/Users.vue'
import Home from './components/Home.vue'
import Recipe from './components/Recipe.vue'
import NewRecipe from './components/NewRecipe.vue'

Vue.use(VueRouter);

const routes = [
  {path:"/vue/recipes/users/:teamId", component: Users},
  {path:"/vue/recipes/", component: Home},
  {path:"/vue/recipes/recipe/:recipeID/", component: Recipe},
  {path:"/vue/recipes/recipe/:recipeID/:title", component: Recipe},
  {path:"/vue/recipes/new-recipe/", component: NewRecipe},
  {path:"*", redirect: "/vue/recipes/"},
];

const router = new VueRouter({
  routes,
  mode: 'history',
  base: window.location.pathName
});

Vue.use(Vuetify)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
