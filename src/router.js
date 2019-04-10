import React , { Component }from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import history from 'history/createBrowserHistory';
import { Provider } from 'react-redux';

import Store from './store';


//
import Home from './component/index/index';
import ArticleList from './component/articleList/index';
import Userlist from './component/userlist/index';
import MessageList from './component/messageList/index';
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
            <Route path="/userList" component={Userlist} />
            <Route path="/articleList" component={ArticleList} />
            <Route path="/messageList" component={MessageList} />
          </Switch>
        </HashRouter>
      </Provider>
    )
  }
}

export default RouterNav;