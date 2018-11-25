import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import { startQuizMsg, showAnswerMsg, answerStatusMsg, nextQuestionMsg } from '../store/msg'

const { h1, div, p, button } = hh(h)

const nextButton = className => model => onclick =>
    model.cards.length > model.nextId
        ? button({ className, onclick }, 'Next')
        : button({ className }, 'Start Over')


const createButton = className => value => onclick =>
    button({ className, onclick }, value)

const answerView = className => model =>
    model.showAnswer === false
        ? ''
        : p({ className }, model.currAnswer)

const questionView = className => model =>
    p({ className }, model.currQuestion)


function fullCardViewLearnMode(dispatch, model) {
    return div({ className: 'container mx-auto border p-10' }, [
        h1({ className: 'my-8' }, 'Browse Cards'),
        questionView('mb-4')(model),
        answerView('mb-4')(model),
        createButton('border border-grey text-white font-bold py-2 px-2 rounded bg-grey hover:bg-grey-dark mr-4')('Start')(() => dispatch(startQuizMsg())),
        createButton('border border-blue text-white font-bold py-2 px-2 rounded bg-blue hover:bg-blue-dark mr-4')('Show answer')(() => dispatch(showAnswerMsg())),
        nextButton('border border-orange text-white font-bold py-2 px-2 rounded bg-orange hover:bg-orange-dark')(model)(() => dispatch(nextQuestionMsg())),
    ])
}

export default fullCardViewLearnMode