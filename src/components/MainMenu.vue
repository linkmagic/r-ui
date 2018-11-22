<style scoped>

.MainMenu {
    display: flex;
    font-size: 1.3em;
}

.MainMenu__Column {
    margin: 8px;
}

.MainMenu__Section__Title {
    display: block;
    font-size: 2em;
    font-weight: bold;
    text-align: center;
}

.MainMenu__Section__Trainings {
    display: block;
}

.MainMenu__Section__Trainings > button {
    display: block;
}

.TrainingBtn {
    border: none;
    background-color: #0a5c87;
    color: #fff;
    min-width: 216px;
    padding: 8px;
    margin: 8px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.75);
    transition: 0.1s;
}
.TrainingBtn:active {
    background-color: #0D76AD;
    box-shadow: 0 1px 2px rgba(0,0,0,0.75);
}
.TrainingBtn:focus {
    outline: none;
}

</style>

<template>
    <div class="MainMenu">

        <div class="MainMenu__Column">
            <div class="MainMenu__Section__Title">uiTran.mainMenu.trainings.attention.title</div>
            <div class="MainMenu__Section__Trainings">
                <button class="TrainingBtn">
                    uiTran.mainMenu.trainings.attention.alertness
                </button>
                <button class="TrainingBtn">
                    uiTran.mainMenu.trainings.attention.reactionBehaviour
                </button>
                <button class="TrainingBtn">
                    uiTran.mainMenu.trainings.attention.responsiveness
                </button>
                <button class="TrainingBtn">
                    uiTran.mainMenu.trainings.attention.vigilance
                </button>
                <button class="TrainingBtn">
                    uiTran.mainMenu.trainings.attention.spatialOperations
                </button>
                <button class="TrainingBtn">
                    uiTran.mainMenu.trainings.attention.twoDOperations
                </button>
                <button class="TrainingBtn">
                    uiTran.mainMenu.trainings.attention.threeDOperations
                </button>
                <button class="TrainingBtn">
                    uiTran.mainMenu.trainings.attention.attentionConcentration
                </button>
                <button class="TrainingBtn">
                    uiTran.mainMenu.trainings.attention.dividedAttention
                </button>
            </div>
        </div>

        <div class="MainMenu__Column">
            <div class="MainMenu__Section__Title">
                uiTran.mainMenu.trainings.memory.title
            </div>
            <div class="MainMenu__Section__Trainings">
                <button class="TrainingBtn">
                    uiTran.mainMenu.trainings.memory.workingMemory
                </button>
                <button class="TrainingBtn" onClick={this.memoryTopologicalBtnClick}>
                    uiTran.mainMenu.trainings.memory.topologicalMemory
                </button>
                <button class="TrainingBtn">
                    uiTran.mainMenu.trainings.memory.physiognomicMemory
                </button>
                <button class="TrainingBtn">
                    uiTran.mainMenu.trainings.memory.memoryWords
                </button>
                <button class="TrainingBtn">
                    uiTran.mainMenu.trainings.memory.figuralMemory
                </button>
                <button class="TrainingBtn">
                    uiTran.mainMenu.trainings.memory.verbalMemory
                </button>
            </div>
        </div>

        <div class="MainMenu__Column">
            <div class="MainMenu__Section__Title">uiTran.mainMenu.trainings.executiveFunc.title</div>
            <div class="MainMenu__Section__Trainings">
                <button class="TrainingBtn">
                    uiTran.mainMenu.trainings.executiveFunc.shopping
                </button>
                <button class="TrainingBtn">
                    uiTran.mainMenu.trainings.executiveFunc.planHoliDay
                </button>
                <button class="TrainingBtn">
                    uiTran.mainMenu.trainings.executiveFunc.logicalReasoning
                </button>
                <button class="TrainingBtn">
                    uiTran.mainMenu.trainings.executiveFunc.calculations
                </button>
            </div>
        </div>

        <div class="MainMenu__Column">
            <div class="MainMenu__Section__Title">uiTran.mainMenu.trainings.visualField.title</div>
            <div class="MainMenu__Section__Trainings">
                <button class="TrainingBtn">
                    uiTran.mainMenu.trainings.visualField.saccadicTraining
                </button>
                <button class="TrainingBtn">
                    uiTran.mainMenu.trainings.visualField.exploration
                </button>
                <button class="TrainingBtn">
                    uiTran.mainMenu.trainings.visualField.overviewReading
                </button>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    name: 'MainMenu',

    props: {

    },

    data: function() {
        return {

        }
    },

    methods: {

    }

}
</script>
