import React from 'react';
import { Link } from 'react-router';
import { Input, Select, Button, Layout, Table, Icon, Breadcrumb, TreeSelect, Dropdown, Row, Col, Card, Popconfirm, Upload } from 'antd';
import Nav from '../common/pc_nav';
import * as config from 'config/app.config.js';
import Add from './add'

const { Content, Sider } = Layout;
const Search = Input.Search;

const treeData=[];
const statusData = [{
    label:"全选",
    value:'',
    key:'0-0-0'
}, {
  label: '正常',
  value: '正常',
  key: '0-0-1',
}, {
  label: '不正常',
  value: '不正常',
  key: '0-0-2',
}, {
  label: '未登记',
  value: '未登记',
  key: '0-0-3',
}];

const orgData = [{
  label: '深圳',
  value: '0-0',
  key: '0-0',
  children: [{
    label: '科技园',
    value: '0-0-1',
    key: '0-0-1',
    children: [{
      label: '研发部',
      value: '0-0-0-1',
      key: '0-0-0-1',
    }, {
      label: '生产部',
      value: '0-0-0-2',
      key: '0-0-0-2',
    }, {
      label: '销售部',
      value: '0-0-0-3',
      key: '0-0-0-3',
    }]
  }, {
    label: '海岸城',
    value: '0-0-2',
    key: '0-0-2',
  }]
}, {
  label: '北京',
  value: '0-1',
  key: '0-1',
  children: [{
    label: 'A部门',
    value: '0-1-1',
    key: '0-1-1',
  }, {
    label: 'B部门',
    value: '0-2-2',
    key: '0-2-2',
    children: [{
      label: 'B1',
      value: '0-2-2-1',
      key: '0-2-2-1',
    }, {
      label: 'B2',
      value: '0-2-2-2',
      key: '0-2-2-2',
    }, {
      label: 'B3',
      value: '0-2-2-3',
      key: '0-2-2-3',
    }]
  }, {
    label: 'C部门',
    value: '0-2-3',
    key: '0-2-3',
  }]
}];

const deviceData = [{
  id: 1,
  key: 1,
  name: 'R2000',
  type: '桌面式读写器',
  status: '正常',
  last_update_time: '2017-01-01 12:00',
  org: 'A部门',
  location: '* * *',
}, {
  id: 2,
  key: 2,
  name: 'F5019-H',
  type: '固定式一体化读写器',
  status: '不正常',
  last_update_time: '2017-01-01 12:00',
  org: 'B部门',
  location: '* * *',
}, {
  id: 3,
  key: 3,
  name: 'F5880-H',
  type: '固定式多通道读写器',
  status: '未登记',
  last_update_time: '2017-01-01 12:00',
  org: 'C部门',
  location: '* * *',
}, {
  id: 4,
  key: 4,
  name: 'R2000',
  type: '桌面式读写器',
  status: '正常',
  last_update_time: '2017-01-01 12:00',
  org: 'A部门',
  location: '* * *',
}, {
  id: 5,
  key: 5,
  name: 'F5019-H',
  type: '固定式一体化读写器',
  status: '不正常',
  last_update_time: '2017-01-01 12:00',
  org: 'B部门',
  location: '* * *',
}, {
  id: 6,
  key: 6,
  name: 'F5880-H',
  type: '固定式多通道读写器',
  status: '未登记',
  last_update_time: '2017-01-01 12:00',
  org: 'C部门',
  location: '* * *',
}];



export default class SearchDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        query: '',
        filtered: false,
        value1:'正常',
    }
  }


    //搜索
    onInputChange(e){
         this.setState({ query: e.target.value});
        /*this.setState({ value1:e.target.value })*/
    }

    click(){
        const { query } = this.state;
        this.props.onSearch(query);
    }
  //搜索
    //选择

    onChange(value){
        this.setState({value1:value});
        const { value1 } = this.state;
        this.props.onSelect(value1);
    }
    //选择

  render() {
    return (
      <div className="panel search">
        <div style={{ lineHeight: 3 }}>
          <label>搜索设备：&nbsp; </label>
          <Search placeholder="请输入关键字" style={{ maxWidth: 200, marginRight: 60 }}
                  value={this.state.query} onChange={this.onInputChange.bind(this)} onPressEnter={this.click.bind(this)}/>
                 
          <Button type="primary" icon="search" onClick={this.click.bind(this)}>Search</Button>
        </div>
      </div>
    )
  }
}


