<template>
	<div class="">
		TopologicalMemory
	</div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TopologicalMemory extends Vue {
	@Prop() private someProp!: string;

}

</script>

<style scoped>



</style>
