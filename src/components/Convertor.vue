<template>
    <div>
        <b-form-input v-model="inputValue" class="form-input" type="number"></b-form-input>
        <b-form-select v-model="currencyFrom" :options="currencies"></b-form-select>
        <b-form-select v-model="currencyTo" :options="currencies"></b-form-select>
        <b-button
            :disabled="buttonDisabled"
            @click="getConversionRate"
            variant="primary"
        >Get exchange rates</b-button>
    </div>
</template>

<script>
    import axios from "axios";
    import { mapActions, mapState } from 'vuex';
    import BaseRates from "@/mixins/BaseRates";

    export default {
        name: 'Convertor',

        mixins: [BaseRates],

        data() {
            return {
                inputValue: null,
                currencyFrom: null,
                currencyTo: null
            }
        },

        methods: {
            ...mapActions(['dispatchExchangeValue']),

            getConversionRate() {
                axios.get(`https://api.exchangeratesapi.io/latest?symbols=${this.currencyTo}&base=${this.currencyFrom}`)
                    .then((response) => {
                        let exchangeRate = response.data.rates[this.currencyTo];

                        this.dispatchExchangeValue(exchangeRate * Number(this.inputValue))
                    })
                    .catch((error) => console.error(error))
            }
        },

        computed: {
            ...mapState(['baseRates']),

            /**
             * Check for whether the "Get exchange rates" button is disabled or not
             *
             * @returns {boolean}
             */
            buttonDisabled() {
                return !(this.inputValue && this.currencyFrom && this.currencyTo)
            },

            /**
             * Returns the keys for the available currencies
             *
             * @returns {string[]|null}
             */
            currencies() {
                return this.baseRates ? Object.keys(this.baseRates) : null;
            }
        },

        created() {
            this.getAllRates();
        }
    }
</script>

<style scoped>
input,
select,
button {
    margin-bottom: 20px;
}
</style>
