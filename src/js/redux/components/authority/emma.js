
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Button, Row, Col, Icon, Form, Input, Modal, Tree, Layout,Table } from 'antd';
import Nav from '../common/pc_nav';
// import Add from './test'
const { Content, Sider } = Layout;

import $ from 'jquery';

const Panel = Collapse.Panel;
const FormItem = Form.Item;

class AddAsset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
        this.open = this.open.bind(this)
    }

 open(){
     this.setState({visible:true})
 }
    handleOk(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.addProduct(values);
            }
        });
        this.setState({ visible: false });
        this.props.form.resetFields()
    }
    handleCancel() {
        this.setState({  visible: false  });
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
                <Button  // type="primary" 
                onClick={this.open}>新增</Button>
                    <Modal
                        // title={this.props.param.ModalTitle}
                        visible={this.state.visible}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                    >
                        <div className="steps-content">  
                            <Form onSubmit={this.handleOk} className="login-form">

                              <FormItem
                                    {...formItemLayout}
                                    label="物资编码"
                                    hasFeedback
                                >
                                    {getFieldDecorator('id', {
                                        rules: [{ required: true, message: '请输入菜单名称' }],
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="物资名称"
                                    hasFeedback
                                >
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '菜单id' }],
                                    })(
                                        <Input  />
                                        )}
                                </FormItem>
                              <FormItem
                                    {...formItemLayout}
                                    label="型号类别"
                                    hasFeedback
                                >
                                    {getFieldDecorator('size', {
                                        rules: [{ message: '请输入菜单名称' }],
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="商标品牌"
                                    hasFeedback
                                >
                                    {getFieldDecorator('brand', {
                                        rules: [{  message: '菜单id' }],
                                    })(
                                        <Input  />
                                        )}
                                </FormItem>
                    
                            </Form>
                        </div>
                    </Modal>
                </div>
            );
        

    }
}

const TabForm = Form.create()(AddAsset);
class Add extends Component {
    
        render() {
            return (
                <TabForm addProduct={this.props.addProduct} />
            )
        }
    }


 export default class Asset extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                dataSource:[{
                    id: '1',
                    key: '1',
                    name: 'MUG',
                  }, {
                    id: '2',
                    key: '2',
                    name: 'CUP',
                  }],
                values: {},
                name:'',
                id:''
            }
            this.columns = [{
                title: '物资编码',
                dataIndex: 'id',
                key: 'id',
              } , {
                title: '物资名称',
                dataIndex: 'name',
                key: 'name',
              }, {
                title: '商品品牌',
                dataIndex: 'brand',
                key: 'brand',
              },{
                title: '规格型号',
                dataIndex: 'size',
                key: 'size',
              }, {
                title: '材质',
                dataIndex: 'material',
                key: 'material',
              }, {
                title: '生产厂家',
                dataIndex: 'manufacturer',
                key: 'manufacturer',
              }
            ];
            // this.handleChange = this.handleChange.bind(this)
            this.handleSubmit = this.handleSubmit.bind(this)
            this.addProduct = this.addProduct.bind(this)
        }
    
        // handleChange(e) {
        //     const values = {};
        //     values[e.target.id] = e.target.value;
        //     this.setState({ values: { ...this.state.values, values } })
        // }
        handleSubmit(event) {
            console.log('now ', this.state.name,this.state.id )
            event.preventDefault();
        }
    
        addProduct(values) {
            
                    let myData = this.state.dataSource;
            
                    let tab = {
                        id: values.id,
                        name: values.name,
                        key: values.id,
                        size: values.size,
                        brand: values.brand,
                    };
                    myData.push(tab);
                    this.setState({ dataSource:myData });
                }
        render() {
    
    
            return (
                <div>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Nav />
                        </Sider>
                        <Content style={{ minHeight: 280 }}>
    
                            <div style={{ paddingLeft: 20 }}>
    
                                <div style={{ padding: "10px 0", borderBottom: "2px solid #00aaef", marginBottom:15}}>
                                
                                    <Add addProduct={this.addProduct} /> 
                
                                </div>
                                
                                <Table columns={this.columns} bordered
                                dataSource={this.state.dataSource}
                              />
    
   
                            </div>
    
                        </Content>
                    </Layout>
                </div>
    
            );
        }
};