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

const nextDateForRepetition = days =>
    new Date().setDate(new Date().getDate() + Math.floor(Math.random() * days))


const saveNewQuestion = model =>
    ({
        ...model,
        newQuestion: '',
        newAnswer: '',
        newId: model.cards.length + 1,
        cards: [...model.cards, { id: model.newId, question: model.newQuestion, answer: model.newAnswer, numberOfRepetitions: 0, repeatNextDate: nextDateForRepetition(0) }],
        repetition: [...model.repetition, { id: model.newId, question: model.newQuestion, answer: model.newAnswer, numberOfRepetitions: 0, repeatNextDate: nextDateForRepetition(0) }]
    })

export { addNewQuestionToModel, addNewAnswerToModel, saveNewQuestion }

const initModelAddNewQuiz = {
    newQuestion: '',
    newAnswer: '',
    newId: 0,
}


export default initModelAddNewQuiz