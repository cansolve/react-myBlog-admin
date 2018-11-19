import React , { Component }from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {Router} from 'react-router-dom';
import history from 'history/createBrowserHistory';
import { Provider } from 'react-redux';

import Store from './store';


//
import Home from './component/index/index';
import Nav from './component/nav/index';
import Swiper from './component/swiper/index';
import Rotate from './component/rotate/index';
import Popup from './component/popup/index';
import Video from './component/video/index';
/*
	前端路由配置	
*/
class RouterNav extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Provider store={Store}>
        <HashRouter history={history()}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/nav" component={Nav} />
            <Route path="/swiper" component={Swiper} />
            <Route path="/rotate" component={Rotate} />
            <Route path="/popup" component={Popup} />
            <Route path="/video" component={Video} />
          </Switch>
        </HashRouter>
      </Provider>
    )
  }
}

export default RouterNav;