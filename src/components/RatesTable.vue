<template>
    <div>
        <ul>
            <li v-for="(rate, currency) in baseRates"> {{ currency }}: {{ rate }}</li>
        </ul>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: 'RatesTable',

        computed: {
            ...mapState(['baseRates'])
        }
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
