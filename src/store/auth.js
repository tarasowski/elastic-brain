const captureUsername = username => model => ({
    ...model,
    user: { ...model.user, username }
})

const capturePassword = password => model => ({
    ...model,
    user: { ...model.user, password }
})

const captureEmail = email => model => ({
    ...model,
    user: { ...model.user, email }
})

const capturePin = pin => model => ({
    ...model,
    user: { ...model.user, pin }
})


const initModelAuth = {
    username: '',
    password: '',
    email: '',
    pin: ''
}

export { initModelAuth, captureUsername, capturePassword, captureEmail, capturePin }