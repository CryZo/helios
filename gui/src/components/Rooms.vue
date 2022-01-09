<template>
  <div class="px-6 pt-6 pb-4">
    <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">{{ $t('components.rooms.title') }}</h2>
  </div>
  <nav class="flex-1 min-h-0 overflow-y-auto bg-white dark:bg-gray-900" :aria-label="$t('components.rooms.title')">
    <div v-for="floor in Object.keys(rooms)" :key="floor" class="relative">
      <div class="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 px-6 py-1 text-sm font-medium text-gray-500">
        <h3>{{ floor }}</h3>
      </div>
      <ul class="relative z-0 divide-y divide-gray-200 dark:divide-gray-700">
        <li v-for="room in rooms[floor]" :key="room.id" :class="room.id === $route.params.id ? 'bg-primary-50 dark:bg-primary-800' : ''">
          <div class="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500">
            <div class="flex-1 min-w-0">
              <router-link :to="{name: 'room', params: {id: room.id}}" class="focus:outline-none">
                <!-- Extend touch target to entire panel -->
                <span class="absolute inset-0" aria-hidden="true" />
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {{ room.Name }}
                </p>
                <p class="text-sm text-gray-500 truncate">
                  {{ room.desc }}
                </p>
              </router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
})
export default class Rooms extends Vue {
  private rooms: {[key: string]: {id: string, Name: string, desc: string}[]} = {};
  private interval: number = 0;

  refresh() {
    Object.keys(this.rooms).forEach(i => delete this.rooms[i]);
    if (!window.rooms) return;
    
    window.rooms.forEach(r => {
      if (!this.rooms[r.Floor]) this.rooms[r.Floor] = [];

      this.rooms[r.Floor].push({
        id: r._id,
        Name: r.Name,
        desc: ''
      });
    });
  }

  mounted() {
    this.refresh();
    this.interval = setInterval(this.refresh.bind(this), 500);
  }

  unmounted() {
    clearInterval(this.interval);
  }
}
</script>
