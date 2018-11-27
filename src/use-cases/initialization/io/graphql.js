import axios from 'axios'
import { awsconfig } from '../../../aws-exports'

export const loadCards = model =>
    axios(awsconfig.GraphQL.endpoint,
        {
            method: 'post',
            headers: {
                Authorization: model.user.accessToken
            },
            data: {
                query: `
                query get {
                    getQuestions(today: "${model.today}") {
                      questions {
                        userId
                        category
                        date_category_id
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