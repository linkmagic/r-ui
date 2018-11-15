<template>
    <div class="home">
        <TopologicalMemory someProp="Some value..."/>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import TopologicalMemory from '@/components/TopologicalMemory.vue';

@Component({
    components: {
        TopologicalMemory,
    },
})
export default class Home extends Vue {

}

</script>
