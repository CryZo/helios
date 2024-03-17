<template>
    <input type="range" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

export default class SliderInput extends Vue {
}
</script>


<style lang="scss" scoped>
    input[type=range] {
        height: 26px;
        -webkit-appearance: none;
        margin: 10px 0;
        width: 100%;

        background-color: transparent;
    }
    input[type=range]:focus {
        outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 14px;
        cursor: pointer;
        //animate: 0.2s;
        box-shadow: 1px 1px 1px var(--color-primary-100);
        background: var(--color-primary-100);
        border-radius: 14px;
        border: 0px solid var(--color-primary-100);

        @apply dark:bg-gray-700;
    }
    input[type=range]::-webkit-slider-thumb {
        box-shadow: 0px 0px 0px #000000;
        border: 0px solid #000000;
        height: 20px;
        width: 40px;
        border-radius: 12px;
        background: var(--color-secondary-500);
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -3px;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
        background: #50555C;
    }
</style>