<template>
    <div id="rates-table">
        <b-table striped hover :items="ratesTableOutput"></b-table>
    </div>
</template>

<script>
    import BaseRates from "@/mixins/BaseRates";

    export default {
        name: 'RatesTable',

        mixins: [BaseRates]
    }
</script>

<style scoped>
ul {
    padding: 0;
}

li {
    list-style: none;
}

</style>
