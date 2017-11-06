import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Button, Row, Col, Card, Icon, Form, Input, Modal, Tree, Layout, Table, Select, Popconfirm } from 'antd';
import Nav from '../common/pc_nav';
import Add from './Add'
import EditModal from './EditModal'
import { connect } from 'react-redux';

import {addData, getalldata,getallcolumn,delData,updateData} from './columnApi'
import { addColl, delColl,getAllColl } from '../../actions/setting'

const { Content, Sider } = Layout;

class Customers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [
                // {
                //     name: '学生A',
                //     tel: '123',
                //     key: 's-001',
                // }, {
                //     name: '学生B',
                //     tel: '456',
                //     key: 's-002',
                // }
            ]
        };

        this.opColumn = {
            title: '操作',
            key: 'action',

            render: (text, record, index) => (
                <span>
                    <EditModal onEdit={(values, record) => this.editCol(values, record)} title='修改字段' record={record}
                        columns={this.props.columns} />


                    <span className="ant-divider" />

                    <Popconfirm title="确定删除？" onConfirm={this.onDelete.bind(this, record)} placement="leftBottom" okText="删除" cancelText="取消">
                        <a href="#"> <Icon type="delete" /></a>
                    </Popconfirm>
                </span>
            ),
        };

        this.addCus = this.addCus.bind(this)
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        getallcolumn("aaa").then(val => {
            this.props.dispatch(getAllColl(val["data"]));
        })
        getalldata("aaa").then(val => {
             let dataSource = val["data"].map(v => {
                 v["key"] = v["_id"];
                 return v;
             });
            this.setState({ dataSource });
        })
    }
    editCol(values, record) {
        console.log('received values', values)
        console.log('going to eidt record', record)
        // let { columns } = this.props;
        // let cus = {}
        // for (let i = 0; i < columns.length; i++) {
        //     let p = columns[i].id;
        //     cus.key = values.id
        //     cus[p] = values[p]
        // }
        {//work1
            // values.key = record.key;
            // values._id = record._id;
        }
        {
            Object.keys(values).forEach(k => {
                record[k] = values[k];
            })
        }
        updateData("aaa", record.key, record).then(ret => {
            let dataSource = this.state.dataSource.map(v => {
                if (v.key === record.key) {
                    return record;
                } else {
                    return v;
                }
            });
            console.log("dataSource:",dataSource)
            this.setState({ dataSource });
        });

    }

    addCus(values) {
        // auto

        console.log("---------->values:", values);
        let { columns } = this.props;
        //let cols = columns.slice(1, -1)
        console.log("---------->column:", columns);
        let cus = {}
        for (let i = 0; i < columns.length; i++) {
            let p = columns[i].id;
            cus[p] = values[p]
        }
        console.log("------------->", cus)

        addData("aaa", cus).then(v => {
            let key = v["data"];
            cus["key"] = key;
            let myData = this.state.dataSource;
            myData.push(cus)
            this.setState({ dataSource: myData });
        });
        //cus.key = values.tel
    }

    onDelete(record) {
        let dataSource = [...this.state.dataSource];
        console.log('record', record)
        delData("aaa",record["key"]).then(v => {
            console.log("vvvv:",v);
            dataSource = dataSource.filter(v => {
                return v["key"] != record["key"];
            });
            this.setState({ dataSource });
        });
    }

    render() {
        let { columns } = this.props;
        console.log('111111111', columns)

        columns = [...Object.values(columns), this.opColumn];

        return (
            <div>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Nav />
                    </Sider>
                    <Content style={{ minHeight: 280 }}>

                        <Card bordered noHovering>
                            <div style={{ padding: "20px 0", borderBottom: "2px solid #00aaef", marginBottom: 15 }}>

                                <Row>
                                    <Col span={6}> <h2> 管理 - 学生列表</h2></Col>

                                    <Col span={6}>
                                        <Add onAdd={this.addCus} title='新增学生'
                                            columns={columns} /></Col>

                                </Row>

                            </div>

                            <Table columns={columns} bordered
                                dataSource={this.state.dataSource}
                            />
                        </Card>

                    </Content>
                </Layout>
            </div>

        );
    }
};

function mapStateToProps({ fields }) {
    let columns = Object.keys(fields).reduce((columns, id) => {
        return [...columns, fields[id]]
    }, [])

    return {
        columns
    }
}
export default connect(mapStateToProps)(Customers);