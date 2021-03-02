<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <Convertor/>
        <RateOutput/>
        <RatesTable/>
    </div>
</template>

<script>
    import Convertor from './components/Convertor';
    import RateOutput from "@/components/RateOutput";
    import RatesTable from "@/components/RatesTable";

    export default {
        name: 'App',
        components: {
            RateOutput,
            Convertor,
            RatesTable
        }
    }
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 10% 20%;
}
</style>
