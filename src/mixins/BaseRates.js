import axios from "axios";
import {mapActions, mapState} from "vuex";
import { currencyCodes } from '@/Data/Common-currency.js';

export default {
    data() {
        return {
            commonCurrencies: currencyCodes
        }
    },

    computed: {
        ...mapState(['baseCurrency', 'baseRates']),

        /**
         * Returns the keys for the available currencies
         *
         * @returns {string[]|null}
         */
        currencies() {
            return this.baseRates ? Object.keys(this.baseRates) : null;
        },

        /**
         * Returns an object with the text to be presented in the select and the value of each string of text
         *
         * @return {{text: string, value: string}[]}
         */
        namedCurrencies() {
            return  Object.keys(this.baseRates).map((code) => {
                return {
                    value: code,
                    text: `${code} - ${currencyCodes[code].name_plural}`
                }
            });
        },

        ratesTableOutput() {
            return  Object.keys(this.baseRates).map((code) => {
                return {
                    Name: currencyCodes[code].name_plural,
                    rate: this.baseRates[code].toFixed(2)
                }
            });
        }
    },

    methods: {
        ...mapActions(['dispatchBaseRates']),

        /**
         * Retrieve all available currencies and their rates
         */
        getAllRates() {
            axios.get(`https://api.exchangeratesapi.io/latest?base=${this.baseCurrency}`)
                .then((resp) => {
                    this.dispatchBaseRates(resp.data.rates);
                })
                .catch((error) => console.error(error))
        }
    }
}
