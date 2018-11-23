import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import tableView from './components/Table'

import {
    showFormMsg,
    mealInputMsg,
    caloriesInputMsg,
    saveMealMsg
} from './Update'

const { pre, div, button, h1, label, input, form } = hh(h)

function buttonSet(dispatch) {
    return div([
        button({
            className: 'w-24 h-10 bg-green border border-green text-white rounded my-4 shadow mr-4',
            type: 'submit',
        }, 'Save'),
        button({
            className: 'w-24 h-10 bg-orange border border-orange text-white rounded my-4 shadow',
            type: 'button',
            onclick: () => dispatch(showFormMsg(false))
        }, 'Cancel')
    ])
}


function fieldSet(labelText, inputValue, oninput) {
    return div({ className: 'my-4 flex justify-start' }, [
        label({ className: 'mr-4 w-24' }, labelText),
        input({
            className: 'border w-64',
            type: 'text',
            placeholder: '...',
            value: inputValue,
            oninput
        })
    ])
}

function formView(dispatch, model) {
    const { description, calories, showForm } = model
    if (showForm) {
        return form({
            className: '', onsubmit: e => {
                e.preventDefault()
                dispatch(saveMealMsg)
            }
        }, [
                fieldSet('Meal', description, e => dispatch(mealInputMsg(e.target.value))),
                fieldSet('Calories', calories || '', e => dispatch(caloriesInputMsg(e.target.value))),
                buttonSet(dispatch)
            ])
    }
    return button({ className: 'w-24 h-10 bg-blue border border-blue text-white rounded my-4 shadow block', onclick: () => dispatch(showFormMsg(true)) }, 'Add Meal')
}

function view(dispatch, model) {
    return div({ className: 'container mx-auto my-8' }, [
        div({},
            h1({ className: 'border-b' }, 'Calorie Counter')
        ),
        formView(dispatch, model),
        tableView(dispatch, model),
        pre({}, JSON.stringify(model, null, 4))
    ])
}


export default view