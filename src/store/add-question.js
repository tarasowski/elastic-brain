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

export const addNewCategoryToModel = category => model => ({ ...model, newCategory: category, newId: model.cards.length })

const nextDateForRepetition = d =>
    d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()


const saveNewQuestion = payload => model =>
    ([{
        ...model,
        newQuestion: '',
        newAnswer: '',
        newCategory: '',
    }, { request: 'save-question', payload: { ...payload, numberOfRepetitions: 0, repeatNextDate: nextDateForRepetition(new Date()) } }])

export const addNewCardToCards = payload => model =>
    ({
        ...model,
        numberOfCards: model.numberOfCards + 1,
        numberOfRepetitionCards: model.numberOfRepetitionCards + 1,
        cards: [...model.cards, { userId: payload.userId, userId_category_uuId: payload.userId_category_uuId, question: payload.question, answer: payload.answer, repeatNextDate: payload.repeatNextDate, category: payload.category, numberOfRepetitions: payload.numberOfRepetitions }],
        repetition: [{ userId: payload.userId, userId_category_uuId: payload.userId_category_uuId, question: payload.question, answer: payload.answer, repeatNextDate: payload.repeatNextDate, category: payload.category, numberOfRepetitions: payload.numberOfRepetitions }]
    })

export { addNewQuestionToModel, addNewAnswerToModel, saveNewQuestion }

const initModelAddNewQuiz = {
    newQuestion: '',
    newAnswer: '',
    newCategory: '',
    newId: 0,
}


export default initModelAddNewQuiz