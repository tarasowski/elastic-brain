import homeView from './components/Home'
import quizView from './components/AddQuestion'
import repeatView from './components/Repeat'
import fullCardViewLearnMode from './components/Learn'
import signupView from './components/Signup'


const routes = [
    { path: '/', component: homeView },
    { path: '/add-new', component: quizView },
    { path: '/repeat', component: repeatView },
    { path: '/browse', component: fullCardViewLearnMode },
]

const getComponent = routes => routes.filter(element => element.path === (history.state && history.state.url))

const router = (dispatch, model) =>
    getComponent(routes).length === 1 ? getComponent(routes)[0].component(dispatch, model) : homeView()

export default router