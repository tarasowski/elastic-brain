import { prop } from 'ramda-x'

export const filterCategory = categoryName => model =>
    ({
        ...model,
        activeCards: [...prop('cards', model).filter(element => element.category === categoryName)],
        activeCategory: categoryName,
        categoryView: true,
    })

export const filterCategoryRepetition = categoryName => model =>
    ({
        ...model,
        activeRepetitionCards: [...prop('repetition', model).filter(element => element.category === categoryName)],
        activeRepetitionCategory: categoryName,
        categoryRepetitionView: true,
    })