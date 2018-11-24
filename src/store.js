import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isVisibleTrainingResultChart: false
	},
	mutations: {
		setVisibleTrainingResultChart(state, value) {
			state.isVisibleTrainingResultChart = value;
		}
	},
	actions: {

	}
})
