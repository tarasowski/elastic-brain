import initModelCard from './store/card'
import initModelAddNewQuiz from './store/add-question'
import initModelRepeatCards from './store/repeat'


const initModel = {
    ...initModelCard,
    ...initModelAddNewQuiz,
    ...initModelRepeatCards,
    cards: [
        {
            id: 0,
            question: '1st question on 24th of November',
            answer: '1st answer',
            numberOfRepetitions: 0,
            repeatNextDate: 1543076228417,
        },
        {
            id: 1,
            question: '2nd question on 25th of November',
            answer: '2nd answer',
            numberOfRepetitions: 0,
            repeatNextDate: 543157048000,
        },
        {
            id: 2,
            question: '3rd question on 26th of November',
            answer: '3rd answer',
            numberOfRepetitions: 0,
            repeatNextDate: 1543243448000,
        },
    ],
    repetition: [

    ]
}

export default initModel