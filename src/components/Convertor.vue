<template>
    <div id="convertor">
        <div class="amount-input input-wrapper">
            <h2>Amount</h2>
            <b-form-input
                name="input"
                id="input-value"
                v-model="inputValue"
                min="0"
                class="form-input"
                type="number"
            />
        </div>
        <div class="from-select input-wrapper">
            <h2>From</h2>
            <b-form-select
                v-model="currencyFrom"
                :options="namedCurrencies"
                value="EUR"
            >
                <b-form-select-option :value="null">Please select a currency</b-form-select-option>
            </b-form-select>
        </div>
        <div class="to-select input-wrapper">
            <h2>To</h2>
            <b-form-select
                v-model="currencyTo"
                :options="namedCurrencies"
            >
                <b-form-select-option :value="null">Please select a currency</b-form-select-option>
            </b-form-select>
        </div>
        <b-button
            :disabled="buttonDisabled"
            @click="getConversionRate"
            variant="primary"
            class="get-rates-button"
        >Get exchange rates
        </b-button>
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
#convertor {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    margin-bottom: 20px;
}
input,
select {
    margin-bottom: 20px;
}

button.disabled {
    opacity: 0.2;
    cursor: not-allowed;
}

.get-rates-button {
    grid-column: 2;
    height: fit-content;
}
</style>
