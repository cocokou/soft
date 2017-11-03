import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import history from 'history_instance';
/*import PCIndex from './components/pc_index';
import ProductManage from './components/product/product_manage';*/
import MobileIndex from './components/mobile_index';
import { Provider } from 'react-redux'
import { store } from './store'

import { Entry, NoPermission } from './components/common/pc_body';
import { MobileEntry } from './components/common/mobile_body';
import MediaQuery from 'react-responsive';

import config from 'config/app.config';
import authList from 'config/auth.config';
let components = {};

/**
 * 有无该权限
 * @param  {String} auth 权限名
 */
export default function validate(auth) {
  var role = sessionStorage.getItem("role");
  var login = sessionStorage.getItem("Y");
  var m = config;
  //特殊情况
  if (!config.test_auth || role == 'admin') {
    return true;
  }
  var permissions = authList.auth[role];
  return permissions.some(n => n === auth);
}
/**
 * 注意，路由的权限控制存在于两部分，一部分在react-router当中，一部分在nav当中;
 * 该方法用于react-router当中，进行权限控制
 * @param  {String} auth 权限名
 */
export function onEnter(auth) {
  return function (state, replace) {
    //登录成功之后，才有必要进行validate
    if (sessionStorage.getItem("login") == 'Y') {
      if (!validate(auth)) {
        replace({}, '/403', null);
        return false;
      }
    }
    return true;
  }
}

const getComponents = (routePath, accessControl) => (nexState, replace, callback) => {
  if (accessControl && !accessControl(nexState, replace)) {
    return;
  }

  switch (routePath) {
    case 'dm':
      require.ensure([], require => {
        components.SummaryPannel = require('./components/device/summary.js').default;
        components.OrgPannel = require('./components/device/org.js').default;
        components.roomPannel = require('./components/device/room.js').default;
        components.testPannel = require('./components/device/test.js').default;
        components.positionPannel = require('./components/device/position.js').default;        
        components.devicemonitorPannel = require('./components/device/devicemonitor.js').default;        
        components.org2Pannel = require('./components/device/org2.js').default;
        components.DevicePannel = require('./components/device/device.js').default;
        components.Device2Pannel = require('./components/device/device2.js').default;

        callback();
      })
      break;

      case 'am':
      require.ensure([], require => {
        components.MenuManagePannel = require('./components/authority/menu.js').default;
        // components.testPannel = require('./components/authority/test.js').default;
        components.testPannel = require('./components/authority/test.js').default;
        components.test2Pannel = require('./components/authority/test2.js').default;
        components.emmaPannel = require('./components/authority/emma.js').default;
    
        callback();
      })
      break;

    // case 'pm':
    //   require.ensure([], require => {
    //     components.roomPannel = require('./components/position/room.js').default;
    //     callback();
    //   })
    //   break;
  }
}

const get = componentName => (location, callback) => {
  
  callback(undefined, components[componentName]);
}



const Root = () => (
  //这里替换了之前的Index,变成了程序的入口
  <Provider store={store}>
  <div>

    <MediaQuery query='(min-device-width: 1224px)'>
      <Router history={history}>
        <Route path="/" component={Entry}>

          <Route path="dm" onEnter={getComponents('dm')}>
            <Route path="summary" getComponents={get('SummaryPannel')} />
            <Route path="test" getComponents={get('testPannel')} />
            <Route path="room" getComponents={get('roomPannel')} />
            <Route path="org" getComponents={get('OrgPannel')} />
            <Route path="org2" getComponents={get('org2Pannel')} />
            <Route path="position" getComponents={get('positionPannel')} />
            <Route path="device" getComponents={get('DevicePannel')} />
            <Route path="devicemonitor" getComponents={get('devicemonitorPannel')} />            
            <Route path="device2" getComponents={get('Device2Pannel')} />

          </Route>

          <Route path="am" onEnter={getComponents('am')}>
            <Route path='menu' getComponents={get('MenuManagePannel')} />
            <Route path='test' getComponents={get('testPannel')} />
            <Route path='test2' getComponents={get('test2Pannel')} />
            <Route path='emma' getComponents={get('emmaPannel')} />
            <Route path='view' render={() => (<div>hello</div>)} />
          </Route>
       
          <Route path="403" component={NoPermission} />

        </Route>
      </Router>
    </MediaQuery>
    <MediaQuery query='(max-device-width: 1224px)'>
      <Router history={history}>
        {/*<Route path="/" component={MobileEntry}>
              <Route path="pm" onEnter={getComponents('pm')}>
                <Route path="product/:id" getComponent={get('ProductDetailPannel')} />
              </Route>
            </Route>*/}
        <Route path="/" component={MobileIndex} />
   
      </Router>
    </MediaQuery>
  
  </div>  
  </Provider>
)

ReactDOM.render( <Root />, document.getElementById('mainContainer'));
// ReactDOM.render(<Root />, document.getElementById('mainContainer'));