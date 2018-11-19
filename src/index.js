import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    hashHistory,
} from 'react-router-dom';
import 'babel-polyfill';
/*
	前端界面的css样式引用
*/

import '../assets/css/index.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/jquery.gritter.css';
import '../assets/css/ace.min.css';
import '../assets/css/ace-rtl.min.css';
import '../assets/css/ace-skins.min.css';

/*路由引入*/
import RouterNav from './router';

ReactDOM.render( 
    <RouterNav/> , 
    document.getElementById('app')
);
