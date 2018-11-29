import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import { startQuizMsg, showAnswerMsg, answerStatusMsg, nextQuestionMsg } from '../Update'
import { courseList } from './Course'
import { prop, compose } from 'ramda-x'

const { h1, div, p, button, h2, span } = hh(h)

const nextButton = className => model => onclick =>
    model.cards.length > model.nextId
        ? button({ className, onclick }, 'Next')
        : button({ className }, 'Start Over')


const createButton = className => value => onclick =>
    button({ className, onclick }, value)

const answerView = className => model =>
    model.showAnswer === false
        ? ''
        : p({ className }, `Answer: ${model.currAnswer}`)

const questionView = className => model =>
    model.currQuestion === ''
        ? p({})
        : p({ className }, `Question: ${model.currQuestion}`)

const buttonSet = className => dispatch => model =>
    prop('nextId', model) === 0
        ? div({ className }, [
            p({ className: 'py-8' }, 'Click start to start learning your cards'),
            createButton('border border-grey text-white font-bold py-2 px-2 rounded bg-grey hover:bg-grey-dark mr-4')('Start')(() => dispatch(startQuizMsg())),
        ])
        : prop('showAnswer', model)
            ? div({}, [
                nextButton('border border-orange text-white font-bold py-2 px-2 rounded bg-orange hover:bg-orange-dark')(model)(() => dispatch(nextQuestionMsg())),
            ])
            : prop('showAnswer', model) === false
                ? div({}, [
                    createButton('border border-blue text-white font-bold py-2 px-2 rounded bg-blue hover:bg-blue-dark mr-4')('Show answer')(() => dispatch(showAnswerMsg())),
                ])
                : div({}, [
                    createButton('border border-blue text-white font-bold py-2 px-2 rounded bg-blue hover:bg-blue-dark mr-4')('Show answer')(() => dispatch(showAnswerMsg())),
                    nextButton('border border-orange text-white font-bold py-2 px-2 rounded bg-orange hover:bg-orange-dark')(model)(() => dispatch(nextQuestionMsg())),
                ])






const length = data => data.length
const progress = model => [prop('nextId', model), compose(length, prop('activeCards'))(model)].reduce((acc, val) => acc / val * 100)
const activeCardsLength = compose(length, prop('activeCards'))

const counter = className => model =>
    div({ className }, [
        div({ className: 'progressbar bg-blue mb-2', style: `width:${progress(model)}%; height: 2rem` }),
        span({}, 'You are at '),
        span({}, prop('nextId', model)),
        span({}, ' of '),
        span({}, activeCardsLength(model)),
        span({}, ' total cards')
    ])

const categoryView = className => dispatch => model =>
    prop('categoryView', model)
        ? div({ className }, [
            h2({ className: 'py-8' }, `Category: ${prop('activeCategory', model)}`),
            counter('py-4 border-b border-blue mb-4')(model),
            questionView('mb-4')(model),
            answerView('mb-4')(model),
            buttonSet('')(dispatch)(model)
        ])
        : div({ className }, [
            courseList('text-blue')(dispatch)(model)
        ])


const fullCardViewLearnMode = dispatch => model => {
    return div({ className: 'container mx-auto border p-10' }, [
        h1({ className: 'my-8' }, 'Learn Cards'),
        categoryView('border p-8')(dispatch)(model)
    ])
}

export default fullCardViewLearnMode