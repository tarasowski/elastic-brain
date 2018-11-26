import { startRepeat, showRepeatAnswer, answerRepeatStatus, nextRepeatQuestion } from './store/repeat'
import { startQuiz, showAnswer, navigateToNextQuestion, setAnswerStatus } from './store/card'
import { addNewQuestionToModel, addNewAnswerToModel, saveNewQuestion } from './store/add-question'
import { changeUrlState } from './store/router'
import { captureUsername, capturePassword, captureEmail, capturePin, signUpNewUser, successSignUp, confirmSignUp, successConfirmation, signIn, successSignIn, assignAccessToken } from './store/auth'
import { getAccessTokenMsg } from './store/msg';




export const MSGS = {
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
    GET_ACCESS_TOKEN: 'GET_ACCESS_TOKEN'
}


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
        [MSGS.SAVE_NEW_QUESTION]: () => saveNewQuestion(model),
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

    })(msg.type)(model)



export default update