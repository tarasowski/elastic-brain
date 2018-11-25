const changeBrowserUrl = url =>
    new Promise((resolve, reject) => {
        history.pushState({ url: url }, null, url)
        resolve('url changed')
    })

const changeUrlState = msg => model => {
    return [{ ...model }, { url: () => changeBrowserUrl(msg.url) }]
}


export { changeUrlState }