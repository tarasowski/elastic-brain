import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'
import { newCourseNameMsg, addNewCourseMsg } from '../Update'
import { compose, prop, map, trace } from 'ramda-x'

const { div, h1, ul, li, a, button, input } = hh(h)


const buttonSet = className => value => onclick =>
    button({ className, onclick }, value)

const head = x => x[0]

const course = className => onclick => value =>
    li({}, button({ className, onclick }, value))

export const courseList = className => dispatch => model =>
    ul({ className },
        compose(
            map(course('text-blue hover: text-blue-dark hover:underline')(() => console.log('button'))),
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
        h1({}, 'Add Your New Course'),
        inputSet('border p-2 mt-4 mr-4')(e => dispatch(newCourseNameMsg(e.target.value))),
        buttonSet('bg-blue text-white p-2 mt-4 border')('Add New Course')(() => dispatch(addNewCourseMsg())),
    ])

export const courseView = dispatch => model =>
    div({ className: 'border p-8' }, [
        h1({ className: 'mb-4' }, 'Your Courses'),
        courseList('text-blue')(dispatch)(model),
        addNewCourseView('py-4')(dispatch)(model)
    ])