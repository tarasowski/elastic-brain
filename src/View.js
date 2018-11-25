import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import quizView from './components/AddQuestion'
import repeatView from './components/Repeat'
import fullCardViewLearnMode from './components/Learn'
import homeView from './components/Home'
import { changeUrlStateMsg } from './Update'
import routes from './Routes'


const { h1, div, pre, p, br, hr, button } = hh(h)




function view(dispatch, model) {
    return div({ className: 'container mx-auto py-4' }, [
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
                dispatch(changeUrlStateMsg('/repeat'))
            }
        }, 'Repeat'),
        button({
            className: 'border p-8 m-8', onclick: () => {
                dispatch(changeUrlStateMsg('/browse'))
            }
        }, 'Browse'),
        routes(dispatch, model),
        pre({ className: '' }, JSON.stringify(model, null, 4))
    ])
}


export default view


