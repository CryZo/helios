<template>
  <div class="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden">
    <div class="flex-1 flex xl:overflow-hidden">
      <!-- Main content -->
      <div class="flex-1 max-h-screen xl:overflow-y-auto">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
})
export default class SingleColumn extends Vue {
}
</script>
