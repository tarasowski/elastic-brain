import { startRepeat, showRepeatAnswer, answerRepeatStatus, nextRepeatQuestion } from './store/repeat'
import { startQuiz, showAnswer, navigateToNextQuestion, setAnswerStatus } from './store/learn'
import { addNewQuestionToModel, addNewAnswerToModel, addNewCategoryToModel, saveNewQuestion, addNewCardToCards } from './store/add-question'
import { changeUrlState } from './store/router'
import { captureUsername, capturePassword, captureEmail, capturePin, signUpNewUser, successSignUp, confirmSignUp, successConfirmation, signIn, successSignIn, assignAccessToken } from './store/auth'
import { loadTodayCardsIntoModel, updateCardsOnload, initLoadAllCards } from './store/init'
import { addNewCourse, addNewCourseName, updateCourseList } from './store/courses'

const MSGS = {
    LOAD_ALL_CARDS: 'LOAD_ALL_CARDS',
    UPDATE_CARDS_ONLOAD: 'UPDATE_CARDS_ONLOAD',
    LOAD_TODAYS_CARDS: 'LOAD_TODAYS_CARDS',
    START_QUIZ: 'START_QUIZ',
    SHOW_ANSWER: 'SHOW_ANSWER',
    ANSWER_STATUS: 'ANSWER_STATUS',
    NEXT_QUESTION: 'NEXT_QUESTION',
    NEW_QUESTION: 'NEW_QUESTION',
    NEW_ANSWER: 'NEW_ANSWER',
    SAVE_NEW_QUESTION: 'SAVE_NEW_QUESTION',
    START_REPEAT: 'START_REPEAT',
    SHOW_REPEAT_ANSWER: 'SHOW_REPEAT_ANSWER',
    ANSWER_REPEAT_STATUS: 'ANSER_REPEAT_STATUS',
    NEXT_REPEAT_QUESTION: 'NEXT_REPEAT_QUESTION',
    CHANGE_URL_STATE: 'CHANGE_URL_STATE',
    SUBMIT_USERNAME: 'SUBMIT_USERNAME',
    SUBMIT_PASSWORD: 'SUBMIT_PASSWORD',
    SUBMIT_EMAIL: 'SUBMIT_EMAIL',
    SIGN_UP: 'SIGN_UP',
    SUBMIT_PIN: 'SUBMIT_PIN',
    SIGN_UP_CONFIRMATION: 'SIGN_UP_CONFIRMATION',
    SUCCESS_SIGN_UP: 'SUCCESS_SIGN_UP',
    SUCCESS_CONFIRMATION: 'SUCCESS_CONFIRMATION',
    CONFIRM_SIGN_UP: 'CONFRIM_SIGN_UP',
    SIGN_IN: 'SIGN_IN',
    SUCCESS_SIGN_IN: 'SUCCESS_SIGN_IN',
    GET_ACCESS_TOKEN: 'GET_ACCESS_TOKEN',
    SELECT_CATEGORY: 'SELECT_CATEGORY',
    ADD_NEW_CARD_TO_CARDS: 'ADD_NEW_CARD_TO_CARDS',
    ADD_NEW_COURSE: 'ADD_NEW_COURSE',
    NEW_COURSE_NAME: 'NEW_COURSE_NAME',
    UPDATE_COURSE_LIST: 'UPDATE_COURSE_LIST'
}

export const showRepeatAnswerMsg = () => ({ type: MSGS.SHOW_REPEAT_ANSWER })
export const answerRepeatStatusMsg = status => ({ type: MSGS.ANSWER_REPEAT_STATUS, status })
export const nextRepeatQuestionMsg = () => ({ type: MSGS.NEXT_REPEAT_QUESTION })
export const newAnswerMsg = value => ({ type: MSGS.NEW_ANSWER, value })
export const newQuestionMsg = value => ({ type: MSGS.NEW_QUESTION, value })
export const nextQuestionMsg = () => ({ type: MSGS.NEXT_QUESTION })
export const answerStatusMsg = status => ({ type: MSGS.ANSWER_STATUS, status })
export const showAnswerMsg = () => ({ type: MSGS.SHOW_ANSWER })
export const startQuizMsg = () => ({ type: MSGS.START_QUIZ })
export const saveNewQuestionMsg = ({ newQuestion, newAnswer, newCategory }) => ({ type: MSGS.SAVE_NEW_QUESTION, payload: { question: newQuestion, answer: newAnswer, category: newCategory } })
export const startRepeatMsg = () => ({ type: MSGS.START_REPEAT })
export const changeUrlStateMsg = url => ({ type: MSGS.CHANGE_URL_STATE, url })
export const submitUsernameMsg = value => ({ type: MSGS.SUBMIT_USERNAME, value })
export const submitUserPasswordMsg = value => ({ type: MSGS.SUBMIT_PASSWORD, value })
export const submitUserEmailMsg = value => ({ type: MSGS.SUBMIT_EMAIL, value })
export const submitUserPinMsg = value => ({ type: MSGS.SUBMIT_PIN, value })
export const signupNewUserMsg = () => ({ type: MSGS.SIGN_UP })
export const singupNewUserConfirmationMsg = () => ({ type: MSGS.SIGN_UP_CONFRIMATION })
export const successSignUpMsg = msg => ({ type: MSGS.SUCCESS_SIGN_UP, msg })
export const confirmSignUpMsg = () => ({ type: MSGS.CONFIRM_SIGN_UP })
export const successConfirmationMsg = msg => ({ type: MSGS.SUCCESS_CONFIRMATION, msg })
export const signInMsg = () => ({ type: MSGS.SIGN_IN })
export const successSignInMsg = msg => ({ type: MSGS.SUCCESS_SIGN_IN, msg })
export const accessTokenMsg = token => ({ type: MSGS.ACCESS_TOKEN, token })
export const getAccessTokenMsg = token => ({ type: MSGS.GET_ACCESS_TOKEN, token })
export const selectCategoryMsg = category => ({ type: MSGS.SELECT_CATEGORY, category })
export const addNewCardToCardsMsg = payload => ({ type: MSGS.ADD_NEW_CARD_TO_CARDS, payload })
export const loadTodaysCardsIntoModelMsg = () => ({ type: MSGS.LOAD_TODAYS_CARDS })
export const updateCardsOnloadMsg = payload => ({ type: MSGS.UPDATE_CARDS_ONLOAD, payload })
export const loadAllCardsMsg = payload => ({ type: MSGS.LOAD_ALL_CARDS, payload })
export const addNewCourseMsg = value => ({ type: MSGS.ADD_NEW_COURSE })
export const newCourseNameMsg = value => ({ type: MSGS.NEW_COURSE_NAME, value })
export const updateCourseListMsg = list => ({ type: MSGS.UPDATE_COURSE_LIST, list })


