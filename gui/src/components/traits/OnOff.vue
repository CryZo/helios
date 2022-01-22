<template>
	<toggle v-if="device" :enabled="device.Status" @click="Control()" />

	<div v-else-if="room" class="flex">
		<button class="bg-danger-500 hover:bg-danger-700 dark:bg-danger-800 dark:hover:bg-danger-900   text-white font-bold h-10 w-20 rounded-l-lg | flex-grow" @click="Control(false)">{{ $t('components.onOff.off') }}</button>
		<button class="bg-success-500 hover:bg-success-700 dark:bg-success-800 dark:hover:bg-success-900 text-white font-bold h-10 w-20 rounded-r-lg | flex-grow" @click="Control(true)">{{ $t('components.onOff.on') }}</button>
	</div>
</template>

<script lang="ts">
import { Device, Room } from 'connector';
import { Options, Vue } from 'vue-class-component';
import { Toggle } from '@/components/elements';

@Options({
	components: {
		Toggle
	},
	props: {
		device: Device,
		room: Room,
		devType: String
	}
})
export default class OnOff extends Vue {
	device?: Device;
	room?: Room;
	devType?: string;

	public Control(status?: boolean): void {
		if (this.device) {
			this.device.Toggle()
		}
		else if (this.room) {
			window.backendConnection.sendRoomCommand(this.room._id, this.devType ?? '', status ? 'on' : 'off');
		}
	}
}
</script>