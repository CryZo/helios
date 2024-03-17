<template>
	<div class="flex row items-center">
		<SliderInput
			v-if="device"
			class="w-full rounded-md"
			style="background-image: linear-gradient(to right, rgb(238, 255, 255), rgb(255, 136, 17));"
			:min="device.MinColorTemperature ?? 0"
			:max="device.MaxColorTemperature ?? 100"
			:value="device.ColorTemperature"
			@input="Control"
			/>

		<SliderInput
			v-if="room"
			class="w-full"
			style="background-image: linear-gradient(to right, rgb(238, 255, 255), rgb(255, 136, 17));"
			min="0"
			max="100"
			@input="Control"
			/>
	</div>
</template>

<script lang="ts">
import { Device, Room } from 'connector';
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
export default class ColorTemperature extends Vue {
	device?: Device;
	room?: Room;
	devType?: string;

	private Control(e: Event) {
		const value = parseInt((<HTMLInputElement>e.target).value);

		if (this.device) {
			this.device.SetColorTemperature(value);
		}
		else if (this.room) {
			window.backendConnection.sendRoomCommand(this.room._id, this.devType ?? '', `${value}`);
		}
	}
}
</script>
