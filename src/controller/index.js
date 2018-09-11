import React from 'react';
import { render } from 'react-dom';
import {
    Router,
    Route,
    hashHistory,
} from 'react-router';
import 'babel-polyfill';
/*
	前端界面的css样式引用
*/

import '../../assets/css/bootstrap.min.css';
import '../../assets/css/jquery.gritter.css';
import '../../assets/css/ace.min.css';
import '../../assets/css/ace-rtl.min.css';
import '../../assets/css/ace-skins.min.css';


import '../../assets/scss/index.scss';
/*cookie引入*/
import Cookie from '../tools/cookie';

import Token from './tools/token'; //获取token
import User from './tools/user'; //获取用户信息
import Tree from './tools/tree'; //获取菜单

/*配置引入*/
import Config from '../config';

/*路由引入*/
import RouterNav from './router';


async function init() {
    // if (Config.isUap) {
    // 	if (!Cookie.get('token') || window.location.search.search('ticket') > -1) {
    // 		await Token();
    // 	}

    // 	let user = await User();

    // 	//判断是否用户已登录还是过期了
    // 	if (!user.succeed) {
    // 		return;
    // 	}

    // 	//获取菜单
    // 	await Tree();
    // }

    render( <RouterNav /> ,document.getElementById('app'));
}
export default init();