import { startRepeat, showRepeatAnswer, answerRepeatStatus, nextRepeatQuestion } from './store/repeat'
import { startQuiz, showAnswer, navigateToNextQuestion, setAnswerStatus } from './store/card'
import { addNewQuestionToModel, addNewAnswerToModel, addNewCategoryToModel, saveNewQuestion, addNewCardToCards } from './store/add-question'
import { changeUrlState } from './store/router'
import { captureUsername, capturePassword, captureEmail, capturePin, signUpNewUser, successSignUp, confirmSignUp, successConfirmation, signIn, successSignIn, assignAccessToken } from './store/auth'
import { getAccessTokenMsg } from './store/msg';
import { MSGS } from './store/msg'
import { loadTodayCardsIntoModel, updateCardsOnload } from './store/init'







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
        [MSGS.UPDATE_CARDS_ONLOAD]: () => updateCardsOnload(msg.payload)(model)
    })(msg.type)(model)



export default update