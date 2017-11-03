import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Button, Row, Col, Card, Icon, Form, Input, Modal, Tree, Layout, Table, Select, Popconfirm } from 'antd';
import Nav from '../common/pc_nav';
import { Link } from 'react-router';
import EditableCell from './edit'
import { addColl, delColl } from '../../actions/setting'

import { connect } from 'react-redux';


const { Content, Sider } = Layout;

const Panel = Collapse.Panel;
const FormItem = Form.Item;
const Option = Select.Option;

class AddColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
        this.open = this.open.bind(this)
    }

    open() {
        this.setState({ visible: true })
    }
    handleOk(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("handleOk",values);
                this.props.addCol(values);
            } else {
                console.log(err)
            }
        });
        this.setState({ visible: false });
        this.props.form.resetFields()
    }
    handleCancel() {
        this.setState({ visible: false });
    }

    render() {
        const { getFieldDecorator, getFieldProps } = this.props.form;
        const { visible } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        return (
            <div>
                <Button type="primary" 
                    onClick={this.open}>添加自定义字段</Button>
                <Modal
                    // title={this.props.param.ModalTitle}
                    title='新建字段'
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div className="steps-content">
                        <Form onSubmit={this.handleOk} className="login-form">
                            <FormItem
                                {...formItemLayout}
                                label="字段名称"
                                hasFeedback
                            >
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: '请输入' }],
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="字段 ID"
                                hasFeedback
                            >
                                {getFieldDecorator('id', {
                                    rules: [{ required: true, message: '请输入' }],
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="字段类型"
                            >
                                {getFieldDecorator('type')(
                                    <Select
                                        placeholder="选择"
                                    >
                                        <Option value="string">文本</Option>
                                        <Option value="number">数字</Option>
                                        <Option value="date">日期</Option>
                                        <Option value="textarea">文本域</Option>
                                    </Select>
                                )}
                            </FormItem>

                        </Form>
                    </div>
                </Modal>
            </div>
        );


    }
}

const TabForm = Form.create()(AddColumn);

class Add extends Component {
    render() {
        return (
            <TabForm addCol={this.props.addCol} />
        )
    }
}

class CustomerFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // dataSource: [{
            //     id: 'name',
            //     key: 'name',
            //     title: '姓名',
            //     type: 'string'
            // }, {
            //     id: 'tel',
            //     key: 'tel',
            //     title: '电话',
            //     type: 'number',
            // }],
        };

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
                    <a href="#" onClick={()=>{this.editCol(record)}} ><Icon type="edit" /> </a>
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
        console.log('is going to eidt ',record.id)
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

    onDelete(index) {
        this.props.dispatch(delColl(index));
        console.log(index)
    }

    render() {
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

                            <Col span={4}> <Add addCol={(value)=>this.addCol(value)} /> </Col>
                            <Col span={6}> <Link to='/am/test2'><h2> 查看效果</h2></Link> </Col>
                        </Row>
                        
                        </div>

                        <Table columns={this.columns} bordered
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