import axios from "axios";
import {mapActions, mapState} from "vuex";
import {currencyCodes} from '@/Data/Common-currency.js';

export default {
    computed: {
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
        }
    },

    methods: {
        ...mapActions(['dispatchBaseRates']),

        /**
         * Retrieve all available currencies and their rates
         */
        getAllRates() {
            axios.get('https://api.exchangeratesapi.io/latest')
                .then((resp) => {
                    this.dispatchBaseRates(resp.data.rates);
                })
                .catch((error) => console.error(error))
        }
    }
}
