import React from 'react';
import { Link } from 'react-router';
import { Input, Select, Button, Layout, Table, Icon, Breadcrumb, TreeSelect, Dropdown, Row, Col, Card } from 'antd';
import Nav from '../common/pc_nav';
import * as config from 'config/app.config.js';

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
    label: '未登记',
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
    },{
      label: '生产部',
      value: '0-0-0-2',
      key: '0-0-0-2',
    },{
      label: '销售部',
      value: '0-0-0-2',
      key: '0-0-0-2',
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
    },{
      label: 'B2',
      value: '0-2-2-2',
      key: '0-2-2-2',
    },{
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

const Option = Select.Option;
class TopHeader extends React.Component {
  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>产品管理</Breadcrumb.Item>
          <Breadcrumb.Item>产品管理</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}


class FilterHeader extends React.Component {
  render() {
    return (
      <div className="panel search">
        <div style={{ lineHeight: 3 }}>
          <label>搜索设备：&nbsp; </label>
          <Search placeholder="请输入关键字" style={{ maxWidth: 200, marginRight: 60 }} />
          <Button type="primary" icon="search">Search</Button>
        </div>
        <div style={{ lineHeight: 3 }}>

          <label style={{ width: 70 }}>设备状态：&nbsp; </label>
          <TreeSelect
            style={{ width: 200 }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={treeData}
            placeholder="--请选择--"
            treeDefaultExpandAll
            class='space-right'
          />


          <label style={{ marginLeft: 60 }}>所属部门：&nbsp; </label>
          <TreeSelect
            style={{ width: 200 }}
            dropdownStyle={{ maxHeight: 600, overflow: 'auto' }}
            treeData={orgData}
            placeholder="--请选择--"
            treeDefaultExpandAll
            class='space-right'
          />
        </div>

        <div style={{ lineHeight: 3 }}>
          <label>设备位置：&nbsp; </label>
          <TreeSelect
            style={{ width: 200 }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={treeData}
            placeholder="--请选择--"
            treeDefaultExpandAll
            class='space-right'
          />
          <label style={{ marginLeft: 60 }}>设备类型：&nbsp; </label>
          <TreeSelect
            style={{ width: 200 }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={treeData}
            placeholder="--请选择--"
            treeDefaultExpandAll
            class='space-right'
          />
        </div>

      </div>
    )
  }
}


class SummaryPanel extends React.Component {
  render() {
    return (
      <div>
       

 <Card title="Summary"  style={{ width: '100%', minHeight:280 }}>
   
            <Row gutter={16} style={{ maxWidth: 1500, fontSize:24, marginTop: 20 }}>
            <Col span={8}>
              <div className="gutter-box" style={{ height: 80, backgroundColor: '#4ca64c', color: "#fff", borderRadius: 5 }}  >
                <div style={{ padding: '20px' }}><Icon type="check-circle" /> 正常设备数：<a href=""> 666</a></div>
              </div>
            </Col>

            <Col span={8}>
              <div className="gutter-box" style={{ height: 80, backgroundColor: '#ff4c4c', color: "#fff", borderRadius: 5 }}  >
                <div style={{ padding: '20px' }}><Icon type="close-circle" /> 异常设备数： <a href="">22</a></div>
              </div>
            </Col>

            <Col className="gutter-row" span={8}>
              <div className="gutter-box" style={{ height: 80, backgroundColor: '#428bca', color: "#fff", borderRadius: 5 }}  >
                <div style={{ padding: '20px' }}> <Icon type="info-circle" /> 未登记设备：<a style={{ color: "#fff" }} href="">12</a></div>
              </div>
            </Col>

          </Row>

  </Card>

      </div>
    )
  }
}


const columns = [{
  title: '编号',
  dataIndex: 'id',
  key: 'id',
  render: id => <a href="#">{id}</a>,
}, {
  title: '设备名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '设备状态',
  dataIndex: 'status',
  key: 'status'
}, {
  title: '所属部门',
  dataIndex: 'org',
  key: 'org'
}, {
  title: '设备类型',
  dataIndex: 'type',
  key: 'type'
}, {
  title: '状态更新时间',
  dataIndex: 'last_update_time',
  key: 'last_update_time'
}, {
  title: '设备位置',
  dataIndex: 'location',
  key: 'location'
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <div>
      <span>
        <a href="#">查看</a>
      </span>
      <span className="ant-divider" />
      <span>
        <a href="#">编辑</a>
      </span>
    </div>
  ),
}];

const data = [{
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
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },

};
export default class DeviceManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
  }
  render() {
    var { list } = this.state;

    return (
      <div>
        <TopHeader />
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Nav />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <FilterHeader />
            <Button type="primary" style={{margin:20}}>创建设备</Button>
            <Button type="primary">删除设备</Button>
            <Button type="primary" style={{margin:20}}>暂停设备</Button>
            <Button type="primary">重启设备</Button>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            <SummaryPanel />


          </Content>
        </Layout>
      </div>
    )
  }
  /*  componentDidMount(){
          var options = config.default.fetchOptions('POST', 'GetProductList', {})
          fetch(config.default.product_info, options)
          .then(res => res.json())
          .then(json => {
            var data = json.data.map( m => {m.key=m.id; return m})
            this.setState({list: data})
          })
          .catch(ex => {console.warn("parsed err: " + ex)})
    }*/
}