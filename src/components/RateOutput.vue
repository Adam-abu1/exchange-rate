<template>
    <div id="rate-output">
        <h1>{{ displayedValue }}</h1>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['calculatedValue']),

        /**
         * Limiting the digits after the decimal to 2 places
         *
         * @returns {string}
         */
        displayedValue() {
            return (typeof this.calculatedValue === 'number') ? this.calculatedValue.toFixed(2) : '';
        }
    }
}
</script>
