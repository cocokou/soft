import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Button, Row, Col, Card, Icon, Form, Input, Modal, Tree, Layout, Table, Select, Popconfirm } from 'antd';
import Nav from '../common/pc_nav';
import { Link } from 'react-router';
import EditableCell from './edit'
import { addColl, delColl } from '../../actions/setting'
import Add from './Add'
import EditModal from './EditModal'
import { connect } from 'react-redux';

const { Content, Sider } = Layout;

class CustomerFields extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '字段名称',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '字段 ID',
            dataIndex: 'id',
            key: 'id',
        },
        // {
        //     title: '字段类型',
        //     dataIndex: 'type',
        //     key: 'type',
        // },
        {
            title: '操作',
            key: 'action',

            render: (text, record, index) => (
                <span>
                
                  <EditModal onEdit={(record)=>this.editCol(record)} title='修改字段' record={record}
                  columns={this.columns}/>
      <span className="ant-divider" />

                    <Popconfirm title="确定删除？" onConfirm={()=>{this.onDelete(record.id)}} placement="leftBottom" okText="删除" cancelText="取消">
                        <a href="#"> <Icon type="delete" /></a>
                    </Popconfirm>
                </span>
            ),
        }
        ];
    }

    editCol(record){
        console.log('going to eidt ', record)
      //   let tab = {
      //     title: values.title,
      //     id: values.id,
      //     type: values.type,
      //     key: values.id,
      //     dataIndex:values.id
      // };
      // this.props.dispatch(addColl(tab));
    }

    addCol(values) {
        let tab = {
            title: values.title,
            id: values.id,
            type: values.type,
            key: values.id,
            dataIndex:values.id
        };
        this.props.dispatch(addColl(tab));
    }

    onDelete(id) {
        this.props.dispatch(delColl(id));
        console.log(id)
    }

    render() {
        let {columns} =  this.props
        // let cols = columns.slice(0,-1)
        return (
            <div>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Nav />
                    </Sider>
                    <Content style={{ minHeight: 280 }}>
                    <Card bordered noHovering>
                      <div style={{ paddingBottom: "20px", borderBottom: "2px solid #00aaef", marginBottom: 15 }}>                 
                        <Row>
                            <Col span={4}> <h2> 设置 - 学生</h2></Col>                             
                            <Col span={4}>
                            <Add onAdd={(value)=>this.addCol(value)} title='添加字段'
                            columns={this.columns}/></Col>

                            <Col span={6}> <Link to='/am/test2'><h2> 查看效果</h2></Link> </Col>
                        </Row>
                      
                      </div>

                        <Table columns={this.columns} bordered
                            // dataSource={cols}                     
                            dataSource={this.props.columns}                     
                        />
                    </Card>
                    </Content>
                </Layout>
            </div>
        );
    }
};


function mapStateToProps ({ fields }) {
    let columns = Object.keys(fields).reduce((columns,id) => {
        return [...columns,fields[id]]
    },[])
  
    return {
        columns
    }
}
export default connect(mapStateToProps)(CustomerFields);