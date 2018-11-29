import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import { newQuestionMsg, newAnswerMsg, saveNewQuestionMsg, selectCategoryMsg } from '../Update'
import { map, compose, prop } from 'ramda-x'

const { h1, div, p, button, form, label, input, textarea, select, option } = hh(h)


const inputSet = (name, value) => oninput =>
    div({ className: '' }, [
        label({ className: 'text-lg mr-4 block my-4' }, name),
        textarea({
            className: 'border w-full h-full',
            type: 'text',
            value,
            oninput
        })
    ])


const optionSet = value =>
    option({ value }, value)

const dropDownSet = onchange => model =>
    select({ className: 'block my-4 border', onchange }, [
        optionSet('--Please choose a category--'),
        map(optionSet, compose(prop('courseList'), prop('courses'))(model))
    ])

const quizView = dispatch => model => {
    return div({ className: 'container border mx-auto p-8 mb-10d' }, [
        h1({}, 'Add New Card'),
        inputSet('Question', model.newQuestion)(e => dispatch(newQuestionMsg(e.target.value))),
        inputSet('Answer', model.newAnswer)(e => dispatch(newAnswerMsg(e.target.value))),
        dropDownSet((e) => dispatch(selectCategoryMsg(e.target.value)))(model),
        button({
            className: 'broder border-blue rounded bg-blue-dark text-white text-2xl my-4 p-2',
            onclick: () => dispatch(saveNewQuestionMsg())
        }, 'Save')
    ])
}

export default quizView