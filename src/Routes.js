import homeView from './components/Home'
import quizView from './components/AddQuestion'
import repeatView from './components/Repeat'
import fullCardViewLearnMode from './components/Learn'

const routes = (dispatch, model) => {
    return history.state && history.state.url === '/add-new'
        ? quizView(dispatch, model) : history.state && history.state.url === '/repeat'
            ? repeatView(dispatch, model) : history.state && history.state.url === '/browse'
                ? fullCardViewLearnMode(dispatch, model)
                : homeView()
}

export default routes