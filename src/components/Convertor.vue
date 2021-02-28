<template>
    <div>
        <b-form-input v-model="inputValue" class="form-input" type="number"></b-form-input>
        <b-form-select v-model="currencyFrom" :options="currencies"></b-form-select>
        <b-form-select v-model="currencyTo" :options="currencies"></b-form-select>
        <b-button @click="getConversionRate">Get exchange rates</b-button>
    </div>
</template>

<script>
    import axios from "axios";
    import { mapActions } from 'vuex';

    export default {
        name: 'Convertor',

        data() {
            return {
                inputValue: null,
                currencyFrom: null,
                currencyTo: null,

                rates: null
            }
        },

        methods: {
            ...mapActions(['dispatchExchangeValue']),

            /**
             * Retrieve all available currencies and their rates
             */
            getAllRates() {
                axios.get('https://api.exchangeratesapi.io/latest')
                    .then((resp) => {
                        this.rates = resp.data.rates;
                })
                    .catch((error) => console.log(error))
            },

            getConversionRate() {
                axios.get(`https://api.exchangeratesapi.io/latest?symbols=${this.currencyTo}&base=${this.currencyFrom}`)
                    .then((response) => {
                        let exchangeRate = response.data.rates[this.currencyTo];

                        this.dispatchExchangeValue(exchangeRate * Number(this.inputValue))
                    })
            }
        },

        computed: {
            /**
             * Returns the keys for the available currencies
             *
             * @returns {string[]|null}
             */
            currencies() {
                return this.rates ? Object.keys(this.rates) : null;
            }
        },

        created() {
            this.getAllRates();
        }
    }
</script>
