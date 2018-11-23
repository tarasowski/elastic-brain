import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import * as R from 'ramda'
import { deleteMealMsg, editMealMsg } from '../Update'

const { div, table, tr, th, td, thead, tbody, i, span } = hh(h)


function totalRow(meals) {
    const total = R.pipe(
        R.map(meal => meal.calories),
        R.sum
    )(meals)
    return div({ className: 'flex justify-between mt-5 border-t border-grey border-solid py-1' }, [
        cell(span, 'text-black flex-1', 'Total:'),
        cell(span, 'text-black flex-1', total),
        cell(span, 'text-black flex-1', '')
    ])
}

function mealRow(dispatch, className, meal) {
    const { description, calories, id } = meal
    return div({ className: 'flex justify-between my-2' }, [
        cell(span, 'text-black flex-1 ', description),
        cell(span, 'text-black flex-1', calories),
        cell(span, 'text-black flex-1', [
            i({
                className: '',
                onclick: () => dispatch(deleteMealMsg(id))
            }
            ),
            i({
                className: '',
                onclick: () => dispatch(editMealMsg(id))
            })
        ])
    ])
}

function cell(tag, className, value) {
    return tag({ className }, value)
}

function mealsBody(dispatch, className, meals) {
    const rows = R.map(
        R.partial(mealRow, [dispatch, 'stripe-dark']), meals
    )
    const rowsWithTotal = [...rows, totalRow(meals)]
    return div({ className }, rowsWithTotal)
}


const tableHeader = div({ className: '' }, [
    div({ className: 'border-b border-grey flex justify-between py-1' }, [
        cell(span, 'text-black flex-1', 'Meal'),
        cell(span, 'text-black flex-1', 'Calories'),
        cell(span, 'text-black flex-1', '')
    ])
])

function tableView(dispatch, model) {
    const { meals } = model
    if (meals.length === 0) {
        return div({ className: '' }, 'No meals to display...')
    }
    return div({ className: 'mx-4' },
        [
            tableHeader,
            mealsBody(dispatch, '', meals)
        ])
}


export default tableView