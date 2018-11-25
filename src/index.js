import initModel from './Model'
import app from './App'
import update from './Update'
import view from './View'
import routes from './Routes'


const node = document.getElementById('app')
app(initModel, update, view, node, routes)