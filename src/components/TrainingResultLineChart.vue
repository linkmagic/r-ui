<style scoped>

.ChartContainer {
    display: block;
    width: calc(100% / 2);
    height: calc(100% / 2);
    padding: 16px;
    background-color: #ffffff;
    border: 2px solid #aeaeae;
    border-radius: 8px;
    box-shadow: 2px 2px 16px rgba(0,0,0,0.5);
}

.btnClose {
    float: right;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 16px;
    background-color: #c71414;
    color: #fff;
    border: 3px solid #c71414;
    border-radius: 4px;
    box-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    transition: 0.25s;
}

.btnClose::after {
    content: '✖';
}

.btnClose:focus {
    outline: none;
}

.btnClose:hover {
    background-color: #e23434;
    border: 3px solid #e23434;
    box-shadow: 1px 1px 10px #e23434;
}

.btnClose:active {
    background-color: #a50c0c;
    border: 3px solid #a50c0c;
}

.LineChartView {
    display: block;
}

</style>

<template>
	<div v-if="isVisible" class="ChartContainer">
        <button class="btnClose" @click="btnCloseOnClick"/>
		<ResultLineChart class="LineChartView" :labels="chartLabels" :data="chartData" />
	</div>
</template>

<script>

import ResultLineChart from '@/components/ResultLineChart.js'

export default {
    name: 'TrainingResultLineChart',

    props: {
        labels: Array,
        chartColor: Array,
        resultDataChart: Array[[]]
    },

    components: {
		ResultLineChart
    },

    computed: {
		isVisible() {
			return this.$store.state.isVisibleTrainingResultChart;
		}
	},

	data: function() {
		return {
			chartLabels: [],
            chartData: [{}],
            resultDataChartVisible: false
		}
    },

    beforeMount() {
        this.chartLabels = this.labels;
        this.resultDataChartVisible = this.isVisible;
        this.chartData = [];
        for (let i = 0; i < this.resultDataChart.length; i++) {
            this.chartData.push({
                label: this.labels[i],
                showLine: true,
                borderColor: this.chartColor[i],
                pointBackgroundColor: this.chartColor[i],
                borderWidth: 3,
                pointRadius: 3,
                pointStyle: 'circle',
                pointHoverBorderColor: '#000000',
                pointHoverBorderWidth: 1,
                fill: false,
                data: this.resultDataChart[i]
            });
        }
    },

    methods: {
        btnCloseOnClick: function() {
            this.$store.commit('setVisibleTrainingResultChart', false);
        }
    }

}

</script>
