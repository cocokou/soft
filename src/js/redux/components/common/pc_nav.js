import React, {Component} from 'react';

import {Link} from 'react-router';

import nav_config from 'config/nav.config';
import * as _Util from 'utils/index';

import { Menu, Icon } from 'antd';
const { SubMenu, Item } = Menu;


const Util = _Util.default;

const check_active = function(link, path){
  return link == path || path.startsWith(link); 
}

class Nav extends Component {
  constructor(props){
    super(props);
    this.state = {
      current:  "",
      openKeys: [],
    };
  }
  render() {
    /*console.warn(location)*/
    var role = sessionStorage.getItem("role");
    var trans_nav_config = nav_config;
    if(role == 'visitor'){
      trans_nav_config = nav_config.filter( m =>  m.role == 'visitor')
    }

    var treeDOM = trans_nav_config.map(firstLevelItem => {
      if(Util.core.isArray(firstLevelItem.link)){
        let secondLevels = firstLevelItem.link.map(secondLevelItem => {
          return (
            <Item key={secondLevelItem.key}>
              <Link to={secondLevelItem.link}>{secondLevelItem.name}</Link>
            </Item>
            )
        })

        return (
          <SubMenu key={firstLevelItem.key} title={<span><Icon type="appstore" /><span className="nav-text">{firstLevelItem.name}</span></span>}>
            {secondLevels}
          </SubMenu>
          )
      }
    })
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        selectedKeys={[this.state.current]}
        onOpenChange={this.onOpenChange.bind(this)}
        onClick={this.handleClick.bind(this)}
        style={{height: '100%', paddingTop: 30}}
      >

        {treeDOM}
      </Menu>
    );
  }
  componentDidMount(){
    var current_path = location.pathname;

    nav_config.forEach( firstLevelItem => {
      firstLevelItem.link.forEach( secondLevelItem => {
        // if(current_path.startsWith(secondLevelItem.link)){
        //   var { openKeys } = this.state;

        //   openKeys.push(firstLevelItem.key);
        //   console.log("openKeys:",openKeys);
        //   this.setState({current: secondLevelItem.key, openKeys})
        // }
        if(current_path === (secondLevelItem.link)){
          var { openKeys } = this.state;
          openKeys.push(firstLevelItem.key);
          this.setState({current: secondLevelItem.key, openKeys})
        }
      })
    })
  }
  handleClick(e){
    console.log('Clicked: ', e);
    this.setState({ current: e.key });
  }
  onOpenChange(openKeys){
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }
  getAncestorKeys(key){
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  }
}

Nav.defaultProps = {
  onRender: function(role){
    return true;
  }
}

export default Nav;