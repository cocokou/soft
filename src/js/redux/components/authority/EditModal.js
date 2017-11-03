import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Button, Row, Col, Card, Icon, Form, Input, Modal, Tree, Layout, Table, Select, Popconfirm } from 'antd';

const Panel = Collapse.Panel;
const FormItem = Form.Item;
const Option = Select.Option;

class EditSome extends Component {
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
                this.props.onEdit(values);
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
        let {columns} = this.props
        let fields = columns.slice(0,-1) //去掉操作列

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
        {console.log('this.props',this.props)}
        return (
            <div>
{                // <Button type="primary" 
                //     onClick={this.open}>{this.props.title}
                // </Button>
}                <a href="#" onClick={this.open}><Icon type="edit" /></a>

                <Modal
                    title={this.props.title}
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div className="steps-content">
                        <Form onSubmit={this.handleOk} className="login-form">

                        {
                            fields.map(c=>(
                                <FormItem key={c.key}
                                {...formItemLayout}
                                label= {c.title}
                                hasFeedback
                            >
                                {getFieldDecorator(c.key, {
                                    rules: [{ required: true, message: '请输入',  }],
                                })(
                                    <Input />
                                    )} 
                            </FormItem>
                            ))
                        }                    
                        </Form>
                    </div>
                </Modal>
            </div>
        );
    }
}

const CusForm = Form.create()(EditSome);

export default class EditModal extends Component {
    render() {
        return (
            <CusForm {...this.props} />
        )
    }
}