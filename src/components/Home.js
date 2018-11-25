import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'

const { div, h1 } = hh(h)

const homeView = () =>
    div({ className: 'border h-8 my-8 py-8 flex items-center justify-center' }, [
        h1({}, 'Welcome to Elastic Brain')
    ])



export default homeView