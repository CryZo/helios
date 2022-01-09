<template>
	<div class="flex row items-center">
		<label v-if="device" class="mr-2" :for="device.id+'_position'">{{ device.Position }}%</label>
		<SliderInput v-if="device" :id="device.id+'_position'" class="w-full" min="0" max="100" :value="device.Position" @input="Control" />

		<SliderInput v-else-if="room" class="w-full" min="0" max="100" @input="Control" />
	</div>
</template>

<script lang="ts">
import { Device, Room } from '@connector';
import { Options, Vue } from 'vue-class-component';

import { SliderInput } from "@/components/elements";

@Options({
  props: {
    device: Device,
    room: Room,
    devType: String
  },
  components: {
	  SliderInput
  }
})
export default class Position extends Vue {
	device?: Device;
	room?: Room;
	devType?: string;

	private Control(e: Event) {
		const value = parseInt((<HTMLInputElement>e.target).value);

		if (this.device) {
			this.device.SetPosition(value);
		}
		else if (this.room) {
			window.backendConnection.sendRoomCommand(this.room._id, this.devType ?? '', `${value}`);
		}
	}
}
</script>
