const startQuiz = model => ({ ...model, currQuestion: model.cards[0].question, currAnswer: model.cards[0].answer, currId: model.cards[0].id, showAnswer: false, nextId: model.cards[0].id + 1 })
const showAnswer = model => ({ ...model, showAnswer: true })

const addQuestionToRepetition = model => {
    return {
        ...model,
        repetition: [
            ...model.repetition,
            {
                id: model.currId,
                question: model.currQuestion,
                answer: model.currAnswer
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
            nextId: model.cards[model.nextId].id + 1
        }
        : {
            ...model
        }



const setAnswerStatus = msg => model =>
    msg.status === 'yes'
        ? { ...model }
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