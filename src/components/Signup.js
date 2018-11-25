import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import { Auth } from 'aws-amplify'
import {
    submitUsernameMsg,
    submitUserPasswordMsg,
    submitUserEmailMsg,
    submitUserPinMsg,
    signupNewUserMsg,
    singupNewUserConfirmationMsg
} from '../store/msg'

// import { awsconfig } from '../aws-exports'
// Auth.configure(awsconfig)

const { div, label, input, button } = hh(h)

const singupAmp = ({ username, password, email }) => {
    return Auth.signUp({
        username,
        password,
        attributes: {
            email
        }
    })
        .then(data => console.log(data))
        .catch(err => console.log(err))
}

const confirmSignUp = username => code =>
    Auth.confirmSignUp(username, code).then(data => console.log(data), err => console.log(err))

const signupView = (dispatch, model) =>
    div({}, [
        label({ className: 'mr-4 block mb-2' }, 'Username'),
        input({
            className: 'border block mb-4',
            type: 'text',
            oninput: e => dispatch(submitUsernameMsg(e.target.value))
        }),
        label({ className: 'mr-4 block mb-2' }, 'Password'),
        input({
            className: 'border block mb-4',
            type: 'text',
            oninput: e => dispatch(submitUserPasswordMsg(e.target.value))
        }),
        label({ className: 'mr-4 block mb-2' }, 'Email'),
        input({
            className: 'border block mb-4',
            type: 'text',
            oninput: e => dispatch(submitUserEmailMsg(e.target.value))
        }),
        button({
            className: 'bg-blue text-white p-4 border-blue',
            onclick: () => singupAmp(model.user)
        }, 'Sign Up'),
        div({ className: 'my-24' }, [
            label({ className: 'block' }, 'Enter Your Username'),
            input({
                className: 'border block my-4',
                type: 'text',
                oninput: e => dispatch(submitUsernameMsg(e.target.value))
            }),
            label({ className: 'block' }, 'Enter Pin'),
            input({
                className: 'border block my-4',
                type: 'text',
                oninput: e => dispatch(submitUserPinMsg(e.target.value))
            }),
            button({
                className: 'bg-blue border-blue p-4 text-white',
                onclick: () => confirmSignUp(model.user.username)(model.user.pin)
            }, 'Submit')
        ])
    ])

export default signupView


// Auth.signUp({
//     username,
//     password,
//     attributes: {
//         email,          // optional
//         phone_number,   // optional - E.164 number convention
//         // other custom attributes 
//     },
//     validationData: []  //optional
// })
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// // After retrieveing the confirmation code from the user
// Auth.confirmSignUp(username, code, {
//     // Optional. Force user confirmation irrespective of existing alias. By default set to True.
//     forceAliasCreation: true
// }).then(data => console.log(data))
//     .catch(err => console.log(err));