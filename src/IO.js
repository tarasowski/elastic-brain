import { compose, prop } from 'ramda-x'
import axios from 'axios'
import { Auth } from 'aws-amplify'
import { awsconfig } from './aws-exports'
import { successSignUpMsg, successConfirmationMsg, successSignInMsg, accessTokenMsg, addNewCardToCardsMsg, updateCardsOnloadMsg, loadAllCardsMsg, updateCourseListMsg } from './Update'

const disable = msg => fn => console.log('feature is currently disabled: ' + msg)

Auth.configure(awsconfig)

export const singupAmp = username => password => email =>
    Auth.signUp({
        username,
        password,
        attributes: {
            email
        }
    })

export const storeAccessTokenCookie = jwt =>
    document.cookie = `accessToken=${jwt}`


export const confirmSignUp = username => code =>
    Auth.confirmSignUp(username, code)


export const signinAmp = username => password =>
    Auth.signIn(username, password)


export const changeBrowserUrl = url => model => dispatch =>
    new Promise((resolve, reject) => {
        history.pushState({ url: url }, null, url)
        history.state && history.state.url === '/repeat'
            ? loadCards(model).then(data => dispatch(updateCardsOnloadMsg(data)), err => console.log(err))
            : loadAllCards(model).then(data => dispatch(loadAllCardsMsg(data)), err => console.log(err))
        history.state && history.state.url === '/'
            ? getAllCourses(model).then(data => dispatch(updateCourseListMsg(getMyCoursesList(data))), err => console.log(err))
            : null
        resolve('url changed')
    })

const head = x => x[0]
const getMyCoursesList = compose(prop('courses'), head, prop('items'), prop('getAllCourses'), prop('data'), prop('data'))

const getAtt = id => data =>
    data.filter(element => element.userId_category_uuId === id)


/* GraphQL queries and mutations from here */

const getAllCourses = model =>
    axios(awsconfig.GraphQL.endpoint,
        {
            method: 'post',
            headers: {
                Authorization: model.user.accessToken
            },
            data: {
                query: `
                query getCourses {
                    getAllCourses {
                      items {
                        userId
                        courses
                      }
                      nextToken
                    }
                  }
            `
            }
        })


const updateCard = payload => model =>
    axios(awsconfig.GraphQL.endpoint,
        {
            method: 'post',
            headers: {
                Authorization: model.user.accessToken
            },
            data: {
                query: `
        mutation add {
            updateQuestion(input: {
                userId_category_uuId: "${payload}"
                question: "${compose(prop('question'), head, getAtt(payload))(model.cards)}"
                answer: "${compose(prop('answer'), head, getAtt(payload))(model.cards)}"
                repeatNextDate: "${compose(prop('repeatNextDate'), head, getAtt(payload))(model.cards)}"
                category: "${compose(prop('category'), head, getAtt(payload))(model.cards)}"
                numberOfRepetitions: ${compose(prop('numberOfRepetitions'), head, getAtt(payload))(model.cards)}
              }) {
              userId
              userId_category_uuId
              question
              answer
              repeatNextDate
              numberOfRepetitions
            }
          }
    `
            }
        })

const saveQuestion = payload => model =>
    axios(awsconfig.GraphQL.endpoint,
        {
            method: 'post',
            headers: {
                Authorization: model.user.accessToken
            },
            data: {
                query: `
                    mutation add {
                        saveQuestion(input: {
                          question: "${payload.question}"
                          answer: "${payload.answer}"
                          repeatNextDate: "${payload.repeatNextDate}"
                          category: "${payload.category}"
                          numberOfRepetitions: ${payload.numberOfRepetitions}
                        }) {
                          userId
                          userId_category_uuId
                          question
                          answer
                          repeatNextDate
                          numberOfRepetitions
                        }
                      }
                `
            }
        })

const loadAllCards = model => {
    return axios(awsconfig.GraphQL.endpoint,
        {
            method: 'post',
            headers: {
                Authorization: model.user.accessToken
            },
            data: {
                query: `
                        query get {
                            getAllCards {
                              questions {
                                userId
                                category
                                userId_category_uuId
                                answer
                                question
                                repeatNextDate
                                numberOfRepetitions
                              }
                              nextToken
                            }
                          }
                `
            }
        })
}


const loadCards = model =>
    axios(awsconfig.GraphQL.endpoint,
        {
            method: 'post',
            headers: {
                Authorization: model.user.accessToken
            },
            data: {
                query: `
                        query get {
                            getTodaysQuestions(today: "${model.today}") {
                              questions {
                                userId
                                category
                                userId_category_uuId
                                answer
                                question
                                repeatNextDate
                                numberOfRepetitions
                              }
                              nextToken
                            }
                          }
                `
            }
        })


export const addNewCourseToDb = payload => model =>
    axios(awsconfig.GraphQL.endpoint,
        {
            method: 'post',
            headers: {
                Authorization: model.user.accessToken
            },
            data: {
                query: `
                mutation addCourse {
                    addNewCourse(name: "${payload}") {
                      userId
                      courses
                    }
                  }
                  
            `
            }
        })

/* The main IO control flow function */

const getCoursesList = compose(prop('courses'), prop('addNewCourse'), prop('data'), prop('data'))

export const performIO = (dispatch, command, model) => {
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
                            : command.request === 'update-question'
                                ? updateCard(command.payload)(model).then(data => console.log(data), err => console.log(err))
                                : command.request === 'add-course'
                                    ? addNewCourseToDb(command.payload)(model).then(data => dispatch(updateCourseListMsg(getCoursesList(data))), err => console.log(err))
                                    : null
}