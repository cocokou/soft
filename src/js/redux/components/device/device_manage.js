import React from 'react';
import { Link } from 'react-router';
import { Input, Select, Button, Layout, Table, Icon, Breadcrumb, TreeSelect, Dropdown, Row, Col, Card, Popconfirm, Upload } from 'antd';
import Nav from '../common/pc_nav';
import * as config from 'config/app.config.js';
import DeviceList from './DeviceList'

const { Content, Sider } = Layout;
const Search = Input.Search;
const treeData = [{
  label: '设备状态',
  value: '0-0',
  key: '0-0',
  children: [{
    label: '正常',
    value: '0-0-1',
    key: '0-0-1',
  }, {
    label: '不正常',
    value: '0-0-2',
    key: '0-0-2',
  }, {
    label: '待配置',
    value: '0-0-3',
    key: '0-0-3',
  }],
}, {
  label: '部门',
  value: '0-1',
  key: '0-1',
  children: [{
    label: 'A部门',
    value: '0-0-1',
    key: '0-0-1',
  }, {
    label: 'B部门',
    value: '0-0-2',
    key: '0-0-2',
  }, {
    label: 'C部门',
    value: '0-0-3',
    key: '0-0-3',
  }]
}];

const statusData = [{
  label: '正常',
  value: '0-0-1',
  key: '0-0-1',
}, {
  label: '不正常',
  value: '0-0-2',
  key: '0-0-2',
}, {
  label: '待配置',
  value: '0-0-3',
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


const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(info.file.name + ' 上传成功。');
    } else if (info.file.status === 'error') {
      message.error(info.file.name + ' 上传失败。');
    }
  }
};



const Option = Select.Option;
class TopHeader extends React.Component {
  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>设备管理</Breadcrumb.Item>
          <Breadcrumb.Item>查看设备</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}






export default class ManageDevice extends React.Component {

  render() {

    return (
      <div>
        <TopHeader />
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Nav />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>

            <DeviceList />

          </Content>
        </Layout>
      </div>
    )
  }

}