<template>
	<label class="flex row items-center">
		<mdicon name="thermometer" />
		<span v-if="device">{{ device.Temperature }}°C</span>
		<span v-else-if="room">{{ room.getAverageTemperature() }}°C</span>
	</label>
</template>

<script lang="ts">
import { Device, Room } from '@connector';
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    device: Device,
    room: Room,
  }
})
export default class Temperature extends Vue {
}
</script>
