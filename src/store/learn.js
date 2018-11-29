const startQuiz = model => (
    {
        ...model,
        currQuestion: model.activeCards[0].question,
        currAnswer: model.activeCards[0].answer,
        showAnswer: false,
        nextId: model.nextId === 0 ? model.nextId + 1 : 1
    }
)

const showAnswer = model => ({ ...model, showAnswer: true })

// const addQuestionToRepetition = model => {
//     return {
//         ...model,
//         repetition: [
//             ...model.repetition,
//             {
//                 id: model.currId,
//                 question: model.currQuestion,
//                 answer: model.currAnswer,
//             }
//         ]
//     }
// }


const navigateToNextQuestion = model =>
    model.activeCards.length > model.nextId
        ? {
            ...model,
            currQuestion: model.activeCards[model.nextId].question,
            currAnswer: model.activeCards[model.nextId].answer,
            currId: model.activeCards[model.nextId].id,
            showAnswer: false,
            nextId: model.nextId + 1
        }
        : {
            ...model,
            currQuestion: '',
            currAnswer: '',
            currId: '',
            showAnswer: false,
            activeCategory: 'all',
            categoryView: false,
            nextId: 0,
        }

export { startQuiz, showAnswer, navigateToNextQuestion, }

const initModelCard = {
    currQuestion: '',
    currAnswer: '',
    currId: 0,
    showAnswer: false,
    nextId: 0,
}

export default initModelCard