import hh from 'hyperscript-helpers'
import svg from 'virtual-hyperscript-svg'
import { h } from 'virtual-dom'
import { changeUrlStateMsg } from '../Update'

const { div, button, span } = hh(h)

const logo = className => onclick =>
    div({ className }, [
        button({ className: 'flex items-center', onclick }, [
            svg('svg', { class: 'w-8 h-8 fill-current text-blue', viewBox: "0 0 20 20", 'enable-background': "new 0 0 20 20" }, [
                svg('path', { d: "M17.584,9.372h2c-0.065-1.049-0.293-2.053-0.668-2.984L17.16,7.402C17.384,8.025,17.531,8.685,17.584,9.372z   M14.101,1.295c-0.955-0.451-1.99-0.757-3.086-0.87v2.021c0.733,0.097,1.433,0.295,2.084,0.585L14.101,1.295z M16.242,5.622  l1.741-1.005c-0.591-0.878-1.33-1.645-2.172-2.285l-1.006,1.742C15.354,4.52,15.836,5.042,16.242,5.622z M10.014,17.571  c-4.197,0-7.6-3.402-7.6-7.6c0-3.858,2.877-7.036,6.601-7.526V0.424c-4.833,0.5-8.601,4.583-8.601,9.547  c0,5.303,4.298,9.601,9.601,9.601c4.824,0,8.807-3.563,9.486-8.2H17.48C16.822,14.899,13.732,17.571,10.014,17.571z" }),
            ]),
            span({ className: 'ml-4 font-sans text-grey-darkest font-bold tracking-tight' }, 'ElasticBrain')
        ])
    ])


const navButton = className => onclick => value =>
    button({ className, onclick, value }, value)

const navigation = dispatch =>
    div({ className: 'top-bar bg-white shadow grid grid-columns-12 px-8 py-3 font-sans' }, [
        logo('col-start-1 col-end-3 flex items-center')(() => dispatch(changeUrlStateMsg('/'))),
        div({ className: 'col-start-3 col-end-11 flex items-center justify-around' }, [
            navButton('hover:text-grey-darker')(() => dispatch(changeUrlStateMsg('/')))('Home'),
            navButton('')(() => dispatch(changeUrlStateMsg('/add-new')))('Add Card'),
            navButton('')(() => dispatch(changeUrlStateMsg('/course')))('Courses'),
            navButton('')(() => dispatch(changeUrlStateMsg('/learn')))('Learn'),
            navButton('')(() => dispatch(changeUrlStateMsg('/repeat')))('Repeat'),
        ])
    ])

export { navigation }