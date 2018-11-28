import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import { changeUrlStateMsg } from '../Update'

const { div, button } = hh(h)

const navigation = (dispatch) =>
    div({}, [
        button({
            className: 'border p-8 m-8', onclick: () => {
                dispatch(changeUrlStateMsg('/'))
            }
        }, 'Home'),
        button({
            className: 'border p-8 m-8', onclick: () => {
                dispatch(changeUrlStateMsg('/add-new'))
            }
        }, 'Add New Question'),
        button({
            className: 'border p-8 m-8', onclick: () => {
                dispatch(changeUrlStateMsg('/learn'))
            }
        }, 'Learn'),
        button({
            className: 'border p-8 m-8', onclick: () => {
                dispatch(changeUrlStateMsg('/repeat'))
            }
        }, 'Repeat'),
    ])

export { navigation }