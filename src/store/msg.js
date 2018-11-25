import { MSGS } from '../Update'
const showRepeatAnswerMsg = () => ({ type: MSGS.SHOW_REPEAT_ANSWER })
const answerRepeatStatusMsg = status => ({ type: MSGS.ANSWER_REPEAT_STATUS, status })
const nextRepeatQuestionMsg = () => ({ type: MSGS.NEXT_REPEAT_QUESTION })

const newAnswerMsg = value => ({
    type: MSGS.NEW_ANSWER,
    value
})

const newQuestionMsg = value => {
    return {
        type: MSGS.NEW_QUESTION,
        value
    }
}

const nextQuestionMsg = () => {
    return {
        type: MSGS.NEXT_QUESTION,
    }
}

const answerStatusMsg = status => {
    return {
        type: MSGS.ANSWER_STATUS,
        status
    }
}

const showAnswerMsg = () => {
    return {
        type: MSGS.SHOW_ANSWER
    }
}


const startQuizMsg = () => {
    return {
        type: MSGS.START_QUIZ
    }
}

const saveNewQuestionMsg = () => ({ type: MSGS.SAVE_NEW_QUESTION })

const startRepeatMsg = () => ({ type: MSGS.START_REPEAT })

const changeUrlStateMsg = url => ({ type: MSGS.CHANGE_URL_STATE, url })

const submitUsernameMsg = value => ({ type: MSGS.SUBMIT_USERNAME, value })
const submitUserPasswordMsg = value => ({ type: MSGS.SUBMIT_PASSWORD, value })
const submitUserEmailMsg = value => ({ type: MSGS.SUBMIT_EMAIL, value })
const submitUserPinMsg = value => ({ type: MSGS.SUBMIT_PIN, value })
const signupNewUserMsg = () => ({ type: MSGS.SIGN_UP })
const singupNewUserConfirmationMsg = () => ({ type: MSGS.SIGN_UP_CONFRIMATION })

export {
    startQuizMsg,
    showAnswerMsg,
    answerStatusMsg,
    nextQuestionMsg,
    newQuestionMsg,
    newAnswerMsg,
    saveNewQuestionMsg,
    startRepeatMsg,
    showRepeatAnswerMsg,
    answerRepeatStatusMsg,
    nextRepeatQuestionMsg,
    changeUrlStateMsg,
    submitUsernameMsg,
    submitUserPasswordMsg,
    submitUserPinMsg,
    signupNewUserMsg,
    singupNewUserConfirmationMsg,
    submitUserEmailMsg,
}