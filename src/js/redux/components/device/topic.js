import React from 'react';
import { Link } from 'react-router';
import { Input, Select, Button, Layout, Table, Icon, Breadcrumb, TreeSelect, Dropdown, Row, Col, Card, Popconfirm } from 'antd';
import Nav from '../common/pc_nav';
import * as config from 'config/app.config.js';
import AddTopic from './addtopic'


const { Content, Sider } = Layout;

class TopHeader extends React.Component {
  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>设备管理</Breadcrumb.Item>
          <Breadcrumb.Item>管理设备主题</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}


class ManageTopic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [{
        id: 'a',
  
        type: 'TYPE-100',
        topic: '2.4G',
        description: '每一类设备，共用一组用户名密码',
        username: 'device_kin',
        password: 'abcde****vb',
      }, {
        id: 'b',
        // key: 2,
        type: 'TYPE-600',
        topic: '433MHz',
        description: '用户名密码，对应一个主题',
        username: 'device_666',
        password: 'gu***ess',
      }, {
        id: 'c',
        // key: 3,
        type: 'TYPE-800',
        topic: 'EPC-128',
        description: '每次连接成功，发送一个主题',
        username: 'device_888',
        password: 'guess***',
      }],
    };

    this.columns = [{
      title: '设备类型',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '主题名称',
      dataIndex: 'topic',
      key: 'topic'
    }, {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    }, {
      title: '密码',
      dataIndex: 'password',
      key: 'password'
    }, {
      title: '描述',
      dataIndex: 'description',
      key: 'description'
    }];


    this.addTopic = this.addTopic.bind(this);

  } 



  addTopic(comment) {
    const dataSource = [...this.state.dataSource]
    dataSource.unshift(comment);
    this.setState({ dataSource })
  }

  render() {
    return (
      <div>

        <TopHeader />
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Nav />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <h2 style={{paddingBottom:20, fontWeight:500}}>添加设备类型</h2>

            <AddTopic addTopic={this.addTopic} />
            <Table columns={this.columns}
              dataSource={this.state.dataSource}
            />

          </Content>
        </Layout>


      </div>
    );
  }
}


export default ManageTopic