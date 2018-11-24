import initModelCard from './store/card'
import initModelAddNewQuiz from './store/quiz'
import initModelRepeatCards from './store/repeat'


const initModel = {
    ...initModelCard,
    ...initModelAddNewQuiz,
    ...initModelRepeatCards,
    cards: [
        {
            id: 0,
            question: 'Q#1 My first question',
            answer: 'A#1 My first answer',
        },
    ],
    repetition: [

    ]
}

export default initModel