<template>
	<div class="home">
		<TestLineChart :labels="chartLabels" :data="chartData" />
		<!-- <TopologicalMemory someProp="Some value..." /> -->
		<!-- <MainMenu/> -->
	</div>
</template>

<script>

// import TopologicalMemory from '@/components/TopologicalMemory.vue'
import TestLineChart from '@/components/TestLineChart'
// import MainMenu from '@/components/MainMenu.vue'

export default {
	name: 'home',

	data: function() {
		return {
			chartLabels: [ '1', '2', '3', '4', '5', '6', '7' ],

			chartData: [{
                    label: 'Time',
                    showLine: true,
                    borderColor: '#00bb00',
					pointBackgroundColor: '#00bb00',
					borderWidth: 3,
					pointRadius: 3,
					pointStyle: 'circle',
					pointHoverBorderColor: '#000000',
					pointHoverBorderWidth: 1,
                    fill: false,
                    data: [1, 2, 3, 4, 9, 8, 7, 6, 3]
                },
                {
                    label: 'Errors',
                    showLine: true,
                    borderColor: '#ff0000',
					pointBackgroundColor: '#ff0000',
					borderWidth: 3,
					pointRadius: 3,
					pointStyle: 'circle',
					pointHoverBorderColor: '#000000',
					pointHoverBorderWidth: 1,
					fill: false,
                    data: [9, 8, 7, 1, 2, 3, 4, 3, 2]
                }
            ]
		}
	},

	components: {
		TestLineChart
		// TopologicalMemory
		// MainMenu
		// TrainingAnalytics
	}

}

</script>
