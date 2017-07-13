import React from 'react';
import { Link } from 'react-router';
import { Input, Select, Button, Layout, Table, Icon, Breadcrumb, TreeSelect, Dropdown, Row, Col, Card, Popconfirm, Upload } from 'antd';
import Nav from '../common/pc_nav';
import * as config from 'config/app.config.js';
import Add from './add'
import { getDeviceList } from 'actions/index';


class DeviceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      index: '',
      query: '',
      selectedRowKeys: [],
      selectedRows: [],
      record: ''
    };

    this.onDelete = this.onDelete.bind(this);
    this.addDevice = this.addDevice.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.handleSelectedDelete = this.handleSelectedDelete.bind(this);
    this.columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      render: id => <a href="#">{id}</a>,
    }, {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '部门',
      dataIndex: 'org',
      key: 'org'
    },{
      title: '设备类型',
      dataIndex: 'type',
      key: 'type'
    },{
      title: '设备描述',
      dataIndex: 'product_type',
      key: 'product_type'
    },{
      title: '最后更新时间',
      dataIndex: 'created',
      key: 'created'
    },{
      title: '操作',
      key: 'action',
      render: (text, record, index) => (
        <div>
          <span>
            <a href="#">禁用</a>
          </span>
          <span className="ant-divider" />
          <span>
            <a href="#">连接协议详情</a>
          </span>
{          // <span className="ant-divider" />
          // <span>
          //   <Popconfirm title="设备删除后不能恢复，确定要删除这台设备吗？" onConfirm={this.onDelete.bind(this, index)} placement="leftBottom" okText="删除" cancelText="取消">
          //     <a href="javascript:;" >删除</a>
          //   </Popconfirm>

          // </span>
        }
        </div>
      ),
    }];
  }



  onDelete(index) {
    const dataSource = [...this.state.dataSource]
    dataSource.splice(index, 1);//index为获取的索引，后面的 1 是删除几行  
    this.setState({ dataSource });
  }

  handleSelectedDelete() {
    if (this.state.selectedRowKeys.length > 0) {
      const dataSource = [...this.state.dataSource]
      dataSource.splice(this.state.selectedRows, this.state.selectedRows.length)
      this.setState({ dataSource });
    }
    else {
    }
  }
  //增加设备
  addDevice(comment) {
    const dataSource = this.state.dataSource;
    dataSource.unshift(comment);
    this.setState({ dataSource })
  }


onSearch(query){
 let dataSource = this.state.dataSource;
    let results
         if ( this.state.query) {
      const match = new RegExp(escapeRegExp( this.state.query), 'i')
      results = dataSource.filter((contact) => match.test(contact.name))
    } else {
      results = dataSource
    }
    this.setState({
        dataSource: results
    });
}

showDetail() {
  alert('Device 1 xxxx')
}

  render() {


    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys: selectedRowKeys,
          selectedRows: selectedRows
        })
      },
    };

   
    return (
      <div>



      <Row gutter={32} style={{ maxWidth: 1500, minWidth: 800, fontSize: 22, margin: 20 }}>

          <Col span={3}>
            <Add addDevice={this.addDevice} />
          </Col>
          <Col span={2}>
            <Popconfirm title="设备删除后不能恢复，确定要删除所选设备吗？" onConfirm={this.handleSelectedDelete} okText="删除" cancelText="取消">
              <Button type="primary" >删除</Button>
            </Popconfirm>
          </Col>
          <Col span={2}>
            <Button >暂停</Button>
          </Col>
          <Col span={2}>
            <Button>重启</Button>
          </Col>
        </Row>
      

        <Table columns={this.columns}
          dataSource={this.state.dataSource}
          rowSelection={rowSelection} rowKey='id'
        />
 {console.log(this.state.dataSource)}
      </div>

    );
  }

  componentDidMount(){
    getDeviceList()
    .done((data) => {
       this.setState({dataSource: data})
    })
    .fail( msg => {
      message(msg || '网络异常，请稍后再试')
    })
  }

}

export default DeviceList;

