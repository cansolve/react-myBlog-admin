/*
	获取菜单
*/

import Cache from '../../tools/cache';

import Fetch from './fetch';

async function tree() {
    let val = await Fetch({
        url: '/sys/getTreeMenu',
        method: 'POST',
        param: { "appId": "100000109" }
    });

    if (val.succeed) {
        Cache.set('tree', val.rspdata.menus);
    }
}


export default tree;