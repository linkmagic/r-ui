<template>
    <div class="Training__Memory__Topological">
        <div class="Topological__Sidebar">
            <div class="Training__ControllerType">
                Controller type
            </div>
            <div class="Training__ActionResult">
                Action result
            </div>
            <div class="Training__ActionTask">
                <div class="Training__ActionTask__Value">
                    <span>trainingLetters.letterTask</span>
                </div>
            </div>
            <div class="Training__Details">
                <input class="Training__Details__TrainingsCountInput" value="3"/>
                <button class="Training__Details__StartBtn" v-on:click="startBtnOnClick">
                    START
                </button>
                <button class="Training__Details__StopBtn">
                    STOP
                </button>
                <button class="Training__Details__StopBtn">
                    Trainings loop
                </button>
            </div>
        </div>
        
        <div class="Topological__WorkingPlace">
            
        </div>
        
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';

const letters = [
    'А', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Е',
    'Є', 'Ж', 'З', 'И', 'І', 'Ї', 'Й',
    'К', 'Л', 'М', 'Н', 'О', 'П', 'Р',
    'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч',
    'Ш', 'Щ', 'Ь', 'Ю', 'Я',
];

@Component({
    components: {
    },
})

export default class TopologicalMemory extends Vue {

    @Prop() public someProp!: string;

    public trainingLevel: number = 0;
    public lettersTrainingArray: string[] = [];
    public lettersTrainingCount: number = 0;
    public letterTask: string = '';
    public errorsMax: number = 0;
    public errorsCount: number = 0;
    public trainigIsEndByError: boolean = false;
    public trainigIsEndBySuccess: boolean = false;
    public timeStart: number = 0;
    public timeEnd: number = 0;

    public initTrainingSequence() {
        this.trainingLevel = 3;  // set this value from UI
        this.lettersTrainingArray = [];
        this.lettersTrainingCount = Math.trunc(((letters.length / 100) * this.trainingLevel) * 10);
        this.letterTask = '';
        this.errorsMax = 3;  // set this value from UI
        this.errorsCount = 0;
        this.trainigIsEndByError = false;
        this.trainigIsEndBySuccess = false;
        this.timeStart = 0;
        this.timeEnd = 0;

        let indexLetter;
        let letterExists;

        // filling an array of training
        let i = 0;
        while (i < this.lettersTrainingCount) {
            indexLetter = Math.floor(Math.random() * letters.length);
            letterExists = false;
            for (const ch of this.lettersTrainingArray) {
                if (ch === letters[indexLetter]) {
                    letterExists = true;
                    break;
                }
            }
            if (!letterExists) {
                this.lettersTrainingArray.push(letters[indexLetter]);
                i++;
            }
        }

    }

    private startBtnOnClick() {
        this.initTrainingSequence();
    }

}

</script>

<style scoped>

.Training__Memory__Topological {
    font-size: 2.5em;
}

.Topological__Sidebar {
    display: block;
    position: absolute;
    top: 0;
    width: 200px;
    padding: 45px 0 0 0;
    height: calc(100% - 50px);
    background-color: #F9F1E4;
    z-index: -1;
}

.Topological__WorkingPlace {
    display: block;
    position: absolute;
    top: 0;
    width: calc(100% - 225px);
    height: calc(100% - 75px);
    margin: 0 0 0 200px;
    padding: 75px 0 0 25px;
    background-color: #F9F1E4;
    z-index: -1;
}

.Training__Topological__Item {
    display: inline-block;
    width: 76px;
    padding: 8px;
    text-align: center;
    margin: 16px;
    border: 1px solid gray;
    border-radius: 8px;
    font-size: 52px;
    font-weight: bold;
    color: rgb(64, 48, 32);
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.75);
}

.Training__ControllerType,
.Training__ActionResult,
.Training__ActionTask,
.Training__Details{
    display: block;
    width: 100%;
    height: 100px;
    border-bottom: 4px solid #F9F1E4;
    background-color: #f7f7f7;
}

.Training__ActionTask,
.Training__Details {
    height: 150px;
}

.Training__Details > button {
    display: block;
    width: 100%;
    height: 32px;
    margin: 0 0 4px 0;
}

.Training__ActionTask__Value {
    text-align: center;
    padding: 25% 0;
    font-size: 56px;
    font-family: RobotoRegular, sans-serif, Helvetica, Arial;
}

.Training__Details__TrainingsCountInput {
    width: calc(100% - 12px);
    margin: 4px;
    text-align: center;
}

</style>
