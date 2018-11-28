import axios from 'axios'
import { awsconfig } from '../../../aws-exports'


export const loadAllCards = model => {
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


export const loadCards = model => {
    return axios(awsconfig.GraphQL.endpoint,
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
}
