<template>
	<input class="h-10 w-20 dark:bg-transparent" type="color" name="favcolor" :value="CurrentColor()" @change="Control($event)">
</template>

<script lang="ts">
import { Color, Device, Room } from '@connector';
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    device: Device,
    room: Room,
    devType: String
  }
})
export default class RGB extends Vue {
	device?: Device;
	room?: Room;
	devType?: string;

	public CurrentColor(): string {
		if (this.device)
			return `#${this.device.Color.GetHexColor()}`;
		else
			return '#000000'
	}

	public Control(e: Event) {
		if (this.device)
			this.device.SetColor(Color.Parse((<HTMLInputElement>e.target).value.substring(1)));
		else if (this.room)
			window.backendConnection.sendRoomCommand(this.room._id, this.devType ?? '', (<HTMLInputElement>e.target).value.substring(1));
	}
}
</script>
