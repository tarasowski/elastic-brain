import { MSGS } from '../Update'
export const signupNewUserMsg = () => ({ type: MSGS.SIGN_UP })
export const loginFromSignupMsg = () => ({ type: MSGS.LOGIN_FROM_SIGNUP })
export const signupFromLoginMsg = () => ({ type: MSGS.SIGNUP_FROM_LOGIN })