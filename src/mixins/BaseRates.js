import axios from "axios";
import { mapActions} from "vuex";

export default {
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
