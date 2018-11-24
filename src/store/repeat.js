const startRepeat = model =>
    ({
        ...model,
        repeatQuestion: model.repetition[0].question,
        repeatAnswer: model.repetition[0].answer,
        currRepeatId: model.repetition[0].id,
        nextRepeatId: model.repetition.length
    })

const showRepeatAnswer = model => ({
    ...model,
    showRepeatAnswer: true,
})

const answerRepeatStatus = msg => model => {
    return msg.status === 'yes'
        ? {
            ...model,
            repetition: model.repetition.filter(element => element.id !== model.currRepeatId)
        }

        : {
            ...model,
            repetition: model.repetition.reduce((acc, x) => [x].concat(acc), [])
        }

}

const nextRepeatQuestion = model => ({
    ...model,
    repeatQuestion: model.repetition[0].question,
    repeatAnswer: model.repetition[0].answer,
    currRepeatId: model.repetition[0].id,
    showRepeatAnswer: false,
})

export { startRepeat, showRepeatAnswer, answerRepeatStatus, nextRepeatQuestion }



const initModelRepeatCards = {
    repeatQuestion: '',
    repeatAnswer: '',
    currRepeatId: 0,
    nextRepeatId: 0,
    showRepeatAnswer: false,
}

export default initModelRepeatCards




