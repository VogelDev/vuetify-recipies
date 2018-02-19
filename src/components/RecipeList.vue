<template>
<div class='recipeList'>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-btn icon  @click="newClicked">
            <v-icon>add</v-icon>
          </v-btn>
          <v-toolbar-title>Recipes</v-toolbar-title>
        </v-toolbar>
        <v-list two-line>
          <template v-for="(recipe) in recipes">
            <v-list-tile avatar :key="recipe.id" @click="recipeClicked(recipe)" >
              <v-list-tile-avatar>
		            <img :src="'//loremflickr.com/100/100/' + recipe.category" v-if="!recipe.image">
                <img :src="item.image" v-if="recipe.image">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="recipe.title"></v-list-tile-title>
                <!-- <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title> -->
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
  
</div>
</template>

<script>
import Recipe from './Recipe'
import NewRecipe from './NewRecipe'
import axios from 'axios'
export default {
  components: {
    Recipe,
    NewRecipe
  },
  data() {
    return {
      title: 'Recipes',
      showRecipe: false,
      showNewRecipe: false,
      selectedRecipe: '',
      recipes: [],
      newRecipe: {}
    }
  },
  methods: {
    recipeClicked(recipe) {
      let url = recipe.title.trim().replace(/ /g, "-").toLowerCase();
      this.$router.push('recipe/'+recipe.id+'/'+url);

      // this.selectedRecipe = e;
      // this.showRecipe = true;
      // this.showNewRecipe = false;
    },
    backClicked() {
      this.showRecipe = false;
      this.showNewRecipe = false;
    },
    newClicked() {
      this.$router.push('new-recipe/');
      // this.showNewRecipe = true;
      // this.showRecipe = false;
    },
    cancelNewRecipe() {
      this.showNewRecipe = false;
      this.showRecipe = false;
      this.resetNewRecipe();
    },
    resetNewRecipe() {
      this.newRecipe = {
        "category": "",
        "origin": "",
        "title": "",
        "cookTime": "",
        "ovenTemp": "",
        "ingredients": [{
          "quantity": "",
          "measure": "",
          "name": "",
          "pos": "1"
        }, ],
        "directions": [{
          "pos": "1",
          "description": ""
        }]
      }
    }
  },
  created() {
    var self = this;

    axios.get('https://www.vogeldev.com/vue/recipes/api/get_recipes.php')
    .then(response => {
        self.recipes = response.data;
      }).catch(e => {
        console.log(e);
      })

    this.resetNewRecipe();
  }
}
</script>

<style scoped>
.newRecipeActions{
	margin-top: 10px;
}
</style>
