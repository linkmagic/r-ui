<template>
	<div class="home">
		<TopologicalMemory someProp="Some value..." />
		<!-- <MainMenu/> -->
	</div>
</template>

<script>

// import TrainingResultLineChart from '@/components/TrainingResultLineChart'
import TopologicalMemory from '@/components/TopologicalMemory.vue'
// import MainMenu from '@/components/MainMenu.vue'

export default {
	name: 'home',

	data: function() {
		return {

		}
	},

	components: {
		TopologicalMemory
		// MainMenu
		// TrainingAnalytics
	},

	computed: {

	},

	methods: {

	}

}

</script>
