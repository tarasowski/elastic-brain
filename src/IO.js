import { compose, prop } from 'ramda-x'
import { Auth } from 'aws-amplify'
import { awsconfig, endpoint } from './aws-exports'
import { loadCards, getAllCourses, updateCard, saveQuestion, loadAllCards, addNewCourseToDb, query, mutation } from './graphql/queries'
import { successSignUpMsg, successConfirmationMsg, successSignInMsg, accessTokenMsg, addNewCardToCardsMsg, updateCardsOnloadMsg, loadAllCardsMsg, updateCourseListMsg, resetViewsMsg } from './Update'

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
        dispatch(resetViewsMsg())
        query(loadCards)('')(model).then(data => dispatch(updateCardsOnloadMsg(data)), err => console.log(err))
        query(loadAllCards)('')(model).then(data => dispatch(loadAllCardsMsg(data)), err => console.log(err))
        query(getAllCourses)('')(model).then(data => dispatch(updateCourseListMsg(getMyCoursesList(data))), err => console.log(err))
        resolve('url changed')
    })

export const loadInitStateIO = dispatch => model => {
    query(loadCards)('')(model).then(data => dispatch(updateCardsOnloadMsg(data)), err => console.log(err))
    query(loadAllCards)('')(model).then(data => dispatch(loadAllCardsMsg(data)), err => console.log(err))
    query(getAllCourses)('')(model).then(data => dispatch(updateCourseListMsg(getMyCoursesList(data))), err => console.log(err))
}

const head = x => x[0]
const getMyCoursesList = compose(prop('courses'), head, prop('items'), prop('getAllCourses'), prop('data'), prop('data'))

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
                            ? mutation(saveQuestion)(command.payload)(model).then(data => dispatch(addNewCardToCardsMsg(data.data.data.saveQuestion)), err => console.log(err))
                            : command.request === 'update-question'
                                ? mutation(updateCard)(command.payload)(model).then(data => console.log(data), err => console.log(err))
                                : command.request === 'add-course'
                                    ? mutation(addNewCourseToDb)(command.payload)(model).then(data => dispatch(updateCourseListMsg(getCoursesList(data))), err => console.log(err))
                                    : command.request === 'load-state'
                                        ? loadInitStateIO(dispatch)(model)
                                        : null
}