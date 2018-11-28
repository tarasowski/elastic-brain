import homeView from './components/Home'
import quizView from './components/AddCard'
import repeatView from './components/Repeat'
import learnView from './components/Learn'
import signupView from './components/Signup'
import { courseView } from './components/Course'
import { compose, prop, trace } from 'ramda-x'

const devSwitch = component => dispatch => model => component(dispatch)(model)

const routes = [
    { path: '/', component: homeView },
    { path: '/add-new', component: quizView },
    { path: '/repeat', component: repeatView },
    { path: '/learn', component: learnView },
    { path: '/course', component: courseView },
]

const getComponent = routes =>
    routes.filter(element => element.path === (history.state && history.state.url))

const head = x => x[0]
const first = compose(prop('component'), head, getComponent)

const router = dispatch => model =>
    getComponent(routes).length === 1 ? first(routes)(dispatch)(model) : devSwitch(courseView)(dispatch)(model)

export default router