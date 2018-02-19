<template>
<div class='newRecipe'>
  <div class='header'>
    <div class="ui two column grid">
      <div class="column">
        <div class="ui segment">
          <div class="ui form segment">
            <div class="field">
              <label>Title</label>
              <div class="field">
                <input type="text" placeholder="Title" v-model="recipe.title">
              </div>
            </div>
            <div class="field">
              <label>Category</label>
              <div class="field">
                <input type="text" placeholder="Category" v-model="recipe.category">
              </div>
            </div>
            <div class="field">
              <label>Origin</label>
              <div class="field">
                <input type="text" placeholder="Origin" v-model="recipe.origin">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="ui segment">
          <div class="ui form segment">
              <div class="field">
                <label>Oven Temp</label>
                <div class="field">
                  <input type="text" placeholder="Oven Temp" v-model="recipe.ovenTemp">
                </div>
              </div>
              <div class="field">
                <label>Cook Time</label>
                <div class="field">
                  <input type="text" placeholder="Cook Time" v-model="recipe.cookTime">
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class='instructions'>
    <div class='ingredients'>
      <div class="column">
        <div class="ui raised segment">
          <a class="ui purple ribbon label">Ingredients</a>
          <div class="ui form segment">
            <div class="field" v-for="(ingredient, index) in recipe.ingredients" :key="ingredient.id">
              <div class="fields">
                <div class="ui icon buttons two wide field">
                  <button class="ui button" v-if="index > 0" @click="moveUp(index, recipe.ingredients)">
                    <i class="chevron up icon"></i>
                  </button>
                  <button class="ui button" v-if="index < recipe.ingredients.length - 1" @click="moveDown(index, recipe.ingredients)">
                    <i class="chevron down icon"></i>
                  </button>
                </div>
                <div class="two wide field">
                  <input type="text" placeholder="Quantity" v-model="ingredient.quantity">
                </div>
                <div class="two wide field">
                  <input type="text" placeholder="Measurement" v-model="ingredient.measure">
                </div>
                <div class="eight wide field">
                  <input type="text" placeholder="Name" v-model="ingredient.name">
                </div>
                <div class="one wide field">
                  <button class="ui compact icon button" @click="remove(index, recipe.ingredients)">
                    <i class="close icon"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button @click="addIngredient" class="ui compact icon button">
            <i class="plus icon"></i>
          </button>
        </div>
      </div>
    </div>
    <div class='directions'>
      <div class="column">
        <div class="ui raised segment">
          <a class="ui purple ribbon label">Directions</a>
          <table class="ui basic table">
            <tbody>
              <tr v-for="(direction, index) in recipe.directions" :key="direction.id">
                <td :class="'collapsing ' + (index > 0 ? 'left' : 'right') + ' aligned'">
                  <div class="ui icon buttons">
                    <button class="ui button" v-if="index > 0" @click="moveUp(index, recipe.directions)">
                      <i class="chevron up icon"></i>
                    </button>
                    <button class="ui button" v-if="index < recipe.directions.length - 1" @click="moveDown(index, recipe.directions)">
                      <i class="chevron down icon"></i>
                    </button>
                  </div>
                </td>
                <td class="left aligned collapsing">
                  {{direction.pos}}
                </td>
                <td class='ui input full'>
                  <textarea class="fluid full_text" v-model="direction.description"></textarea>
                </td>
                <td class="right aligned collapsing">
                  <button class="ui compact icon button" @click="remove(index, recipe.directions)">
                    <i class="close icon"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button @click="addDirection" class="ui compact icon button">
            <i class="plus icon"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="newRecipeActions">
    <div class="ui buttons">
      <button class="ui button" @click="cancelNewRecipe">Cancel</button>
      <div class="or"></div>
      <button class="ui button" @click="saveNewRecipe">Save</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  watch: {
    internalRecipe() {
      this.$emit('input', this.internalRecipe);
    }
  },
  data() {
    return {
      recipe:{},
      internalRecipe: {}
    }
  },
  methods: {
    init() {
      this.internalRecipe = this.recipe;
    },
    cancelNewRecipe(){
      this.$router.push('/');
    },
    saveNewRecipe() {
      this.showNewRecipe = false;
      this.showRecipe = false;

      axios.post('https://www.vogeldev.com/vue/recipes/api/add_recipe.php', {
          body: JSON.stringify(this.newRecipe)
        }).then(response => {
          this.resetNewRecipe();
        })
        .catch(e => {
          console.log(e);
        })
    },
    addIngredient() {
      this.internalRecipe.ingredients.push({
        pos: this.recipe.ingredients.length + 1,
        quantity: '',
        measure: '',
        name: ''
      });
    },
    addDirection() {
      this.internalRecipe.directions.push({
        pos: this.recipe.directions.length + 1,
        description: ''
      });
    },
    remove(index, array) {
      var item = array[index];
      if (item.pos === undefined) {
        console.error("Item in array does not have pos element");
        return;
      }
      if (index < -1) {
        console.error("Index is less than lower bound, do not remove");
        return;
      }
      if (index >= array.length) {
        console.error("Index is greater than array length, do not remove");
        return;
      }
      if (index == -1) {
        index = array.length - 1;
      }
      array.splice(index, 1);
      array.forEach(function(item, pos) {
        if (index <= pos)
          item.pos--;
      })
    },
    moveUp(index, array) {
      var item = array[index];
      if (item.pos === undefined) {
        console.error("Item in array does not have pos element");
        return;
      }
      if (index <= 0) {
        console.error("Index is less than or equal to zero, should not swap");
        return;
      }
      array[index].pos--;
      array[index - 1].pos++;

      array.sort(function(a, b) {
        if (a.pos < b.pos) {
          return -1;
        }
        if (b.pos < a.pos) {
          return 1
        }
        return 0;
      })
    },
    moveDown(index, array) {
      var item = array[index];
      if (item.pos === undefined) {
        console.error("Item in array does not have pos element");
        return;
      }
      if (index >= array.length) {
        console.error("Index is greater than the length of the array, should not swap");
        return;
      }
      array[index].pos++;
      array[index + 1].pos--;

      array.sort(function(a, b) {
        if (a.pos < b.pos) {
          return -1;
        }
        if (b.pos < a.pos) {
          return 1
        }
        return 0;
      })
    }
  },
  created() {
    this.init();
  }
}
</script>

<style scoped>
textarea,
.full {
  width: 100%;
}
</style>
