import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import { navigation } from './components/Menu'
import signupView from './components/Signup';
import { init } from './Init'



const { h1, div, pre, p, br, hr, button } = hh(h)

function view(dispatch, model, routes) {
    return div({ className: 'container mx-auto py-4' }, [
        init(dispatch),
        navigation(dispatch),
        model.user.accessToken === ''
            ? signupView(dispatch, model)
            : routes(dispatch, model),
        pre({ className: '' }, JSON.stringify(model, null, 4))
    ])
}


export default view


