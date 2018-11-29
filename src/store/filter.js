export const filterCategory = categoryName => model =>
    ({
        ...model,
        activeCards: [...model.cards.filter(element => element.category === categoryName)],
        activeCategory: categoryName,
        categoryView: true,
    })