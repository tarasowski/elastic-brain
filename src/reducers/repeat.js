const checkForTodaysRepetitions = model =>
    model.repetition.filter(({ repeatNextDate }) => repeatNextDate === makeYMD(new Date()))


const startRepeat = model =>
    ({
        ...model,
        showRepeatAnswer: false,
        repetition: [...checkForTodaysRepetitions(model)],
        repeatQuestion: [...checkForTodaysRepetitions(model)][0].question,
        repeatAnswer: [...checkForTodaysRepetitions(model)][0].answer,
        currRepeatId: [...checkForTodaysRepetitions(model)][0].userId_category_uuId,
        nextRepeatId: 0
    })

const showRepeatAnswer = model => ({
    ...model,
    showRepeatAnswer: true,
})


const makeYMD = d =>
    d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()

const nextDateForRepetition = d => days =>
    makeYMD(new Date(d.setDate(d.getDate() + Math.floor(Math.random() * ((days * days + 1) / 2) + days))))

const updateNumberOfRepetitions = model =>
    model.cards.map(element => {
        return element.userId_category_uuId === model.currRepeatId
            ? {
                ...element,
                numberOfRepetitions: element.numberOfRepetitions === 0 ? 1 : element.numberOfRepetitions + 1,
                repeatNextDate: element.numberOfRepetitions === 0 ? nextDateForRepetition(new Date())(1) : nextDateForRepetition(new Date())(element.numberOfRepetitions)
            }
            : element
    })

const answerRepeatStatus = msg => model => {
    return msg.status === 'yes'
        ? [{
            ...model,
            repeatQuestion: '',
            repeatAnswer: '',
            currRepeatId: '',
            cards: updateNumberOfRepetitions(model),
            numberOfRepetitionCards: model.numberOfRepetitionCards - 1,
            repetition: model.repetition.filter(element => element.userId_category_uuId !== model.currRepeatId),
            activeRepetitionCards: model.repetition.filter(element => element.userId_category_uuId !== model.currRepeatId),
            showRepeatAnswer: false,
        }, { request: 'update-question', payload: model.currRepeatId }]

        : {
            ...model,
            repetition: model.repetition.reduce((acc, x) => [x].concat(acc), [])
        }

}

const nextRepeatQuestion = model => ({
    ...model,
    repeatQuestion: model.repetition[0].question,
    repeatAnswer: model.repetition[0].answer,
    currRepeatId: model.repetition[0].userId_category_uuId,
    nextRepeatId: 0,
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




