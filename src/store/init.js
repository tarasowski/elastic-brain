export const loadTodayCardsIntoModel = model =>
    ([{ ...model }, { request: 'load-cards' }])


export const updateCardsOnload = payload => model =>
    model.numberOfCards !== payload.data.data.getQuestions.questions.length
        ? { ...model, numberOfCards: payload.data.data.getQuestions.questions.length, cards: [...model.cards, ...payload.data.data.getQuestions.questions], repetition: [...model.cards, ...payload.data.data.getQuestions.questions] }
        : { ...model }