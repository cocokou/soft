import React, { Component } from 'react';
import { Collapse, Button, Row, Col, Icon, Form, Input, Modal } from 'antd';
import $ from 'jquery';
const Panel = Collapse.Panel;
const FormItem = Form.Item;

class AddTab extends React.Component {
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
                this.props.addMenu(values);
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
                <Button size="small" icon="plus-circle" 
                // type="primary" 
                onClick={this.open}>一级菜单</Button>
                    <Modal
                        // title={this.props.param.ModalTitle}
                        visible={this.state.visible}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                    >
                        <div className="steps-content">  
                            <Form onSubmit={this.handleOk} className="login-form">
{                                // <FormItem
                                //     {...formItemLayout}
                                //     label="父级菜单"
                                //     hasFeedback
                                // >
                                //     {getFieldDecorator('Parent', {
                                //         rules: [{ required: true, message: '请输入父级菜单' }],
                                //         initialValue: this.props.param.value,
                                //     })(
                                //         <Input placeholder="Parent" disabled={true} />
                                //         )}
                                // </FormItem>
}                                <FormItem
                                    {...formItemLayout}
                                    label="菜单名称"
                                    hasFeedback
                                >
                                    {getFieldDecorator('value', {
                                        rules: [{ required: true, message: '请输入菜单名称' }],
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="菜单id"
                                    hasFeedback
                                >
                                    {getFieldDecorator('id', {
                                        rules: [{ required: true, message: '菜单id' }],
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

const TabForm = Form.create()(AddTab);
export default class Add extends Component {
    
        render() {
            return (
                <TabForm addMenu={this.props.addMenu} />
            )
        }
    }