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
            record: this.props.record,
        };
        this.open = this.open.bind(this)
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.visible !== this.state.visible) {
    //         this.setState({ visible: nextProps.visible });
    //         if (nextProps.visible) {
    //             this.cacheValue = this.state.value;
    //         }
    //     }
    //     if (nextProps.status && nextProps.status !== this.props.status) {
    //         if (nextProps.status === 'save') {
    //             this.props.onChange(this.state.value);
    //         } else if (nextProps.status === 'cancel') {
    //             this.setState({ value: this.cacheValue });
    //             this.props.onChange(this.cacheValue);
    //         }
    //     }
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.visible !== this.state.visible ||
    //         nextState.value !== this.state.value;
    // }

    open() {
        this.setState({ visible: true })
    }
    handleOk(e) {
        e.preventDefault();
        let {record} = this.props
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("handleOk",values);
                console.log('hanleOK.this.record',record)
                this.props.onEdit(values, record);
            } else {
                console.log(err)
            }
        });
        this.setState({ visible: false });
        // this.props.form.resetFields()
    }
    handleCancel() {
        this.setState({ visible: false });
    }

    render() {
        let {columns} = this.props
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

        let record = this.props.record
        return (
            <div>
             <a href="#" onClick={this.open}><Icon type="edit" /></a>
                <Modal
                    title={this.props.title}
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <div className="steps-content">
                        <Form onSubmit={this.handleOk} className="login-form">

                        {
                            columns.map(c=>(
                                <FormItem key={c.key}
                                {...formItemLayout}
                                label= {c.title}
                                hasFeedback
                            >
                                {getFieldDecorator(c.key, {
                                    initialValue: record[c.key],
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