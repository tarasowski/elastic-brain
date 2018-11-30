import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import { startQuizMsg, showAnswerMsg, nextQuestionMsg, filterCategoryMsg } from '../actions/learn'
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
        ? div({ className: 'h-64' })
        : div({ className: 'h-64' }, [
            span({ className: 'font-bold text-2xl mb-4' }, 'Answer: '),
            p({ className: 'mt-4 text-2xl' }, `${model.currAnswer}`)
        ])

const questionView = className => model =>
    model.currQuestion === ''
        ? div({ className: 'h-64' })
        : div({ className: 'h-64' }, [
            span({ className: 'font-bold text-2xl mb-4' }, 'Question: '),
            p({ className: 'mt-4 text-2xl' }, `${model.currQuestion}`)
        ])

const buttonSet = className => dispatch => model =>
    prop('nextId', model) === 0
        ? div({ className: '' }, [
            createButton('border border-grey text-white font-bold py-6 px-6 w-48 rounded bg-grey hover:bg-grey-dark mr-4 uppercase')('Start Now')(() => dispatch(startQuizMsg())),
        ])
        : prop('showAnswer', model)
            ? div({}, [
                nextButton('border border-orange text-white font-bold py-6 px-6 w-48 rounded bg-orange hover:bg-orange-dark uppercase')(model)(() => dispatch(nextQuestionMsg())),
            ])
            : prop('showAnswer', model) === false
                ? div({}, [
                    createButton('border border-blue text-white font-bold py-6 px-6 w-48 rounded bg-blue hover:bg-blue-dark mr-4 uppercase')('Show answer')(() => dispatch(showAnswerMsg())),
                ])
                : div({}, [
                    createButton('border border-blue text-white font-bold py-6 px-6 w-48 rounded bg-blue hover:bg-blue-dark mr-4')('Show answer')(() => dispatch(showAnswerMsg())),
                    nextButton('border border-orange text-white font-bold py-6 px-6 w-48 rounded bg-orange hover:bg-orange-dark')(model)(() => dispatch(nextQuestionMsg())),
                ])


const length = data => data.length
const progress = model => [prop('nextId', model), compose(length, prop('activeCards'))(model)].reduce((acc, val) => acc / val * 100)
const activeCardsLength = compose(length, prop('activeCards'))

const counter = className => model =>
    div({ className }, [
        div({ className: 'progressbar bg-grey-light border-grey mb-2', style: `width:${progress(model)}%; height: 2rem` }),
        span({}, 'You are at '),
        span({}, prop('nextId', model)),
        span({}, ' of '),
        span({}, activeCardsLength(model)),
        span({}, ' total cards in category: '),
        span({}, model.activeCategory)
    ])

const categoryView = className => dispatch => model =>
    prop('categoryView', model)
        ? div({ className: 'h-screen' }, [
            questionView('')(model),
            answerView('')(model),
            buttonSet('')(dispatch)(model),
            counter('py-4')(model),
        ])
        : div({ className }, [
            courseList(filterCategoryMsg)(dispatch)(model)
        ])


const fullCardViewLearnMode = dispatch => model => {
    return div({ className: 'container mx-auto py-8' }, [
        h1({ className: 'my-8' }, 'Learn Cards'),
        categoryView('')(dispatch)(model)
    ])
}

export default fullCardViewLearnMode