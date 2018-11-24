const checkForTodaysRepetitions = model =>
    model.cards.filter(element => true)


const startRepeat = model =>
    ({
        ...model,
        repetition: [...checkForTodaysRepetitions(model)],
        repeatQuestion: [...checkForTodaysRepetitions(model)][0].question,
        repeatAnswer: [...checkForTodaysRepetitions(model)][0].answer,
        currRepeatId: 0,
        nextRepeatId: model.repetition.length
    })

const showRepeatAnswer = model => ({
    ...model,
    showRepeatAnswer: true,
})

const nextDateForRepetition = days =>
    new Date().setDate(new Date().getDate() + Math.floor(Math.random() * days))


const updateNumberOfRepetitions = model =>
    model.cards.map(element => {
        return element.id === model.currRepeatId
            ? {
                ...element,
                numberOfRepetitions: element.numberOfRepetitions === undefined ? 1 : element.numberOfRepetitions + 1,
                repeatNextDate: element.numberOfRepetitions === undefined ? nextDateForRepetition(2) : nextDateForRepetition(element.numberOfRepetitions)
            }
            : element
    })

const answerRepeatStatus = msg => model => {
    return msg.status === 'yes'
        ? {
            ...model,
            cards: updateNumberOfRepetitions(model),
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




