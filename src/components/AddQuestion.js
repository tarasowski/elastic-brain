import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import { newQuestionMsg, newAnswerMsg, saveNewQuestionMsg } from '../store/msg'

const { h1, div, p, button, form, label, input, textarea } = hh(h)


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



const quizView = (dispatch, model) => {
    return div({ className: 'container border mx-auto p-8 mb-10d' }, [
        h1({}, 'Add New Question'),
        inputSet('Question', model.newQuestion)(e => dispatch(newQuestionMsg(e.target.value))),
        inputSet('Answer', model.newAnswer)(e => dispatch(newAnswerMsg(e.target.value))),
        button({
            className: 'broder border-blue rounded bg-blue-dark text-white text-2xl my-4 p-2',
            onclick: () => dispatch(saveNewQuestionMsg(model))
        }, 'Save')
    ])
}

export default quizView