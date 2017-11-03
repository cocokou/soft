import React, { Component } from 'react';
import Nav from '../common/pc_nav';
import { Steps, Form, Input, Tooltip, Layout, Icon, Breadcrumb, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Modal } from 'antd';

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
                this.props.add(values);
            }

        });
        this.setState({ visible: false, count: count })
        this.props.form.resetFields()
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible } = this.state;

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

        let cols = this.props.getCol;

        return (
            <div >
                <Button onClick={this.showModal.bind(this)}>新增 </Button>
                <Button>修改</Button>
                <Button>删除</Button>
                <Modal
                    visible={visible}
                    title="新增菜单"
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    footer={[
                        <div className="steps-action">
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>确认</Button>
                            <Button type="default" onClick={this.handleCancel.bind(this)}>取消</Button>
                        </div>
                    ]}
                >

                    <Form>
                        {
                            //     cols.map((c)=> 
                            //     (
                            //         <FormItem {...formItemLayout} label={c.title} >
                            //         {getFieldDecorator(c.dataIndex
                            //         )(
                            //             <Input type="text" />
                            //             )}
                            //     </FormItem>

                            // ))
                        }


                        <FormItem {...formItemLayout} label="菜单名称 " >
                            {getFieldDecorator('name')(<Input />)}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="菜单url "
                            hasFeedback
                        >
                            {getFieldDecorator('url',
                                // {
                                //     rules: [{ required: true, message: 'required', whitespace: true }],
                                // }
                            )(
                                <Input />
                                )}

                        </FormItem>

                        <FormItem {...formItemLayout} label="父级菜单 " >
                            {getFieldDecorator('parent'
                            )(
                                <Input />
                                )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="菜单级别 " >
                            {getFieldDecorator('level'
                            )(
                                <Input />
                                )}
                        </FormItem>

                    </Form>
                </Modal>
            </div>
        );
    }
}


const WrappedRegistrationForm = Form.create()(RegistrationForm);

class AddUser extends Component {

    render() {
        return (
            <WrappedRegistrationForm getCol={this.props.getCols} add={this.props.add} />
        )
    }
}

export default AddUser
