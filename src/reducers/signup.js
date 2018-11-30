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



export const signUpNewUser = model =>
    ([
        { ...model, signup: { ...model.signup, singupView: false, confirmationView: true } },
        {
            request: 'signup',
        },

    ])


export const successSignUp = message => model =>
    ({
        ...model,
        signup: { ...model.signup, signupView: false, confirmationView: true },
        user: { ...model.user, showConfirmation: true, message }
    })

export const confirmSignUp = model =>
    ([{ ...model }, { request: 'confirmation' }])

export const successConfirmation = message => model =>
    ({
        ...model,
        signup: { ...model.signup, confirmationView: false, loginView: true },
        user: { ...model.user, message }
    })

export const signIn = model =>
    ([{ ...model }, { request: 'signin' }])

export const successSignIn = message => model =>
    ({ ...model, user: { ...model.user, message, username: '', password: '' } })

export const assignAccessToken = accessToken => model =>
    ({ ...model, user: { ...model.user, accessToken } })

export const loginFromSignup = model =>
    ({ ...model, signup: { ...model.signup, signupView: false, loginView: true } })

export const signupFromLogin = model =>
    ({ ...model, signup: { ...model.signup, signupView: true, loginView: false } })


export { captureUsername, capturePassword, captureEmail, capturePin }