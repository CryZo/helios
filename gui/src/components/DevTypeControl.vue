<template>
  <div class="flex justify-between space-x-3">
    <div class="min-w-0 flex-1">
      <div class="flex items-center">
        <slot></slot>
        <span class="mx-auto"></span>

        <!-- Small controls -->
        <r-g-b class="ml-1" v-if="CheckTrait('RGB')" :room="room" :devType="type"></r-g-b>
        <on-off class="ml-1" v-if="CheckTrait('OnOff')" :room="room" :devType="type"></on-off>
      </div>

      <!-- Large controls -->
      <brightness class="mt-4" v-if="CheckTrait('Brightness')" :room="room" :devType="type"></brightness>

      <div v-if="CheckTrait('OpenClose') || CheckTrait('Position')" class="flex flex-col sm:flex-row mt-4 w-full">
        <open-close class="w-full" v-if="CheckTrait('OpenClose')" :room="room" :devType="type" :class="{'mr-2': CheckTrait('Position')}"></open-close>
        <position   class="w-full" v-if="CheckTrait('Position')"  :room="room" :devType="type"></position>
      </div>

      <temperature-setting class="mt-4" v-if="CheckTrait('TemperatureSetting')" :room="room" :devType="type"></temperature-setting>
    </div>
  </div>
</template>

<script lang="ts">
import { Room } from 'connector';
import { DeviceType, Trait } from 'connector/Enums';
import { Options, Vue } from 'vue-class-component';

import { Brightness, OnOff, OpenClose, Position, RGB, TemperatureSetting } from '@/components/traits';

@Options({
  components: {
    OnOff,
    Brightness,
    RGB,
    OpenClose,
    Position,

    TemperatureSetting,
  },
  props: {
    room!: Room,
    type!: DeviceType
  }
})
export default class DevTypeControl extends Vue {
  room!: Room;
  type!: DeviceType;

  public CheckTrait(traitName: Trait): boolean {
    return this.room.GetTraits()[this.type].includes(traitName);
  }
}
</script>
