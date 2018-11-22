<template>
	<div class="home">
		<TopologicalMemory someProp="Some value..." />
		<!-- <MainMenu/> -->
	</div>
</template>

<script>

import TopologicalMemory from '@/components/TopologicalMemory.vue'
// import MainMenu from '@/components/MainMenu.vue'

export default {
	name: 'home',

	components: {
		TopologicalMemory
		// MainMenu
	}

}

</script>
