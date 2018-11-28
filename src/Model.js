import initModelCard from './store/card'
import initModelAddNewQuiz from './store/add-question'
import initModelRepeatCards from './store/repeat'
import { initModelAuth } from './store/auth'

const makeYMD = d =>
    d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()


const initModel = {
    ...initModelCard,
    ...initModelAddNewQuiz,
    ...initModelRepeatCards,
    today: makeYMD(new Date()),
    user: { ...initModelAuth },
    numberOfCards: 0,
    cards: [],
    numberOfRepetitionCards: 0,
    repetition: []
}

export default initModel