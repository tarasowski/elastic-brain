import hh from 'hyperscript-helpers'
import { h } from 'virtual-dom'

import { getAccessTokenMsg } from './store/msg'

const { body } = hh(h)

const getTokenFromCookie = () =>
    document.cookie.slice(12)


export const init = dispatch =>
    body({ onload: () => dispatch(getAccessTokenMsg(getTokenFromCookie())) }, [

    ])    
