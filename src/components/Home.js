import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'

const { div, h1 } = hh(h)

const homeView = dispatch => model =>
    div({ className: 'continer mx-auto h-8 my-8 py-8 flex items-center justify-center' }, [
        h1({ className: '' }, 'Welcome to Elastic Brain')
    ])



export default homeView