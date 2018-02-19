<template>
<div class='recipe'>
  <div class='header'>
    <div class='title'>
      <span>{{recipe.title}}</span>
    </div>
    <div class='times'>
      <div class='cook_time'>Cook Time: {{recipe.cookTime}}</div>
      <div class='oven_temp'>Oven Temp: {{recipe.ovenTemp}}</div>
    </div>
    <div class='clear_both' />
    <div class='info'>
      <div>{{recipe.category}}</div>
      <div>{{recipe.origin}}</div>
    </div>
    <div class='clear_both'></div>
  </div>
  <div class='instructions'>
    <div class='ingredients'>
      <v-toolbar color="cyan" dark>
          <v-toolbar-title>Ingredients</v-toolbar-title>
        </v-toolbar>
    <v-data-table
      :headers="[
        { text: 'Quantity', value: 'quantity', sortable:false},
        { text: 'Measurement', value: 'measure', sortable:false },
        { text: 'Ingredient', value: 'name', sortable:false }
      ]"
      :items="recipe.ingredients"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <!-- <td>{{ props.item.name }}</td> -->
        <td class="text-xs-right">{{ props.item.quantity }}</td>
        <td class="text-xs-left">{{ props.item.measure }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
      </template>
    </v-data-table>
    </div>
    <div class='directions'>
      <v-toolbar color="cyan" dark>
          <v-toolbar-title>Directions</v-toolbar-title>
        </v-toolbar>
      <v-data-table
        :headers="[
          { text: 'Step', value: 'step', sortable:false},
          { text: 'Description', value: 'description', sortable:false },
        ]"
        :items="recipe.directions"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.pos }}</td>
          <td class="text-xs-left">{{ props.item.description }}</td>
        </template>
      </v-data-table>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      recipeid: 0,
      recipe: {}
    }
  },
  methods: {},
  created() {
    this.recipeid = this.$route.params.recipeID;
    var self = this;
    axios.get('https://www.vogeldev.com/vue/recipes/api/get_recipe.php?recipe=' + self.recipeid)
      .then(response => {
        self.recipe = response.data;
        console.log(self.recipe);
      }).catch(e => {
        console.log(e);
      })
  }
}
</script>

<style scoped>

.title {
  float: left;
  font-size: 2em;
  font-weight: bold;
}

.info {
  float: left;
}

.times {
  float: right;
  text-align: right;
}

.ingredients {
  clear: both;
}

/*ul {
  list-style: none;
  padding: 0px;
  margin-top: 0px;
}

li {
  text-align: left;
  padding: 2px;
}

li:nth-child(odd) {
  background-color: #bcbcbc;
}

li:nth-child(even) {
  background-color: #ebebeb;
}*/

.clear_both {
  clear: both;
}

h1 {
  background-color: #2c3e50;
  color: white;
  margin-bottom: 0px;
}

.header {
  padding: 2px;
}
</style>
