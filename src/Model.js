import initModelCard from './store/learn'
import initModelAddNewQuiz from './store/add-question'
import initModelRepeatCards from './store/repeat'
import { initModelAuth } from './store/auth'
import { initModelCourses } from './store/courses'

const makeYMD = d =>
    d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()


const initModel = {
    ...initModelCard,
    courses: { ...initModelCourses },
    ...initModelAddNewQuiz,
    ...initModelRepeatCards,
    today: makeYMD(new Date()),
    user: { ...initModelAuth },
    numberOfCards: 0,
    activeCategory: 'all',
    categoryView: false,
    activeCards: [],
    cards: [],
    numberOfRepetitionCards: 0,
    repetition: []
}

export default initModel