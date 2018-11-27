import { h, diff, patch } from 'virtual-dom'
import createElement from 'virtual-dom/create-element'
import { changeUrlStateMsg } from './Update';
import Amplify, { Auth } from 'aws-amplify'
import { successSignUpMsg, successConfirmationMsg, successSignInMsg, accessTokenMsg, addNewCardToCardsMsg, updateCardsOnloadMsg } from './store/msg'
import { saveQuestion } from './use-cases/add-question/io/graphql'
import { loadCards } from './use-cases/initialization/io/graphql'
import axios from 'axios'

const disable = msg => fn => console.log('feature is currently disabled: ' + msg)

import { awsconfig } from './aws-exports'
import { loadTodayCardsIntoModel } from './store/init';
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

const changeBrowserUrl = url => model => dispatch =>
    new Promise((resolve, reject) => {
        history.pushState({ url: url }, null, url)
        loadCards(model).then(data => dispatch(updateCardsOnloadMsg(data)), err => console.log(err))
        resolve('url changed')
    })

const confirmSignUp = username => code =>
    Auth.confirmSignUp(username, code)


const signinAmp = username => password =>
    Auth.signIn(username, password)

const storeAccessTokenCookie = jwt =>
    document.cookie = `accessToken=${jwt}`

const updateCard = payload => model => {
    console.log(payload)
    return axios(awsconfig.GraphQL.endpoint,
        {
            method: 'post',
            headers: {
                Authorization: model.user.accessToken
            },
            data: {
                query: `
            mutation add {
                updateQuestion(input: {
                    date_category_id: "${payload}"
                    question: "${model.cards.filter(element => element.date_category_id === payload)[0].question}"
                    answer: "${model.cards.filter(element => element.date_category_id === payload)[0].answer}"
                    repeatNextDate: "${model.cards.filter(element => element.date_category_id === payload)[0].repeatNextDate}"
                    category: "${model.cards.filter(element => element.date_category_id === payload)[0].category}"
                    numberOfRepetitions: ${model.cards.filter(element => element.date_category_id === payload)[0].numberOfRepetitions}
                  }) {
                  userId
                  date_category_id
                  question
                  answer
                  repeatNextDate
                  numberOfRepetitions
                }
              }
        `
            }
        })
}

const performIO = (dispatch, command, model) => {
    return command === null
        ? null
        : command.url ? changeBrowserUrl(command.url)(model)(dispatch)
            : command.request === 'signup'
                ? singupAmp(model.user.username)(model.user.password)(model.user.email).then(data => dispatch(successSignUpMsg(data.type)), err => dispatch(failSignUpMsg(err)))
                : command.request === 'confirmation'
                    ? confirmSignUp(model.user.username)(model.user.pin).then(data => dispatch(successConfirmationMsg(data.type)), err => dispatch(failedConfirmationMsg(err)))
                    : command.request === 'signin'
                        ? signinAmp(model.user.username)(model.user.password).then(data => dispatch(successSignInMsg(data.type), err => failedSignInMsg(err))).then(() => Auth.currentAuthenticatedUser()).then(user => {
                            storeAccessTokenCookie(user.signInUserSession.accessToken.jwtToken)
                            dispatch(accessTokenMsg(user.signInUserSession.accessToken.jwtToken))
                        }, err => console.log(err))
                        : command.request === 'save-question'
                            ? saveQuestion(command.payload)(model).then(data => dispatch(addNewCardToCardsMsg(data.data.data.saveQuestion)), err => console.log(err))
                            : command.request === 'load-cards'
                                ? loadCards(model).then(data => dispatch(updateCardsMsg(data)), err => console.log(err))
                                : command.request = 'update-question'
                                    ? updateCard(command.payload)(model).then(data => console.log(data), err => console.log(err))
                                    : null
}

export default app