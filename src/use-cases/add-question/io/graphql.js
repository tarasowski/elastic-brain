import axios from 'axios'
import { awsconfig } from '../../../aws-exports'

export const saveQuestion = payload => model =>
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
