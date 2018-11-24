import { Line } from 'vue-chartjs';

export default {

    extends: Line,

    props: {
        labels: Array,
        data: Array[Object]
    },

    mounted() {
        this.renderChart({
            labels: this.labels,
            datasets: this.data
        }, {
            responsive: true,
            maintainAspectRatio: false
        })
    }

}
