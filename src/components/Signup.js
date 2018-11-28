import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import { Auth } from 'aws-amplify'
import {
    submitUsernameMsg,
    submitUserPasswordMsg,
    submitUserEmailMsg,
    submitUserPinMsg,
    signupNewUserMsg,
    singupNewUserConfirmationMsg,
    confirmSignUpMsg,
    signInMsg
} from '../Update'

const { div, label, input, button, h1, form } = hh(h)


const headlineSet = className => value =>
    h1({ className }, value)

const inputSet = className => type => oninput =>
    input({ className, autocomplete: 'on', type, oninput })

const buttonSet = className => value => onclick =>
    input({ className, type: 'submit', value, onclick })

const signUpForm = dispatch => model =>
    div({}, [
        form({}, [
            headlineSet('mb-4')('Sign Up'),
            label({ className: 'mr-4 block mb-2' }, 'Username'),
            inputSet('border block mb-4')('text')(e => dispatch(submitUsernameMsg(e.target.value))),
            label({ className: 'mr-4 block mb-2' }, 'Password'),
            inputSet('border block mb-4')('password')(e => dispatch(submitUserPasswordMsg(e.target.value))),
            label({ className: 'mr-4 block mb-2' }, 'Email'),
            inputSet('border block mb-4')('email')(e => dispatch(submitUserEmailMsg(e.target.value))),
            buttonSet('bg-blue text-white p-4 border-blue hover:bg-blue-dark pointer cursor-pointer')('Sign up')((e) => {
                e.preventDefault()
                dispatch(signupNewUserMsg())
            })
        ])
    ])

const confirmationForm = dispatch => model =>
    div({ className: 'my-24' }, [
        form({}, [
            headlineSet('mb-4')('Enter Pin'),
            label({ className: 'block' }, 'Enter Your Username'),
            inputSet('border block mb-4')('text')(e => dispatch(submitUsernameMsg(e.target.value))),
            label({ className: 'block' }, 'Enter Pin'),
            inputSet('border block my-4')('text')(e => dispatch(submitUserPinMsg(e.target.value))),
            buttonSet('bg-blue border-blue p-4 text-white hover:bg-blue-dark cursor-pointer')('Confirm')((e) => {
                e.preventDefault()
                dispatch(confirmSignUpMsg())
            })
        ])
    ])

const loginForm = dispatch => model =>
    div({}, [
        form({}, [
            headlineSet('mb-4')('Login'),
            label({ className: 'block mb-4' }, 'Username'),
            inputSet('border block mb-4')('text')(e => dispatch(submitUsernameMsg(e.target.value))),
            label({ className: 'block mb-4' }, 'Password'),
            inputSet('border block mb-4')('password')(e => dispatch(submitUserPasswordMsg(e.target.value))),
            buttonSet('bg-blue border-blue p-4 text-white hover:bg-blue-dark cursor-pointer')('Sign In')((e) => {
                e.preventDefault()
                dispatch(signInMsg())
            })
        ])
    ])

const signupView = dispatch => model =>
    div({}, [
        signUpForm(dispatch)(model),
        confirmationForm(dispatch)(model),
        loginForm(dispatch)(model),
    ])


export default signupView

