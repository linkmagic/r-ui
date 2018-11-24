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
			// labels: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ],
			// chartColor: [ '#00bb00', '#ff0000' ],
			// resultDataChart: [
			// 	[1, 2, 3, -14, 19, 8, 17, 6, 31, 25],
            //     [9, 8, 7, 1, 2, 3, 4, 3, 2, 7]
			// ]
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
