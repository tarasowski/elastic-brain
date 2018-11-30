import { MSGS } from '../Update'

export const startQuizMsg = () => ({ type: MSGS.START_QUIZ })
export const showAnswerMsg = () => ({ type: MSGS.SHOW_ANSWER })
export const nextQuestionMsg = () => ({ type: MSGS.NEXT_QUESTION })
export const filterCategoryMsg = categoryName => ({ type: MSGS.FILTER_CATEGORY, categoryName })