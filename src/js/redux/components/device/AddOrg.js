import React, { Component } from 'react';
import Nav from '../common/pc_nav';
import { Steps, Form, Input, Tooltip, Layout, Icon, Breadcrumb, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Modal, DatePicker } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { Content, Sider } = Layout;


class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            loading: false,
            visible: false,
            count: 3,
        };
    }


    showModal() {
        this.setState({
            visible: true,
        })
    }

    handleOk() {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }

    handleCancel() {
        this.setState({ visible: false })
    }

    handleSubmit(e) {
        e.preventDefault();
        let count = this.state.count + 1;
        this.setState({ count });


        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const comment = {
                    id: count,
                    key: count,
                    device_qty: '0',
                    org: values.orgname,
                    created: '2017-01-01 12:00',
                    detail: values.description
                }
                this.props.addOrg(comment)
            }
        });
        this.setState({ current: 0, visible: false, count: count })
    }


render() {
        const { getFieldDecorator } = this.props.form;
        const { current, visible } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 4 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
      const FormComponent = visible
        ?
            <Form>

                            <FormItem
                                {...formItemLayout}
                                label="设备路径 "
                                hasFeedback
                            >
                                {getFieldDecorator('orgname', {
                                    rules: [{ required: true, message: '请输入设备路径', whitespace: true }],
                                })(
                                    <Input />
                                    )}

                            </FormItem>

                            <FormItem {...formItemLayout} label="描述 " >
                                {getFieldDecorator('description'
                                )(
                                    <Input type="textarea" />
                                    )}
                            </FormItem>

                        </Form>
           : null;

        return (
            <div>
                <Button type="primary" onClick={this.showModal.bind(this)}>创建设备组</Button>
                <Modal
                    visible={visible}
                    title="创建设备组"
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    footer={[
                        <div className="steps-action">
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>确认</Button>
                            <Button type="default" onClick={this.handleCancel.bind(this)}>取消</Button>
                        </div>
                    ]}
                >

                    <div className="steps-content">
                      {FormComponent}
                    </div>
                </Modal>
            </div>
        );
    }
}


const WrappedRegistrationForm = Form.create()(RegistrationForm);

class AddOrg extends Component {

    render() {
        return (
            <WrappedRegistrationForm addOrg={this.props.addOrg} />
        )
    }
}

export default AddOrg






