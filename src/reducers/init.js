export const loadTodayCardsIntoModel = model =>
    ([{ ...model }, { request: 'load-cards' }])


export const updateCardsOnload = payload => model =>
    model.numberOfRepetitionCards < payload.data.data.getTodaysQuestions.questions.length
        ? { ...model, numberOfRepetitionCards: payload.data.data.getTodaysQuestions.questions.length, /* cards: [...model.cards, ...payload.data.data.getTodaysQuestions.questions], */ repetition: [...model.repetition, ...payload.data.data.getTodaysQuestions.questions] }
        : { ...model }

export const initLoadAllCards = payload => model =>
    model.numberOfCards < payload.data.data.getAllCards.questions.length
        ? { ...model, numberOfCards: payload.data.data.getAllCards.questions.length, cards: [...model.cards, ...payload.data.data.getAllCards.questions] }
        : { ...model }

export const loadInitState = model =>
    ([{ ...model }, { request: 'load-state' }])

export const resetViews = model =>
    ({
        ...model,
        currQuestion: '',
        currAnswer: '',
        currId: '',
        nextId: 0,
        newQuestion: '',
        newAnswer: '',
        newId: 0,
        repeatQuestion: '',
        repeatAnswer: '',
        currRepeatId: 0,
        nextRepeatId: 0,
        activeCards: [],
        showRepeatAnswer: false,
        activeCategory: 'all',
        categoryView: false,
        activeRepetitionCards: [],
        activeRepetitionCategory: 'all',
        categoryRepetitionView: false,
    })