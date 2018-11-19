import React from 'react';
import { render } from 'react-dom';
import {
    Router,
    Route,
    hashHistory,
} from 'react-router-dom';
import 'babel-polyfill';

/*
	前端界面的css样式引用
*/

import '../../assets/css/index.css';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/jquery.gritter.css';
import '../../assets/css/ace.min.css';
import '../../assets/css/ace-rtl.min.css';
import '../../assets/css/ace-skins.min.css';


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
    
    render( < RouterNav / > , document.getElementById('app'));
}
export default init();