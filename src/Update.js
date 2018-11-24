const MSGS = {
    START_QUIZ: 'START_QUIZ',
    SHOW_ANSWER: 'SHOW_ANSWER',
    ANSWER_STATUS: 'ANSWER_STATUS',
    NEXT_QUESTION: 'NEXT_QUESTION',
    NEW_QUESTION: 'NEW_QUESTION',
    NEW_ANSWER: 'NEW_ANSWER',
    SAVE_NEW_QUESTION: 'SAVE_NEW_QUESTION'
}

const newAnswerMsg = value => ({
    type: MSGS.NEW_ANSWER,
    value
})

const newQuestionMsg = value => {
    return {
        type: MSGS.NEW_QUESTION,
        value
    }
}

const nextQuestionMsg = () => {
    return {
        type: MSGS.NEXT_QUESTION,
    }
}

const answerStatusMsg = status => {
    return {
        type: MSGS.ANSWER_STATUS,
        status
    }
}

const showAnswerMsg = () => {
    return {
        type: MSGS.SHOW_ANSWER
    }
}


const startQuizMsg = () => {
    return {
        type: MSGS.START_QUIZ
    }
}

const saveNewQuestionMsg = () => ({ type: MSGS.SAVE_NEW_QUESTION })

export { startQuizMsg, showAnswerMsg, answerStatusMsg, nextQuestionMsg, newQuestionMsg, newAnswerMsg, saveNewQuestionMsg }

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




const switchcase = cases => key => model =>
    cases.hasOwnProperty(key)
        ? cases[key]()
        : model /* this is an defaultCase for the switch loop here */

const startQuiz = model => ({ ...model, currQuestion: model.cards[0].question, currAnswer: model.cards[0].answer, currId: model.cards[0].id, showAnswer: false, nextId: model.cards[0].id + 1 })
const showAnswer = model => ({ ...model, showAnswer: true })

const setAnswerStatus = msg => model =>
    msg.status === 'yes'
        ? { ...model }
        : addQuestionToRepetition(model)

const addNewQuestionToModel = msg => model => (
    {
        ...model,
        newQuestion: msg.value,
        newId: model.cards.length
    }
)

const addNewAnswerToModel = msg => model =>
    ({
        ...model,
        newAnswer: msg.value,
        newId: model.cards.length
    })

const saveNewQuestion = model =>
    ({
        ...model,
        newQuestion: '',
        newAnswer: '',
        newId: model.cards.length + 1,
        cards: [...model.cards, { id: model.newId, question: model.newQuestion, answer: model.newAnswer }]
    })

const update = (msg, model) =>
    switchcase({
        [MSGS.START_QUIZ]: () => startQuiz(model),
        [MSGS.SHOW_ANSWER]: () => showAnswer(model),
        [MSGS.ANSWER_STATUS]: () => setAnswerStatus(msg)(model),
        [MSGS.NEXT_QUESTION]: () => navigateToNextQuestion(model),
        [MSGS.NEW_QUESTION]: () => addNewQuestionToModel(msg)(model),
        [MSGS.NEW_ANSWER]: () => addNewAnswerToModel(msg)(model),
        [MSGS.SAVE_NEW_QUESTION]: () => saveNewQuestion(model),
    })(msg.type)(model)



export default update