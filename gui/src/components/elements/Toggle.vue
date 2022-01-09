<template>
  <div class="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-10 w-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
    <span aria-hidden="true" class="pointer-events-none absolute bg-white dark:bg-gray-900 w-full h-full rounded-md" />
    <span aria-hidden="true" :class="[enabled ? 'bg-success-500 dark:bg-success-800' : 'bg-danger-500 dark:bg-danger-800', 'pointer-events-none absolute h-8 w-20 mx-auto rounded-full transition-colors ease-in-out duration-200']" />
    <span aria-hidden="true" :class="[enabled ? 'translate-x-10' : 'translate-x-0', 'pointer-events-none absolute left-0 inline-block h-10 w-10 border border-gray-200 dark:border-black rounded-full bg-white dark:bg-gray-700 shadow transform ring-0 transition-transform ease-in-out duration-200']" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    enabled: Boolean
  },
})
export default class Toggle extends Vue {
}
</script>
