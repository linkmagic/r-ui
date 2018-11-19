<template>
    <div class="Training__Memory__Topological">
        <div class="Topological__Sidebar">

            <div class="Training__IndicatorLamps">
                <div class="cont_lamps">
                    <div id="idLampError" class="lamp_error"></div>
                    <div id="idLampOk" class="lamp_ok"></div>
                </div>
            </div>

            <div class="Training__ActionResult">
                <div class="Training__ActionResult__Value">
                    {{ timeDiff }}
                </div>

            </div>

            <div class="Training__ActionTask">
                <div v-if="showLetterTask" class="Training__ActionTask__Value">
                    {{ letterTask }}
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
                    <tr>
                        <td>Время (сек)</td>
                        <td><input type="number" min=1 max=60 class="Training__Details__TrainingsCountInput" v-model="timeMemorize"/></td>
                    </tr>
                </table>
            </div>

            <div class="Training__Details">
                <a class="ctrlButton ctrlBtn_start" v-on:click="startBtnOnClick"></a>
                <a class="ctrlButton ctrlBtn_stop" v-on:click="resetBtnOnClick"></a>
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

<script>

export default {
    name: 'TopologicalMemory',

    props: {
        someProp: String
    },

    data: function() {
        return {
            letters: [
                'А', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Е', 'Є', 'Ж', 'З', 'И', 'І', 'Ї', 'Й',
                'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч',
                'Ш', 'Щ', 'Ь', 'Ю', 'Я'
            ],
            trainingLevel: 1,
            lettersTrainingArray: [],
            lettersTrainingCount: 0,
            letterTask: '',
            showLetterTask: false,
            timeMemorize: 2,
            errorsMax: 2,
            errorsCount: 0,
            timeStart: 0,
            timeEnd: 0,
            timeDiff: '',
            isTrainingFinished: true,
            timerPtrMemorize: null,
            timerPtrLampOk: null,
            timerPtrLampError: null
        }
    },

    methods: {
        resetParams: function() {
            this.lettersTrainingArray = [];
            this.letterTask = '';
            this.showLetterTask = false;
            this.errorsCount = 0;
            this.timeStart = 0;
            this.timeEnd = 0;
            this.timeDiff = '';
            clearInterval(this.timerPtrMemorize);
        },

        initTrainingSequence: function() {
            this.resetParams();
            this.lettersTrainingCount = Math.trunc(((this.letters.length / 100) * this.trainingLevel) * 10);

            let indexLetter;
            let letterExists;

            // filling an array of training
            let i = 0;
            while (i < this.lettersTrainingCount) {
                indexLetter = Math.floor(Math.random() * this.letters.length);
                letterExists = false;
                for (const ch of this.lettersTrainingArray) {
                    if (ch.name === this.letters[indexLetter]) {
                        letterExists = true;
                        break;
                    }
                }
                if (!letterExists) {
                    this.lettersTrainingArray.push({
                        name: this.letters[indexLetter],
                        showFace: false,
                    });
                    i++;
                }
            }

            // generate letter task
            this.letterTask = this.lettersTrainingArray[Math.trunc(Math.random() * this.lettersTrainingArray.length)].name;

            // complete memorization and start of search task card
            this.timerPtrMemorize = setTimeout(() => {
                this.turnBackCards();
            }, this.timeMemorize * 1000);
        },

        turnBackCards: function() {
            for (const letter of this.lettersTrainingArray) {
                const elemCard = document.getElementById('idTrainCard_' + letter.name);
                const elemFlipper = elemCard.getElementsByClassName('flipper')[0];
                if (elemFlipper !== null) {
                    elemFlipper.classList.add('flipper_turned');
                }
            }
            clearInterval(this.timerPtrMemorize);
            this.showLetterTask = true;
            this.isTrainingFinished = false;
            this.timeStart = Date.now();
        },

        startBtnOnClick: function() {
            this.initTrainingSequence();
        },

        trainCardOnClick: function(e) {
            if (this.isTrainingFinished) {
                return;
            }

            const clickedCardElem = e.target;
            const clickedLetter = clickedCardElem.getAttribute('letter');

            if (clickedLetter !== null) {
                const card = document.getElementById('idTrainCard_' + clickedLetter);
                const elemFlipper = card.getElementsByClassName('flipper')[0];

                if (elemFlipper !== null) {
                    elemFlipper.classList.remove('flipper_turned');
                }

                if (clickedLetter === this.letterTask) {
                    this.timeEnd = Date.now();
                    this.isTrainingFinished = true;
                    this.timeDiff = ((this.timeEnd - this.timeStart) / 1000).toFixed(2).toString() + ' сек';

                    const okLampElem = document.getElementById('idLampOk');
                    if (okLampElem) {
                        okLampElem.style.opacity = '1.0';
                        this.timerPtrLampOk = setTimeout(() => {
                            okLampElem.style.opacity = '0.2';
                            clearTimeout(this.timerPtrLampOk);
                        }, 1000);
                    }
                } else {
                    this.errorsCount++;
                    if (this.errorsCount >= this.errorsMax) {
                        this.lettersTrainingArray = [];
                        this.errorsCount = 0;
                        this.letterTask = '';
                        this.showLetterTask = false;
                    }
                    const errorLampElem = document.getElementById('idLampError');
                    if (errorLampElem) {
                        errorLampElem.style.opacity = '1.0';
                        this.timerPtrLampError = setTimeout(() => {
                            errorLampElem.style.opacity = '0.2';
                            clearTimeout(this.timerPtrLampError);
                        }, 1000);
                    }
                }
            }
        },

        resetBtnOnClick: function () {
            this.resetParams();
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
    width: 250px;
    padding: 45px 22px 0 16px;
    height: calc(100% - 50px);
    background-color: #F9F1E4;
    z-index: -1;
}

.Topological__WorkingPlace {
    display: block;
    position: absolute;
    top: 0;
    width: calc(100% - 340px);
    height: calc(100% - 75px);
    margin: 0 0 0 300px;
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

.Training__IndicatorLamps,
.Training__ActionResult,
.Training__ActionTask,
.Training__Details {
    display: block;
    text-align: center;
    width: 100%;
    height: 100px;
    margin: 0 0 8px 0;
    background-color: #f9f1e4;
    border: 2px solid rgba(0,0,0,0.15);
    border-radius: 8px;
    box-shadow: 0px 0px 16px rgba(0,0,0,0.25);
}

.Training__ActionResult__Value {
    padding: 12% 0 0 0;
}

.Training__ActionTask,
.Training__Details {
    padding: 18px 0;
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
    padding: 0 0 0 16px;
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
    padding: 10% 0;
    font-size: 52px;
    font-weight: bold;
    font-family: sans-serif, Helvetica, Arial;
}

.Training__Details__TrainingsCountInput {
    width: calc(100% - 12px);
    margin: 4px;
    text-align: center;
}

/* Lamps */

.cont_lamps {
    display: block;
}

.lamp_error,
.lamp_ok {
    display: inline-block;
    width: 64px;
    height: 64px;
    border: none;
    border-radius: 50%;
}

.lamp_error {
    background: radial-gradient(ellipse at center, #ff5542 0%,#cf0404 100%);
    box-shadow: 0 0 16px #ff0000;
    margin: 16px 16px 0 0;
    opacity: 0.2;
    transition: opacity 0.2s;
}

.lamp_ok {
    background: radial-gradient(ellipse at center, #1ae45d 0%,#149b41 100%);
    box-shadow: 0 0 16px #118337;
    margin: 16px 0 0 16px;
    opacity: 0.2;
    transition: opacity 0.2s;
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

/* Process control Button */

.Cont_CtrlButtons {
    display: block;
    text-align: center;
    background-color: #f9f1e4;
    border: 2px solid rgba(0,0,0,0.15);
    border-radius: 16px;
    box-shadow: inset 0px 0px 16px rgba(0,0,0,0.25);
}

.ctrlButton {
    display: inline-block;
    height: 64px;
    width: 64px;
    margin: 16px 20px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    font-weight: bold;
    background-image: linear-gradient(to top, #f4f1ee, #fff);
    border-radius: 50%;
    border: none;
    box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, .3), inset 0px 4px 1px 1px white, inset 0px -3px 1px 1px rgba(204,198,197,.5);
}

.ctrlButton:focus {
    outline: none;
}

.ctrlButton:hover {
    background-image: linear-gradient(to top, #fff, #f4f1ee);
    color:#0088cc;
}

.ctrlButton:active {
    background-image: linear-gradient(to top, #efedec, #f7f4f4);
    box-shadow: 0 3px 5px 0 rgba(0,0,0,.4), inset 0px -3px 1px 1px rgba(204,198,197,.5);
}

.ctrlBtn_start:after {
    content: '▶';
    display: block;
    position: absolute;
    font-size: 32px;
    color: #45a752;
    margin: 15px 0 0 21px;
}

.ctrlBtn_stop:after {
    content: '◼';
    display: block;
    position: absolute;
    font-size: 32px;
    color: #c26028;
    margin: 15px 0 0 19px;
}

</style>
