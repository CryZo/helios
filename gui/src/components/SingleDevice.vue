<template>
  <li class="relative bg-white dark:bg-gray-900 py-5 px-4 hover:bg-gray-50 dark:hover:bg-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600">
    <div class="flex justify-between space-x-3">
      <div class="min-w-0 flex-1">
        <div class="flex items-center | text-sm font-medium text-gray-900 dark:text-gray-100">
          <p class="truncate mr-auto">{{ device.Name }}</p>

          <!-- Small controls -->
          <temperature class="ml-1" v-if="CheckTrait('Temperature', device)" :device="device"></temperature>
          <humidity class="ml-1" v-if="CheckTrait('Humidity', device)" :device="device"></humidity>

          <r-g-b class="ml-1" v-if="CheckTrait('RGB', device)" :device="device"></r-g-b>
          <on-off class="ml-1" v-if="CheckTrait('OnOff', device)" :device="device"></on-off>
        </div>

        <!-- Large controls -->
        <brightness class="mt-4" v-if="CheckTrait('Brightness', device)" :device="device"></brightness>
        <color-temperature class="mt-4" v-if="CheckTrait('ColorTemperature', device)" :device="device"></color-temperature>

        <div v-if="CheckTrait('OpenClose', device) || CheckTrait('Position', device)" class="flex flex-col sm:flex-row mt-4 w-full">
          <open-close class="w-full" v-if="CheckTrait('OpenClose', device)" :class="{'mr-2': CheckTrait('Position', device)}" :device="device"></open-close>
          <position class="w-full" v-if="CheckTrait('Position', device)" :device="device"></position>
        </div>

        <temperature-setting class="mt-4" v-if="CheckTrait('TemperatureSetting', device)" :device="device"></temperature-setting>

        <!-- <p class="text-sm text-gray-500 truncate">{{ message.subject }}</p> -->
      </div>
      <!-- <time :datetime="message.datetime" class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">{{ message.time }}</time> -->
    </div>
    <!-- <div class="mt-1">
      <p class="line-clamp-2 text-sm text-gray-600">
        {{ message.preview }}
      </p>
    </div> -->
  </li>
</template>

<script lang="ts">
import { Device } from 'connector';
import { Trait } from 'connector/Enums';
import { Options, Vue } from 'vue-class-component';

import { Brightness, Humidity, OnOff, OpenClose, Position, RGB, Temperature, TemperatureSetting, ColorTemperature } from '@/components/traits';

@Options({
  components: {
			OnOff,
			Brightness,
			RGB,
			OpenClose,
			Position,
      ColorTemperature,

			TemperatureSetting,
			Temperature,
			Humidity
  },
  props: {
    device!: Device
  }
})
export default class SingleDevice extends Vue {
  private CheckTrait(traitName: Trait, device: Device): boolean {
    return device.Traits.includes(traitName);
  }
}
</script>
