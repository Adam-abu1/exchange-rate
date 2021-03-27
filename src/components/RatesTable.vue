<template>
    <div id="rates-table">
        <h3 class="comparison-text">Compared against a {{ selectedCurrency }}</h3>
        <b-table striped hover :items="ratesTableOutput"></b-table>
    </div>
</template>

<script>
    import BaseRates from "@/mixins/BaseRates";
    import {mapState} from "vuex";


    export default {
        name: 'RatesTable',

        mixins: [BaseRates],

        computed: {
            ...mapState(['baseCurrency']),

            selectedCurrency() {
                return this.commonCurrencies[this.baseCurrency].name
            }
        }
    }
</script>

<style scoped>
.comparison-text {
    text-align: left;
}

</style>
