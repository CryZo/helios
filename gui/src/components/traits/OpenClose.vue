<template>
	<div class="flex flex-row flex-nowrap">
		<button v-bind:class="{ active: IsActive('close') }" class="bg-gray-500 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800 text-white font-bold h-10 px-2 w-full rounded-l-lg" type="button" @click.prevent="Control('Closing')"><p>{{ $t('components.openClose.close') }}</p></button>
		<button v-bind:class="{ active: IsActive('stop') }"  class="bg-danger-500 hover:bg-danger-700 dark:bg-danger-800 dark:hover:bg-danger-900 text-white font-bold h-10 px-2 w-full | col-span-2" type="button" @click.prevent="Control('Stop')"><p>{{ $t('components.openClose.stop') }}</p></button>
		<button v-bind:class="{ active: IsActive('open') }"  class="bg-gray-500 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800 text-white font-bold h-10 px-2 w-full rounded-r-lg" type="button" @click.prevent="Control('Opening')"><p>{{ $t('components.openClose.open') }}</p></button>
	</div>
</template>

<script lang="ts">
import { Device, Room } from 'connector';
import { BlindStatus } from 'connector/Enums';
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    device: Device,
	room: Room,
	devType: String
  }
})
export default class OpenClose extends Vue {
	device?: Device;
	room?: Room;
	devType?: string;

	private IsActive(element: 'open' | 'close' | 'stop'): boolean {
		if (this.device && (
			(this.device.MovementStatus === BlindStatus.Opening && element === 'open') ||
			(this.device.MovementStatus === BlindStatus.Closing && element === 'close') ||
			(this.device.MovementStatus === BlindStatus.Stop && element === 'stop')))
			return true;

		return false;
	}

	private Control(cmd: BlindStatus) {
		if (this.device) {
			switch (cmd) {
				case BlindStatus.Opening: return this.device.Open();
				case BlindStatus.Closing: return this.device.Close();
				case BlindStatus.Stop: return this.device.Stop();
			}
		}
		else if (this.room) {
			window.backendConnection.sendRoomCommand(this.room._id, this.devType ?? '', cmd);
		}
	}
}
</script>

<style scoped lang="scss">
</style>