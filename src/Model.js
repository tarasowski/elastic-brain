import initModelCard from './store/card'
import initModelAddNewQuiz from './store/add-question'
import initModelRepeatCards from './store/repeat'


const initModel = {
    ...initModelCard,
    ...initModelAddNewQuiz,
    ...initModelRepeatCards,
    cards: [],
    repetition: []
}

export default initModel