import { h, diff, patch } from 'virtual-dom'
import createElement from 'virtual-dom/create-element'
import { changeUrlStateMsg } from './Update';
import Amplify, { Auth } from 'aws-amplify'
import { successSignUpMsg, successConfirmationMsg, successSignInMsg, accessTokenMsg } from './store/msg'

import { awsconfig } from './aws-exports'
Auth.configure(awsconfig)

function app(initModel, update, view, node, routes) {
    let model = initModel
    let currentView = view(dispatch, model, routes)
    let rootNode = createElement(currentView)
    node.appendChild(rootNode)

    function dispatch(msg) {
        const updates = update(msg, model)
        Array.isArray(updates) ? model = updates[0] : model = updates
        Array.isArray(updates) ? performIO(dispatch, updates[1], updates[0]) : null
        const updatedView = view(dispatch, model, routes)
        const patches = diff(currentView, updatedView)
        rootNode = patch(rootNode, patches)
        currentView = updatedView
    }
}

const singupAmp = username => password => email =>
    Auth.signUp({
        username,
        password,
        attributes: {
            email
        }
    })

const changeBrowserUrl = url =>
    new Promise((resolve, reject) => {
        history.pushState({ url: url }, null, url)
        resolve('url changed')
    })

const confirmSignUp = username => code =>
    Auth.confirmSignUp(username, code)


const signinAmp = username => password =>
    Auth.signIn(username, password)

const storeAccessTokenCookie = jwt =>
    document.cookie = `accessToken=${jwt}`


const performIO = (dispatch, command, model) => {
    return command === null
        ? null
        : command.url ? changeBrowserUrl(command.url)
            : command.request === 'signup'
                ? singupAmp(model.user.username)(model.user.password)(model.user.email).then(data => dispatch(successSignUpMsg(data.type)), err => dispatch(failSignUpMsg(err)))
                : command.request === 'confirmation'
                    ? confirmSignUp(model.user.username)(model.user.pin).then(data => dispatch(successConfirmationMsg(data.type)), err => dispatch(failedConfirmationMsg(err)))
                    : command.request === 'signin'
                        ? signinAmp(model.user.username)(model.user.password).then(data => dispatch(successSignInMsg(data.type), err => failedSignInMsg(err))).then(() => Auth.currentAuthenticatedUser()).then(user => {
                            storeAccessTokenCookie(user.signInUserSession.accessToken.jwtToken)
                            dispatch(accessTokenMsg(user.signInUserSession.accessToken.jwtToken))
                        }, err => console.log(err))
                        : null
}

export default app