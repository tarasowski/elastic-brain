import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import { startQuizMsg, showAnswerMsg, answerStatusMsg, nextQuestionMsg } from '../Update'

const { div, p, button } = hh(h)


const createButton = className => value => onclick =>
    button({ className, onclick }, value)

const answerView = className => model =>
    model.showAnswer === false
        ? ''
        : p({ className }, model.currAnswer)

const questionView = className => model =>
    p({ className }, model.currQuestion)


function fullCardView(dispatch, model) {
    return div({ className: 'border-b py-4 my-4' }, [
        questionView('mb-4')(model),
        answerView('mb-4')(model),
        createButton('border border-grey text-white font-bold py-2 px-2 rounded bg-grey hover:bg-grey-dark mr-4')('Start')(() => dispatch(startQuizMsg())),
        createButton('border border-blue text-white font-bold py-2 px-2 rounded bg-blue hover:bg-blue-dark mr-4')('Show answer')(() => dispatch(showAnswerMsg())),
        createButton('border border-green text-white font-bold py-2 px-2 rounded bg-green hover:bg-green-dark mr-2')('I know')(() => dispatch(answerStatusMsg('yes'))),
        createButton('border border-red text-white font-bold py-2 px-2 rounded bg-red hover:bg-red-dark mr-4')(`I don't know`)(() => dispatch(answerStatusMsg('no'))),
        createButton('border border-orange text-white font-bold py-2 px-2 rounded bg-orange hover:bg-orange-dark')('Next')(() => dispatch(nextQuestionMsg())),
    ])
}

export default fullCardView