export const initModelCourses = {
    showAddNewCourse: false,
    newCourseName: '',
    courseList: []
}

export const addNewCourse = model =>
    ([{
        ...model,
        courses: { ...model.courses, courseList: [...model.courses.courseList, model.courses.newCourseName] }
    }, { request: 'add-course', payload: model.courses.newCourseName }])

const replace = data => data.replace(/\s/g, '_')

export const addNewCourseName = value => model =>
    ({
        ...model,
        courses: { ...model.courses, newCourseName: replace(value) }
    })

export const updateCourseList = list => model =>
    ({
        ...model,
        courses: { ...model.courses, courseList: [...list] }
    })
