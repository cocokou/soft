import React from 'react';
import { Link } from 'react-router';
import { Input, Select, Button, Layout, Table, Icon, Breadcrumb, TreeSelect, Dropdown, Row, Col, Card, Popconfirm, Upload } from 'antd';
import Nav from '../common/pc_nav';
import * as config from 'config/app.config.js';
import AddOrg from './AddOrg'


const { Content, Sider } = Layout;


class TopHeader extends React.Component {
  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>设备管理</Breadcrumb.Item>
          <Breadcrumb.Item>设备组</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}

class Org extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [{
        id: 1,
        key: 99,
        org: '测试组1 - 测试组1.1',
        device_qty: 200,
        detail: '***',
        created: '2017-01-01 12:00',
      }, {
        id: 2,
        key: 98,
        org: '深圳 - 开发部',
        device_qty: 500,
        detail: '***',
        created: '2017-01-01 12:00',
      }, {
        id: 3,
        key: 97,
        org: '北京 - 海淀 - 测试组',
        device_qty: 100,
        detail: '***',
        created: '2017-01-01 12:00',
      },],
      index: '',
      record: ''
    };

    this.columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      render: id => <a href="#">{id}</a>,
    },{
      title: '设备路径',
      dataIndex: 'org',
      key: 'org',
    }, {
      title: '包含设备数',
      dataIndex: 'device_qty',
      key: 'device_qty'
    }, {
      title: '描述',
      dataIndex: 'detail',
      key: 'detail'
    }, {
      title: '创建时间',
      dataIndex: 'created',
      key: 'created'
    }, {
      title: '操作',
      key: 'action',
      render: (record, index) => (
        <Popconfirm title="确定要删除设备组吗？" onConfirm={this.onDelete.bind(this, index)} placement="leftBottom" okText="删除" cancelText="取消">
          <a href="javascript:;" >删除</a>
        </Popconfirm>
      ),
    }];

    this.onDelete = this.onDelete.bind(this);
    this.addOrg = this.addOrg.bind(this);
    
  } // end of constructor


  onDelete(index) {
    const dataSource = [...this.state.dataSource]
    dataSource.splice(index, 1);//index为获取的索引，后面的 1 是删除几行  
    this.setState({ dataSource });
  }


  //增加设备组
  addOrg(comment) {
    const dataSource =[...this.state.dataSource]
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

            <AddOrg addOrg={this.addOrg} />
            <Table columns={this.columns} rowKey="id"
              dataSource={this.state.dataSource}
            />

          </Content>
        </Layout>

      </div>

    );
  }

  // componentDidMount() {
  //   getProductList()
  //     .done((data) => {
  //       this.setState({ dataSource: data })
  //     })
  //     .fail(msg => {
  //       message(msg || '网络异常，请稍后再试')
  //     })
  // }

}

export default Org;

