import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import fullCardView from './components/Card'

const { div, pre, p, br, hr } = hh(h)

function view(dispatch, model) {
    return div({ className: 'container mx-auto py-4' }, [
        fullCardView(dispatch, model),
        pre({ className: '' }, JSON.stringify(model, null, 4))
    ])
}


export default view