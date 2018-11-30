import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import { newCourseNameMsg, addNewCourseMsg } from '../Update'
import { compose, prop, map, trace, filter } from 'ramda-x'

const { div, h1, ul, li, a, button, input } = hh(h)


const buttonSet = className => value => onclick =>
    button({ className, onclick }, value)


const length = x =>
    x.length

const filterBy = category => model =>
    prop('cards', model).filter(o => o.category === category)

const numberOfCards = category => model =>
    compose(length, filterBy(category))(model)


const course = className => onclick => model => category =>
    li({ className: 'border border-white mb-4 shadow px-2 rounded-lg bg-white' }, button({ className: 'uppercase font-bold text-grey-darker w-full h-full p-8', onclick, value: category }, `${category} (${numberOfCards(category)(model)} Cards)`))

const courseF = model => onclick => category => course('text-blue hover:text-blue-dark hover:underline')(onclick)(model)(category)

export const courseList = msgFunction => dispatch => model =>
    ul({ className: 'list-reset' },
        compose(
            map(courseF(model)(e => dispatch(msgFunction(e.target.value)))),
            prop('courseList'),
            prop('courses')
        )(model)
    )

const inputSet = className => oninput =>
    input({
        className,
        type: 'text',
        oninput
    })
const addNewCourseView = className => dispatch => model =>
    div({ className }, [
        inputSet('border p-2 mt-4 mr-4')(e => dispatch(newCourseNameMsg(e.target.value))),
        buttonSet('bg-blue text-white p-2 mt-4 border')('Add New Course')(() => dispatch(addNewCourseMsg())),
    ])

export const courseView = dispatch => model =>
    div({ className: 'container mx-auto py-8' }, [
        h1({ className: 'my-8' }, 'Your Courses'),
        addNewCourseView('py-4')(dispatch)(model),
        courseList('text-blue')(dispatch)(model),
    ])