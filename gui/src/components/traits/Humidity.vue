<template>
	<label class="flex row items-center">
		<mdicon name="water-percent" />
		<span v-if="device">{{ device.Humidity }}%</span>
		<span v-else-if="room">{{ room.getAverageHumidity() }}%</span>
	</label>
</template>

<script lang="ts">
import { Device, Room } from 'connector';
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    device: Device,
    room: Room,
  }
})
export default class Humidity extends Vue {
}
</script>
