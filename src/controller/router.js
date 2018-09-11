import React from 'react';
import {
  Router,
  Route,
  hashHistory,
} from 'react-router';
import { Provider } from 'react-redux';
import {
  syncHistoryWithStore,
} from 'react-router-redux';

import Store from './store';
const history = syncHistoryWithStore(hashHistory, Store);

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
        <Router history={history}>
          <Route
            path='/'
            name='首页'
            getComponent={(location, cb) => {
              require.ensure([], require => {
                cb(null, require('./component/index/index').default);
              }, 'index');
            }}
          />

          <Route
            path='/nav'
            name='导航'
            getComponent={(location, cb) => {
              require.ensure([], require => {
                cb(null, require('./component/nav/index').default);
              }, 'index');
            }} />
          <Route
            path='/swiper'
            name='幻灯片'
            getComponent={(location, cb) => {
              require.ensure([], require => {
                cb(null, require('./component/swiper/index').default);
              }, 'index');
            }} />
          <Route
            path='/rotate'
            name='转盘'
            getComponent={(location, cb) => {
              require.ensure([], require => {
                cb(null, require('./component/rotate/index').default);
              }, 'index');
            }} />
          <Route
            path='/popup'
            name='弹窗'
            getComponent={(location, cb) => {
              require.ensure([], require => {
                cb(null, require('./component/popup/index').default);
              }, 'index');
            }} />
          <Route
            path='/video'
            name='视频'
            getComponent={(location, cb) => {
              require.ensure([], require => {
                cb(null, require('./component/video/index').default);
              }, 'index');
            }} />

        </Router>
      </Provider>
    )
  }
}

export default RouterNav;