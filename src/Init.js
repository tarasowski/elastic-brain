import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'

import { getAccessTokenMsg, loadTodaysCardsIntoModelMsg } from './Update'

const { body } = hh(h)

const getTokenFromCookie = () =>
    document.cookie.slice(12)


export const init = dispatch =>
    body({
        onload: () => dispatch(getAccessTokenMsg(getTokenFromCookie()))
    }, [

        ])    
