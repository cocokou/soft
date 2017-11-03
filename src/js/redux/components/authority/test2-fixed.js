import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Button, Row, Col, Card, Icon, Form, Input, Modal, Tree, Layout, Table, Select, Popconfirm } from 'antd';
import Nav from '../common/pc_nav';

import { connect } from 'react-redux';


const { Content, Sider } = Layout;

const Panel = Collapse.Panel;
const FormItem = Form.Item;
const Option = Select.Option;


class AddCustomer extends React.Component {
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
                this.props.addCus(values);
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
                    onClick={this.open}>新增客户</Button>
                <Modal
                    // title={this.props.param.ModalTitle}
                    title='新增客户'
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div className="steps-content">
                        <Form onSubmit={this.handleOk} className="login-form">
                            <FormItem
                                {...formItemLayout}
                                label="客户名称"
                                hasFeedback
                            >
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: 'name' }],
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="客户电话"
                                hasFeedback
                            >
                                {getFieldDecorator('id', {
                                    rules: [{ required: true, message: '请输入' }],
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                      

                        </Form>
                    </div>
                </Modal>
            </div>
        );


    }
}

const CusForm = Form.create()(AddCustomer);

class Add extends Component {
    render() {
        return (
            <CusForm addCus={this.props.addCus} />
        )
    }
}

class Customers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [{
                name: '客户A',
                id: '123',
                key: 'name',
                type: '文本'
            }, {
                name: '客户B',
                id: '456',
                key: 'tel',
                type: '数字',
            }]
        };

        this.opColumn = {
            title: '操作',
            key: 'action',
    
            render: (text, record, index) => (
                <span>
                    <a href="#"><Icon type="edit" /> </a>
                    <span className="ant-divider" />
    
                    <Popconfirm title="确定删除？" onConfirm={this.onDelete.bind(this, index)} placement="leftBottom" okText="删除" cancelText="取消">
                        <a href="#"> <Icon type="delete" /></a>
                    </Popconfirm>
                </span>
            ),
        };
       this.columns = this.state.cols
       this.addCus = this.addCus.bind(this)
       this.onDelete = this.onDelete.bind(this);
   }

   addCus(values) {
       let myData = this.state.dataSource;
       let customer = {
           id: values.id,
           name: values.name,
           key: values.id,
       };
       myData.push(customer);
       this.setState({ dataSource: myData });
   }

    onDelete(index) {
        const dataSource = [...this.state.dataSource];
        console.log('index', index)
        dataSource.splice(index, 1);
        this.setState({ dataSource });
    }

    render() {

    let {columns} = this.props;
    columns = [...Object.values(columns),this.opColumn];
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
                                    <Col span={6}> <h2> 我的 - 客户</h2></Col>
                                    <Col span={6}> <Add addCus={this.addCus} /></Col>
                                 
                                </Row>
                              
                            </div>

                            <Table columns={columns} bordered
                            // <Table columns={this.columns} bordered
                                dataSource={this.state.dataSource}
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
export default connect(mapStateToProps)(Customers);