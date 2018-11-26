import initModelCard from './store/card'
import initModelAddNewQuiz from './store/add-question'
import initModelRepeatCards from './store/repeat'
import { initModelAuth } from './store/auth'


const initModel = {
    ...initModelCard,
    ...initModelAddNewQuiz,
    ...initModelRepeatCards,
    user: { ...initModelAuth },
    cards: [],
    repetition: []
}

export default initModel