const switchcase = cases => key => model =>
    cases.hasOwnProperty(key)
        ? cases[key]()
        : model /* this is an defaultCase for the switch loop here */


const update = (msg, model) =>
    switchcase({
        [MSGS.START_QUIZ]: () => startQuiz(model),
        [MSGS.SHOW_ANSWER]: () => showAnswer(model),
        [MSGS.ANSWER_STATUS]: () => setAnswerStatus(msg)(model),
        [MSGS.NEXT_QUESTION]: () => navigateToNextQuestion(model),
        [MSGS.NEW_QUESTION]: () => addNewQuestionToModel(msg)(model),
        [MSGS.NEW_ANSWER]: () => addNewAnswerToModel(msg)(model),
        [MSGS.SAVE_NEW_QUESTION]: () => saveNewQuestion(msg.payload)(model),
        [MSGS.START_REPEAT]: () => startRepeat(model),
        [MSGS.SHOW_REPEAT_ANSWER]: () => showRepeatAnswer(model),
        [MSGS.ANSWER_REPEAT_STATUS]: () => answerRepeatStatus(msg)(model),
        [MSGS.NEXT_REPEAT_QUESTION]: () => nextRepeatQuestion(model),
        [MSGS.CHANGE_URL_STATE]: () => changeUrlState(msg)(model),
        [MSGS.SUBMIT_USERNAME]: () => captureUsername(msg.value)(model),
        [MSGS.SUBMIT_PASSWORD]: () => capturePassword(msg.value)(model),
        [MSGS.SUBMIT_EMAIL]: () => captureEmail(msg.value)(model),
        [MSGS.SIGN_UP]: () => signUpNewUser(model),
        [MSGS.SUBMIT_PIN]: () => capturePin(msg.value)(model),
        [MSGS.SIGN_UP_CONFIRMATION]: () => confirmNewUser(msg)(model),
        [MSGS.SUCCESS_SIGN_UP]: () => successSignUp(msg)(model),
        [MSGS.CONFIRM_SIGN_UP]: () => confirmSignUp(model),
        [MSGS.SUCCESS_CONFIRMATION]: () => successConfirmation(msg)(model),
        [MSGS.SIGN_IN]: () => signIn(model),
        [MSGS.SUCCESS_SIGN_IN]: () => successSignIn(msg.type)(model),
        [MSGS.ACCESS_TOKEN]: () => assignAccessToken(msg.token)(model),
        [MSGS.GET_ACCESS_TOKEN]: () => assignAccessToken(msg.token)(model),
        [MSGS.SELECT_CATEGORY]: () => addNewCategoryToModel(msg.category)(model),
        [MSGS.ADD_NEW_CARD_TO_CARDS]: () => addNewCardToCards(msg.payload)(model),
        [MSGS.LOAD_TODAYS_CARDS]: () => loadTodayCardsIntoModel(model),
        [MSGS.UPDATE_CARDS_ONLOAD]: () => updateCardsOnload(msg.payload)(model),
        [MSGS.LOAD_ALL_CARDS]: () => initLoadAllCards(msg.payload)(model),
        [MSGS.ADD_NEW_COURSE]: () => addNewCourse(model),
        [MSGS.NEW_COURSE_NAME]: () => addNewCourseName(msg.value)(model),
        [MSGS.UPDATE_COURSE_LIST]: () => updateCourseList(msg.list)(model)
    })(msg.type)(model)



export default update