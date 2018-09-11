/*
  获取token
*/
import Cookie from '../../tools/cookie';
import Storage from '../../tools/storage';

import Fetch from './fetch';

async function token() {
    let search = window.location.search,
        ticket = search.replace('?ticket=', ''),
        val = await Fetch({
            url: '/sys/getTokenByTicket',
            method: 'POST',
            param: { "ticket": ticket }
        });

    if (val.succeed) {
        Cookie.set('token', val.rspdata.token, 1000 * 60 * 60 * 3);
        Storage.set('uapSsoUrl', val.rspdata.uapSsoUrl);
    }
}


export default token;