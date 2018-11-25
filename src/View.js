import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import quizView from './components/AddQuestion'
import repeatView from './components/Repeat'
import fullCardViewLearnMode from './components/Learn'
import homeView from './components/Home'

const { h1, div, pre, p, br, hr } = hh(h)



function view(dispatch, model) {

    return div({ className: 'container mx-auto py-4' }, [
        homeView(),
        quizView(dispatch, model),
        repeatView(dispatch, model),
        fullCardViewLearnMode(dispatch, model),
        pre({ className: '' }, JSON.stringify(model, null, 4))
    ])
}


export default view

// '/': homeView(),
//         '/add-new': quizView(dispatch, model),
//         '/repeat': repeatView(dispatch, model),
//         '/browse': fullCardViewLearnMode(dispatch, model),
