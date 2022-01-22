<template>
  <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300" :class="{'bg-primary-200 dark:bg-primary-800': !!selected}">
    <div v-if="!selected" class="pl-4 sm:pl-6 pr-2 pt-5 pb-2">
      <div class="flex flex-row items-center">
        <h3 class="mr-auto text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">{{ room.Name }}</h3>

        <temperature v-if="!isNaN(room.getAverageTemperature())" class="ml-1" :room="room"></temperature>
        <humidity    v-if="!isNaN(room.getAverageHumidity())"    class="ml-1" :room="room"></humidity>
      </div>
    </div>
    
    <div class="flex flex-col mb-2 mx-2">
      <div v-if="!selected" class="flex flex-row">
        <button v-for="type in getTypes()" :key="type.name" @click="selected = type.name" type="button" class="inline-flex items-center p-3 m-1 border border-transparent rounded-full shadow-sm text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500">
          <mdicon :name="type.icon" />
        </button>
      </div>

      <DevTypeControl v-else :room="room" :type="selected" class="mt-2">
        <button v-if="!!selected" @click="selected = false" type="button" class="inline-flex items-center ml-1 border border-transparent rounded-full shadow-sm text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500">
          <mdicon name="close" />
        </button>
        <h3 class="ml-2 text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">{{ room.Name }}</h3>
      </DevTypeControl>
    </div>
  </div>
</template>

<script lang="ts">
import { Room } from 'connector';
import { DeviceType } from 'connector/Enums';
import { Options, Vue } from 'vue-class-component';
import { defineAsyncComponent } from 'vue';
import { Humidity, Temperature } from '@/components/traits';

@Options({
  components: {
    DevTypeControl: defineAsyncComponent(() => import("./DevTypeControl.vue")),
    Humidity,
    Temperature
  },
  props: {
    room!: Room
  }
})
export default class DashboardRoomHeader extends Vue {
    room!: Room;
    selected: DeviceType | false = false;

    getTypes(): {name: string, icon: string}[] {
        const typeNames: DeviceType[] = Object.keys(this.room.GetTraits()) as DeviceType[];
        let ret: {name: string, icon: string}[] = [];

        typeNames.forEach(t => {
            let icon = 'chip';
            switch (t) {
                case 'Lights':      icon = 'lamps'; break;
                case 'Blinds':      icon = 'blinds'; break;
                case 'Heater':      icon = 'radiator'; break;
                case 'Multimedia':  icon = 'filmstrip-box-multiple'; break;
                case 'Sensors':     icon = 'leak'; break;
            }
            ret.push({name: t, icon})
        })

        return ret;
    }
}
</script>
