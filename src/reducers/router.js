
const changeUrlState = msg => model => {
    return [{ ...model }, { url: msg.url }]
}


export { changeUrlState }