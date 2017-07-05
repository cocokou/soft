import React from 'react';
import { Input , Select, Button, Table, Icon, Layout, Breadcrumb, Row, Col, message} from 'antd';
import MyMap from 'utils/product_group_scope';
import Nav from '../common/pc_nav';
import { getDeviceList } from 'actions/index';
const { Content, Sider } = Layout;
const Search = Input.Search


export default class QrcodeManage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }
  render(){
    let { list } = this.state;
    const columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      render: id => <a href="#">{id}</a>,
    }, {
      title: '产品名',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '生产日期',
      dataIndex: 'created',
      key: 'standard'
    },{
      title: '操作',
      key: 'action',
      render: (text, record, index) => (
        <div>
          <span>
            <a href="#">查看</a>
          </span>
          <span className="ant-divider" />
          <span>
            <a href="#">编辑</a>
          </span>
          <span className="ant-divider" />
      {    // <span>
          //   <Popconfirm title="设备删除后不能恢复，确定要删除这台设备吗？" onConfirm={this.onDelete.bind(this, index)} placement="leftBottom" okText="删除" cancelText="取消">
          //     <a href="javascript:;" >删除</a>
          //   </Popconfirm>

          // </span>
        }
        </div>
      ),
    }];
    return (
      <div>

        <Layout style={{padding:'24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Nav />
          </Sider>
          <Content style={{padding:'0 24px', minHeight: 280 }}>
          {/*<FilterHeader />*/}
          <Row>
           
              <div className="panel">
                <div className="panel-body">
                  <Table rowKey="id" columns={columns} dataSource={list} />
                </div>
              </div>
       {console.log(list)}

          </Row>
          </Content>
        </Layout>
      </div>
      )
  }
  componentDidMount(){
    getDeviceList()
    .done((data) => {
       this.setState({list: data})
    })
    .fail( msg => {
      message(msg || '网络异常，请稍后再试')
    })
  }

}