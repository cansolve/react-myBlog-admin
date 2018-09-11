/*
	获取用户信息
*/

import Cache from '../../tools/cache';

import Fetch from './fetch';

async function user() {
    let val = await Fetch({
        url: '/sys/getUserInfo',
        method: 'POST',
        param: {}
    });

    if (val.succeed) {
        Cache.set('user', val.rspdata.user);
    } else {
        if (val.rtncode === 'NULOGIN') {
            window.location = val.rtnmsg.replace('location:', '').replace('??', '?');
        }
    }

    return val;
}


export default user;