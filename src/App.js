import { h, diff, patch } from 'virtual-dom'
import createElement from 'virtual-dom/create-element'
import { performIO, getTokenFromCookie } from './IO'
import { getAccessTokenMsg, loadInitStateMsg } from './Update'

function app(initModel, update, view, node, routes) {
    let model = initModel
    let currentView = view(dispatch, model, routes)
    let rootNode = createElement(currentView)
    node.appendChild(rootNode)
    dispatch(getAccessTokenMsg(getTokenFromCookie()))
    dispatch(loadInitStateMsg())

    function dispatch(msg) {
        const updates = update(msg, model)
        Array.isArray(updates) ? model = updates[0] : model = updates
        Array.isArray(updates) ? performIO(dispatch, updates[1], updates[0]) : null
        const updatedView = view(dispatch, model, routes)
        const patches = diff(currentView, updatedView)
        rootNode = patch(rootNode, patches)
        currentView = updatedView
    }
}

export default app