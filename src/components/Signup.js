import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import { Auth } from 'aws-amplify'
import { compose, prop, trace } from 'ramda-x'
import {
    submitUsernameMsg,
    submitUserPasswordMsg,
    submitUserEmailMsg,
    submitUserPinMsg,
    singupNewUserConfirmationMsg,
    confirmSignUpMsg,
    signInMsg
} from '../Update'

import { signupNewUserMsg, loginFromSignupMsg, signupFromLoginMsg } from '../actions/signup'

const { div, label, input, button, h1, form, p } = hh(h)

const headlineSet = className => value =>
    h1({ className }, value)

const inputSet = className => type => oninput =>
    input({ className, autocomplete: 'on', type, oninput })

const buttonSet = className => value => onclick =>
    input({ className, type: 'submit', value, onclick })

const target = compose(prop('value'), prop('target'))
const isActive = view => compose(prop(view), prop('signup'))

const signUpForm = dispatch => model =>
    isActive('signupView')(model)
        ? div({ className: 'col-start-3 col-end-6 my-32 flex justify-center font-sans' }, [
            div({ className: 'w-full' }, [
                form({ className: '' }, [
                    headlineSet('mb-8')('Sign Up'),
                    label({ className: 'mr-4 block mb-2' }, 'Username'),
                    inputSet('border block mb-4 py-1')('text')(e => dispatch(submitUsernameMsg(target(e)))),
                    label({ className: 'mr-4 block mb-2' }, 'Password'),
                    inputSet('border block mb-4 py-1')('password')(e => dispatch(submitUserPasswordMsg(target(e)))),
                    label({ className: 'mr-4 block mb-2' }, 'Email'),
                    inputSet('border block mb-4 py-1')('email')(e => dispatch(submitUserEmailMsg(target(e)))),
                    buttonSet('bg-blue text-white px-4 py-2 border-blue hover:bg-blue-dark pointer cursor-pointer rounded font-bold')('Sign up')((e) => {
                        e.preventDefault()
                        dispatch(signupNewUserMsg())
                    })
                ]),
                div({ className: 'mt-4' }, [
                    div({ className: 'flex justify-start flex-wrap items-center' }, [
                        div({}, p({ className: '-mr-1' }, 'Or if you already have an account')),
                        div({}, buttonSet('bg-transparent border-transparent underline')('login here')(e => {
                            e.preventDefault()
                            dispatch(loginFromSignupMsg())
                        }))
                    ])
                ]),
            ])
        ])
        : div({})


const confirmationForm = dispatch => model =>
    isActive('confirmationView')(model)
        ? div({ className: 'col-start-3 col-end-6 my-32 flex justify-center font-sans' }, [
            form({ className: 'w-full' }, [
                headlineSet('mb-4')('Confirmation'),
                p({ className: 'mb-4 text-green' }, `Check your mailbox. You'll receive a code to verfiy your account!`),
                label({ className: 'block mb-2' }, 'Username'),
                inputSet('border block mb-4 py-1')('text')(e => dispatch(submitUsernameMsg(e.target.value))),
                label({ className: 'block mb-2' }, 'Code'),
                inputSet('border block mb-4 py-1')('text')(e => dispatch(submitUserPinMsg(e.target.value))),
                buttonSet('bg-blue text-white px-4 py-2 border-blue hover:bg-blue-dark pointer cursor-pointer rounded font-bold')('Confirm')((e) => {
                    e.preventDefault()
                    dispatch(confirmSignUpMsg())
                })
            ])
        ])
        : div({})

const loginForm = dispatch => model =>
    isActive('loginView')(model)
        ? div({ className: 'col-start-3 col-end-6 my-32 flex justify-center font-sans' }, [
            form({ className: 'w-full' }, [
                headlineSet('mb-4')('Login'),
                label({ className: 'block mb-2' }, 'Username'),
                inputSet('border block mb-4 py-1')('text')(e => dispatch(submitUsernameMsg(e.target.value))),
                label({ className: 'block mb-2' }, 'Password'),
                inputSet('border block mb-4 py-1')('password')(e => dispatch(submitUserPasswordMsg(e.target.value))),
                buttonSet('bg-blue text-white px-4 py-2 border-blue hover:bg-blue-dark pointer cursor-pointer rounded font-bold')('Sign In')((e) => {
                    e.preventDefault()
                    dispatch(signInMsg())
                }),
                div({ className: 'mt-4' }, [
                    div({ className: 'flex justify-start flex-wrap items-center' }, [
                        div({}, p({ className: '-mr-1' }, `Or if you don't have an account`)),
                        div({}, buttonSet('bg-transparent border-transparent underline')('signup here')(e => {
                            e.preventDefault()
                            dispatch(signupFromLoginMsg())
                        }))
                    ])
                ]),
            ])
        ])
        : div({})

const signupView = dispatch => model =>
    div({ className: 'signup-view grid grid-columns-6' }, [
        signUpForm(dispatch)(model),
        confirmationForm(dispatch)(model),
        loginForm(dispatch)(model),
    ])


export default signupView

