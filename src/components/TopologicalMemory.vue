<template>
    <div class="Training__Memory__Topological">
        <div class="Topological__Sidebar">
            <div class="Training__ControllerType">
                <!-- Controller type -->
            </div>
            <div class="Training__ActionResult">
                <!-- Action result -->
            </div>
            <div class="Training__ActionTask">
                <div class="Training__ActionTask__Value">
                    <span v-if="showLetterTask">{{letterTask}}</span>
                </div>
            </div>

            <div class="Training__Details">

                <table>
                    <tr>
                        <td>Уровень</td>
                        <td>
                            <input type="number" min=1 max=10 class="Training__Details__TrainingsCountInput" v-model="trainingLevel"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Макс. ошибок</td>
                        <td><input type="number" min=1 max=5 class="Training__Details__TrainingsCountInput" v-model="errorsMax"/></td>
                    </tr>
                </table>

                <button class="Training__Details__StartBtn" v-on:click="startBtnOnClick">
                    С Т А Р Т
                </button>
                
                <button class="Training__Details__StopBtn" v-on:click="turnBackCards">
                    Поворот (ТЕСТ)
                </button>

                <!-- <button class="Training__Details__StopBtn">
                    Trainings loop
                </button> -->

            </div>
        </div>
        
        <div class="Topological__WorkingPlace">

            <div v-for="letter in lettersTrainingArray" v-bind:key="letter.name"
                 v-on:click="trainCardOnClick"
                 class="flip-container"
                 v-bind:id="'idTrainCard_' + letter.name"
                 >

                <div class="flipper">
                    <div class="front">
                        {{letter.name}}
                    </div>
                    <div class="back" :letter="letter.name">
                        {{'%'}}
                    </div>
                </div>
            </div>

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

interface ILetterTraining {
    name: string;
    showFace: boolean;
}

@Component({
    components: {
    },
})

export default class TopologicalMemory extends Vue {

    @Prop() public someProp!: string;

    public trainingLevel: number = 1;
    public lettersTrainingArray: ILetterTraining[] = [];
    public lettersTrainingCount: number = 0;
    public letterTask: string = '';
    public showLetterTask: boolean = false;
    public errorsMax: number = 1;
    public errorsCount: number = 0;
    public trainigIsEndByError: boolean = false;
    public trainigIsEndBySuccess: boolean = false;
    public timeStart: number = 0;
    public timeEnd: number = 0;

    public initTrainingSequence() {
        // this.trainingLevel = 3;  // set this value from UI
        this.lettersTrainingArray = [];
        this.lettersTrainingCount = Math.trunc(((letters.length / 100) * this.trainingLevel) * 10);
        this.letterTask = '';
        // this.errorsMax = 3;  // set this value from UI
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
                if (ch.name === letters[indexLetter]) {
                    letterExists = true;
                    break;
                }
            }
            if (!letterExists) {
                this.lettersTrainingArray.push({
                    name: letters[indexLetter],
                    showFace: false,
                });
                i++;
            }
        }

        // generate letter task
        this.letterTask = this.lettersTrainingArray[Math.trunc(Math.random() * this.lettersTrainingArray.length)].name;
    }

    private turnBackCards() {
        for (const letter of this.lettersTrainingArray) {
            const elemCard = document.getElementById('idTrainCard_' + letter.name) as HTMLDivElement;
            const elemFlipper = elemCard.getElementsByClassName('flipper')[0];
            if (elemFlipper !== null) {
                elemFlipper.classList.add('flipper_turned');
            }
        }
    }

    private startBtnOnClick() {
        this.initTrainingSequence();
    }

    private trainCardOnClick(e: any) {
        const clickedCardElem = e.target as HTMLDivElement;
        const clickedLetter = clickedCardElem.getAttribute('letter');
        if (clickedLetter !== null) {
            const card = document.getElementById('idTrainCard_' + clickedLetter) as HTMLDivElement;
            const elemFlipper = card.getElementsByClassName('flipper')[0];
            if (elemFlipper !== null) {
                elemFlipper.classList.remove('flipper_turned');
            }
        }
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

.Item__flip {
    transform: rotateY(180deg);
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

table td {
    font-size: 16px;
    text-align: right;
}
table {
    margin: 0 0 8px 0;
}
table input {
    max-width: 64px;
    font-size: 18px;
    border-radius: 4px;
    border: 1px solid #aeaeae;
}

.Training__ActionTask__Value {
    text-align: center;
    padding: 25% 0;
    font-size: 52px;
    font-weight: bold;
    font-family: sans-serif, Helvetica, Arial;
}

.Training__Details__TrainingsCountInput {
    width: calc(100% - 12px);
    margin: 4px;
    text-align: center;
}

/* Flipped training card */

.flip-container {
    display: inline-block;
    perspective: 1000px;
    margin: 32px 32px;
}

.flip-container, 
.front, 
.back {
    width: 76px;
    height: 76px;
}

.flipper {
    transition: 0.25s;
    transform-style: preserve-3d;
    position: relative;
}

.flipper_turned {
    transform: rotateY(180deg);
}

.front,
.back {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
}

.front {
    z-index: 2;
    transform: rotateY(0deg);
    width: 76px;
    padding: 12px 0 0 0;
    text-align: center;
    border: 1px solid gray;
    border-radius: 8px;
    font-size: 52px;
    font-weight: bold;
    color: rgb(64, 48, 32);
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.75);
}

.back {
    transform: rotateY(180deg);
    width: 76px;
    padding: 12px 0 0 0;
    text-align: center;
    border: 1px solid gray;
    border-radius: 8px;
    font-size: 52px;
    font-weight: bold;
    color: rgb(64, 48, 32);
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.75);
}

</style>
