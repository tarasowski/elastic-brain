import initModelCard from '../reducers/learn'
import initModelAddNewQuiz from '../reducers/add-question'
import initModelRepeatCards from '../reducers/repeat'
import { initModelCourses } from '../reducers/courses'
import {
    signupView,
    confirmationView,
    loginView,
    username,
    password,
    email,
    pin,
    showConfirmation,
    message,
    accessToken
} from './singup'

const makeYMD = d =>
    d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()


export const initModel = {
    signup: {
        signupView,
        confirmationView,
        loginView
    },
    ...initModelCard,
    courses: { ...initModelCourses },
    ...initModelAddNewQuiz,
    ...initModelRepeatCards,
    today: makeYMD(new Date()),
    user: {
        username,
        password,
        email,
        pin,
        showConfirmation,
        message,
        accessToken
    },
    numberOfCards: 0,
    activeCategory: 'all',
    categoryView: false,
    activeCards: [],
    cards: [],
    numberOfRepetitionCards: 0,
    repetition: [],
    activeRepetitionCards: [],
    activeRepetitionCategory: 'all',
    categoryRepetitionView: false,
}
