import { compose, prop } from 'ramda-x'
import axios from 'axios'
import { endpoint } from '../aws-exports'

const head = x => x[0]

const getAtt = id => data =>
    data.filter(element => element.userId_category_uuId === id)


export const query = query => payload => model =>
    axios(endpoint, {
        method: 'post',
        headers: {
            Authorization: compose(prop('accessToken'), prop('user'))(model)
        },
        data: {
            query: query(payload)(model)
        }
    })

export const mutation = query => payload => model =>
    axios(endpoint, {
        method: 'post',
        headers: {
            Authorization: compose(prop('accessToken'), prop('user'))(model)
        },
        data: {
            query: query(payload)(model)
        }
    })


export const loadCards = payload => model =>
    ` query get {
        getTodaysQuestions(today: "${prop('today', model)}") {
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

export const getAllCourses = paylod => model =>
    `query getCourses 
            {
                getAllCourses {
                items {
                    userId
                    courses
                }
                nextToken
                }
            }`



export const updateCard = payload => model =>
    `mutation add {
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
        category
        repeatNextDate
        numberOfRepetitions
        }
    }`


export const saveQuestion = payload => model =>
    `mutation add {
                        saveQuestion(input: {
                          question: "${payload.newQuestion}"
                          answer: "${payload.newAnswer}"
                          repeatNextDate: "${payload.repeatNextDate}"
                          category: "${payload.newCategory}"
                          numberOfRepetitions: ${payload.numberOfRepetitions}
                        }) {
                          userId
                          userId_category_uuId
                          category
                          question
                          answer
                          repeatNextDate
                          numberOfRepetitions
                        }
                }
                `

export const loadAllCards = payload => mmodel =>
    `query get {
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

export const addNewCourseToDb = payload => model =>
    ` mutation addCourse {
        addNewCourse(name: "${payload}") {
        userId
        courses
        }
    }
    
    `