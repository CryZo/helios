<template>
  <div class="min-h-screen">
    <div as="header" class="pb-24 bg-gradient-to-r from-primary-500 md:to-primary-50 to-primary-200 | dark:from-primary-900 dark:to-primary-800 md:dark:to-primary-800">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="relative flex flex-wrap items-center justify-center lg:justify-between">
          <div class="w-full py-5 lg:border-t lg:border-white lg:dark:border-black lg:border-opacity-20">
            <div class="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
              <h1 class="text-black dark:text-primary-500 text-2xl font-medium rounded-md bg-white dark:bg-black bg-opacity-0 px-3 py-2">{{ $t('pages.dashboard.title') }}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <main class="-mt-24 pb-8">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <!-- Main 3 column grid -->
        <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          <!-- Left column -->
          <div class="grid grid-cols-1 gap-4 lg:col-span-2">

            <!-- Room panels -->
            <section v-for="room in rooms" :key="room._id" :aria-label="room.Name">
              <div class="rounded-lg bg-white dark:bg-gray-900 overflow-hidden shadow">
                <DashboardRoomHeader :room="room" />
                  
                <ul class="divide-y divide-gray-200">
                  <SingleDevice v-for="device in room.Devices" :key="device._id" :device="device" />
                </ul>
              </div>
            </section>
          </div>

          <!-- Right column -->
          <div class="grid grid-cols-1 gap-4">
            <!-- Announcements -->
            <!-- <section aria-labelledby="announcements-title">
              <div class="rounded-lg bg-white overflow-hidden shadow">
                <div class="p-6">
                  <h2 class="text-base font-medium text-gray-900" id="announcements-title">Announcements</h2>
                  <div class="flow-root mt-6">
                    <ul class="-my-5 divide-y divide-gray-200">
                    </ul>
                  </div>
                  <div class="mt-6">
                    <a href="#" class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      View all
                    </a>
                  </div>
                </div>
              </div>
            </section> -->

            <!-- Recent Hires -->
            <!-- <section aria-labelledby="recent-hires-title">
              <div class="rounded-lg bg-white overflow-hidden shadow">
                <div class="p-6">
                  <h2 class="text-base font-medium text-gray-900" id="recent-hires-title">Recent Hires</h2>
                  <div class="flow-root mt-6">
                    <ul class="-my-5 divide-y divide-gray-200">
                    </ul>
                  </div>
                  <div class="mt-6">
                    <a href="#" class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      View all
                    </a>
                  </div>
                </div>
              </div>
            </section> -->
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import { SingleDevice, DashboardRoomHeader } from "@/components";
import { Room } from '@connector';

@Options({
  components: {
    SingleDevice,
    DashboardRoomHeader
  },
})
export default class Devices extends Vue {
  public rooms: Room[] = [];
  private interval: number = 0;

  refresh() {
    this.rooms.length = 0;
    if (!window.rooms) return;
    
    window.rooms.forEach(r => {
      this.rooms.push(r);
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
