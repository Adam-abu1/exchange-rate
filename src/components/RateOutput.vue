<template>
    <div>
        <h1>{{ calculatedValue }}</h1>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['calculatedValue'])
    }
}
</script>
