import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import { startRepeatMsg, showRepeatAnswerMsg, answerRepeatStatusMsg, nextRepeatQuestionMsg, filterCategoryRepetitionMsg } from '../Update'
import { courseList } from './Course'
import { prop, compose } from 'ramda-x'


const { h1, div, p, button, h2 } = hh(h)

const nextButton = className => model => onclick => {
    return model.repetition.length === model.nextRepeatId
        ? button({ className }, 'Start Over')
        : button({ className, onclick }, 'Next')

}


const repeatButton = className => model => onclick =>
    model.repetition.length === 0
        ? button({ className }, 'Nothing to Repeat')
        : button({ className, onclick }, 'Start')

const createButton = className => value => onclick =>
    button({ className, onclick }, value)

const answerView = className => model =>
    model.showRepeatAnswer === false
        ? ''
        : p({ className }, model.repeatAnswer)

const questionView = className => model =>
    p({ className }, model.repeatQuestion)

const length = data => data.length

const buttonSet = className => dispatch => model =>
    prop('currRepeatId', model) === 0
        ? div({}, [
            p({ className: 'py-8' }, 'Click start to start learning your cards'),
            repeatButton('border border-grey text-white font-bold py-2 px-2 rounded bg-grey hover:bg-grey-dark mr-4')(model)(() => dispatch(startRepeatMsg())),
            // createButton('border border-blue text-white font-bold py-2 px-2 rounded bg-blue hover:bg-blue-dark mr-4')('Show answer')(() => dispatch(showRepeatAnswerMsg())),
            // createButton('border border-green text-white font-bold py-2 px-2 rounded bg-green hover:bg-green-dark mr-2')('I know')(() => dispatch(answerRepeatStatusMsg('yes'))),
            // createButton('border border-red text-white font-bold py-2 px-2 rounded bg-red hover:bg-red-dark mr-4')(`I don't know`)(() => dispatch(answerRepeatStatusMsg('no'))),
            // nextButton('border border-orange text-white font-bold py-2 px-2 rounded bg-orange hover:bg-orange-dark')(model)(() => dispatch(nextRepeatQuestionMsg())),
        ])
        : prop('showRepeatAnswer', model)
            ? div({}, [
                createButton('border border-green text-white font-bold py-2 px-2 rounded bg-green hover:bg-green-dark mr-2')('I know')(() => dispatch(answerRepeatStatusMsg('yes'))),
                createButton('border border-red text-white font-bold py-2 px-2 rounded bg-red hover:bg-red-dark mr-4')(`I don't know`)(() => dispatch(answerRepeatStatusMsg('no'))),
                nextButton('border border-orange text-white font-bold py-2 px-2 rounded bg-orange hover:bg-orange-dark')(model)(() => dispatch(nextRepeatQuestionMsg())),
            ])
            : compose(length, prop('activeRepetitionCards'))(model) === 0
                ? div({}, [
                    createButton('border border-red text-white font-bold py-2 px-2 rounded bg-red hover:bg-red-dark mr-4')(`Nothing to repeat`)(() => console.log('nothing to repeat button')),
                ])
                : div({}, [
                    createButton('border border-blue text-white font-bold py-2 px-2 rounded bg-blue hover:bg-blue-dark mr-4')('Show answer')(() => dispatch(showRepeatAnswerMsg())),
                    nextButton('border border-orange text-white font-bold py-2 px-2 rounded bg-orange hover:bg-orange-dark')(model)(() => dispatch(nextRepeatQuestionMsg())),
                ])


const categoryView = className => dispatch => model =>
    prop('categoryRepetitionView', model)
        ? div({ className }, [
            h2({ className: 'py-8' }, `Category: ${prop('activeRepetitionCategory', model)}`),
            questionView('mb-4')(model),
            answerView('mb-4')(model),
            buttonSet('')(dispatch)(model)
        ])
        : div({ className }, [
            courseList(filterCategoryRepetitionMsg)(dispatch)(model)
        ])



const repeatView = dispatch => model => {
    return div({ className: 'container mx-auto py-8 mb-8' }, [
        h1({ className: 'my-8' }, 'Repeat Cards'),
        categoryView('')(dispatch)(model)
    ])
}

export default repeatView