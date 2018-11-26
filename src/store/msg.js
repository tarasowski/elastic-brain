import { MSGS } from '../Update'
export const showRepeatAnswerMsg = () => ({ type: MSGS.SHOW_REPEAT_ANSWER })
export const answerRepeatStatusMsg = status => ({ type: MSGS.ANSWER_REPEAT_STATUS, status })
export const nextRepeatQuestionMsg = () => ({ type: MSGS.NEXT_REPEAT_QUESTION })

export const newAnswerMsg = value => ({
    type: MSGS.NEW_ANSWER,
    value
})

export const newQuestionMsg = value => {
    return {
        type: MSGS.NEW_QUESTION,
        value
    }
}

export const nextQuestionMsg = () => {
    return {
        type: MSGS.NEXT_QUESTION,
    }
}

export const answerStatusMsg = status => {
    return {
        type: MSGS.ANSWER_STATUS,
        status
    }
}

export const showAnswerMsg = () => {
    return {
        type: MSGS.SHOW_ANSWER
    }
}


export const startQuizMsg = () => {
    return {
        type: MSGS.START_QUIZ
    }
}

export const saveNewQuestionMsg = ({ newQuestion, newAnswer }) => ({ type: MSGS.SAVE_NEW_QUESTION, payload: { question: newQuestion, answer: newAnswer } })

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
