<template>
  <div class="hello">
      <h2>{{ calculatedValue }}</h2>
      <b-form-input v-model="inputValue" type="number"></b-form-input>

      <b-button @click="getRates">Get exchange ratess</b-button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
    data() {
      return {
          dropdownText: 'Select an item',
          actionList: [
              { name: 'First Action', id: 1, active: false },
              { name: 'Second Action', id: 2, active: false },
              { name: 'Third Action', id: 3, active: false },
              { name: 'Active action', id: 4, active: false },
          ],
          rates: [],
          inputValue: 0,
          desiredCurrencyRate: 0
      }
    },

    computed: {
      calculatedValue() {
          return Number(this.inputValue) * this.desiredCurrencyRate;
      }
    },

    methods: {
      consoleThis(event) {
          this.actionList.forEach((item) => {
              if (event.id === item.id) {
                  item.active = true;
                  this.dropdownText = item.name;
              } else {
                  item.active = false;
              }
          });
      },

        getRates() {
          axios.get('https://api.exchangeratesapi.io/latest?symbols=USD&base=GBP')
            .then((resp) => {
                this.rates = resp.data.rates

            })
              .finally(() => {
                  console.log(23232323);
                  this.desiredCurrencyRate = Object.values(this.rates)[0];

        })
              .catch((error) => console.log(error));
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
