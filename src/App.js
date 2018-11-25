import { h, diff, patch } from 'virtual-dom'
import createElement from 'virtual-dom/create-element'
import { changeUrlStateMsg } from './Update';


function app(initModel, update, view, node) {
    let model = initModel
    let currentView = view(dispatch, model)
    let rootNode = createElement(currentView)
    node.appendChild(rootNode)

    function dispatch(msg) {
        const updates = update(msg, model)
        Array.isArray(updates) ? model = updates[0] : model = updates
        Array.isArray(updates) ? changeUrl(dispatch, updates[1]) : null
        const updatedView = view(dispatch, model)
        const patches = diff(currentView, updatedView)
        rootNode = patch(rootNode, patches)
        currentView = updatedView
    }
}

const changeUrl = (dispatch, command) => {
    return command === null
        ? null
        : command.url()
}

export default app