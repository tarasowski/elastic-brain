const startQuiz = model => (
    {
        ...model,
        currQuestion: model.cards[0].question,
        currAnswer: model.cards[0].answer,
        //currId: model.cards[0].id,
        showAnswer: false,
        nextId: model.nextId === 0 ? model.nextId + 1 : 1
    }
)

const showAnswer = model => ({ ...model, showAnswer: true })

const addQuestionToRepetition = model => {
    return {
        ...model,
        repetition: [
            ...model.repetition,
            {
                id: model.currId,
                question: model.currQuestion,
                answer: model.currAnswer,
            }
        ]
    }
}


const navigateToNextQuestion = model =>
    model.cards.length > model.nextId
        ? {
            ...model,
            currQuestion: model.cards[model.nextId].question,
            currAnswer: model.cards[model.nextId].answer,
            currId: model.cards[model.nextId].id,
            showAnswer: false,
            nextId: model.nextId + 1
        }
        : {
            ...model
        }

const nextDateForRepetition = days =>
    new Date().setDate(new Date().getDate() + Math.floor(Math.random() * days))

const updateCards = model =>
    model.cards.map(element => {
        return element.id === model.currId
            ? {
                id: model.currId,
                question: model.currQuestion,
                answer: model.currAnswer,
                numberOfRepetitions: element.numberOfRepetitions === undefined ? 1 : element.numberOfRepetitions,
                repeatNextDate: element.numberOfRepetitions === undefined ? nextDateForRepetition(1) : nextDateForRepetition(element.numberOfRepetitions)
            }
            : element
    })


const setAnswerStatus = msg => model =>
    msg.status === 'yes'
        ? {
            ...model,
            cards: updateCards(model)
        }
        : addQuestionToRepetition(model)

export { startQuiz, showAnswer, addQuestionToRepetition, navigateToNextQuestion, setAnswerStatus }

const initModelCard = {
    currQuestion: '',
    currAnswer: '',
    currId: 0,
    showAnswer: false,
    nextId: 0,
}

export default initModelCard