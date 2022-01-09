<template>
  <div class="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden">
    <!-- Breadcrumb -->
    <!-- <nav aria-label="Breadcrumb" class="bg-white border-b border-blue-gray-200 xl:hidden">
      <div class="max-w-3xl mx-auto py-3 px-4 flex items-start sm:px-6 lg:px-8">
        <a href="#" class="-ml-1 inline-flex items-center space-x-3 text-sm font-medium text-blue-gray-900">
          <mdicon name="chevron-left"  class="h-5 w-5 text-blue-gray-400" aria-hidden="true" />
          <span>Control</span>
        </a>
      </div>
    </nav> -->

    <div class="flex-1 flex xl:overflow-hidden">
      <aside class="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200 dark:border-gray-700">
        <router-view name="nav1" />
      </aside>
      <aside class="hidden md:order-first md:flex md:flex-col flex-shrink-0 w-96 border-r border-gray-200 dark:border-gray-700">
        <router-view name="nav2" />
      </aside>

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
export default class TrippleColumn extends Vue {
}
</script>
