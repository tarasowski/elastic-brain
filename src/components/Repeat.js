import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import { startRepeatMsg, showRepeatAnswerMsg, answerRepeatStatusMsg, nextRepeatQuestionMsg } from '../Update'


const { h1, div, p, button } = hh(h)

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


const repeatView = dispatch => model => {
    return div({ className: 'container mx-auto border p-8 mb-8' }, [
        h1({ className: 'my-8' }, 'Repeat Cards'),
        questionView('mb-4')(model),
        answerView('mb-4')(model),
        repeatButton('border border-grey text-white font-bold py-2 px-2 rounded bg-grey hover:bg-grey-dark mr-4')(model)(() => dispatch(startRepeatMsg())),
        createButton('border border-blue text-white font-bold py-2 px-2 rounded bg-blue hover:bg-blue-dark mr-4')('Show answer')(() => dispatch(showRepeatAnswerMsg())),
        createButton('border border-green text-white font-bold py-2 px-2 rounded bg-green hover:bg-green-dark mr-2')('I know')(() => dispatch(answerRepeatStatusMsg('yes'))),
        createButton('border border-red text-white font-bold py-2 px-2 rounded bg-red hover:bg-red-dark mr-4')(`I don't know`)(() => dispatch(answerRepeatStatusMsg('no'))),
        nextButton('border border-orange text-white font-bold py-2 px-2 rounded bg-orange hover:bg-orange-dark')(model)(() => dispatch(nextRepeatQuestionMsg())),
    ])
}

export default repeatView