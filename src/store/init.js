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