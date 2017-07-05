import React, { PropTypes, Component } from 'react';
import Nav from '../common/pc_nav';
import { Steps, Form, Input, Tooltip, Layout, Icon, Breadcrumb, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Modal, DatePicker } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { Content, Sider } = Layout;
//部门选择数据

const orgData = [{
    label: '深圳',
    value: '深圳',
    key: '0-0',
    children: [{
        label: '科技园',
        value: '/科技园',
        key: '0-0-1',
        children: [{
            label: '研发部',
            value: '/研发部',
            key: '0-0-0-1',
        }, {
            label: '生产部',
            value: '/生产部',
            key: '0-0-0-2',
        }, {
            label: '销售部',
            value: '/销售部',
            key: '0-0-0-3',
        }]
    }, {
        label: '海岸城',
        value: '/海岸城',
        key: '0-0-2',
    }]
}, {
    label: '北京',
    value: '北京',
    key: '0-1',
    children: [{
        label: 'A部门',
        value: '/A部门',
        key: '0-1-1',
    }, {
        label: 'B部门',
        value: '/B部门',
        key: '0-2-2',
        children: [{
            label: 'B1',
            value: '/B1',
            key: '0-2-2-1',
        }, {
            label: 'B2',
            value: '/B2',
            key: '0-2-2-2',
        }, {
            label: 'B3',
            value: '/B3',
            key: '0-2-2-3',
        }]
    }, {
        label: 'C部门',
        value: '/C部门',
        key: '0-2-3',
    }]
}];

const devicePosition = [{
    label: '生产线L1',
    value: '生产线L1',
    key: 'Line1',
}, {
    label: '仓库入口',
    value: '仓库入口',
    key: 'extrance',
}, {
    label: '仓库出口',
    value: '仓库出口',
    key: 'exit',
}];

//进度条数据
const Step = Steps.Step;
class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            loading: false,
            visible: false,
            current: 0,
            username: '',
            count: 0,
        };
    }

    //进度条相关函数
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    // 模态框相关函数
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
        console.log(count);
        const comment = {
            id: count,
            key: count,
            name: this.props.form.getFieldValue('userName'),
            description: '桌面式读写器',
            status: '正常',
            last_update_time: '2017-01-01 12:00',
            org: this.props.form.getFieldValue('org'),
            location: this.props.form.getFieldValue('position')
        }
        // alert("您已成功创建设备 "+this.props.form.getFieldValue('userName'));
        /*console.log(this.props.form.getFieldsValue())*/

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                this.props.addDevice(comment)
                this.setState({ current: 0, visible: false, count: count })


            }
        });

    }

    render() {
        const { getFieldDecorator, getFieldProps } = this.props.form;
        const { current, visible } = this.state;
        const config = {
            rules: [{ type: 'object', required: true, message: '请选择时间' }],
        };
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

        const steps = [{
            title: '第一步',
            content: '',
        }, {
            title: '第二步',
            content: '',
        }, {
            title: '完成',
            content: '',
        }];

        return (
            <div>
                <Button type="primary" onClick={this.showModal.bind(this)}>新增设备</Button>
                <Modal
                    visible={visible}
                    title="新增设备"
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    footer={[
                             <div className="steps-action">
                            {
                                this.state.current > 0
                                &&
                                <Button type="default" onClick={() => this.prev()}>                                    上一步
                                </Button>
                            }
                            {
                                this.state.current < steps.length - 1
                                &&
                                <Button type="primary" onClick={() => this.next()}>下一步</Button>
                            }
                            {
                                this.state.current < steps.length - 1
                                &&
                                <Button type="default" onClick={this.handleCancel.bind(this)}>取消</Button>
                            }
                            {
                                this.state.current === steps.length - 1
                                &&
                                <Button type="primary" onClick={this.handleSubmit.bind(this)}>确认</Button>
                            }

                        </div>                        
                    ]}
                >
                    <Steps current={current}>
                        {steps.map(item => <Step key={item.title} title={item.title} />)}
                    </Steps>
                    <div className="steps-content">
                        <Form>
                            {
                                this.state.current === steps.length - 3
                                &&
                                <FormItem
                                    {...formItemLayout}
                                    label={(
                                        <span>设备名称&nbsp;</span>
                                    )}
                                    hasFeedback
                                >
                                    {getFieldDecorator('nickname', {
                                        rules: [{ required: true, message: '请输入设备名称', whitespace: true }],
                                    })(
                                        <Input {...getFieldProps('userName') } />

                                        )}

                                </FormItem>

                            }

                            {
                                this.state.current === steps.length - 2
                                &&
                                <FormItem
                                    {...formItemLayout}
                                    label="所属部门"
                                >
                                    {getFieldDecorator('residence', {
                                        initialValue: ['请选择所属部门'],
                                        rules: [{ type: 'array', required: true, message: '请选择所属部门' }],
                                    })(
                                        <Cascader options={orgData} {...getFieldProps('org') } />
                                        )}
                                </FormItem>

                            }
                            {
                                this.state.current === steps.length - 1
                                &&

                                <FormItem
                                    {...formItemLayout}
                                    label="设备位置"
                                >
                                    {getFieldDecorator('po', {
                                        initialValue: ['a'],
                                        rules: [{ type: 'array', required: true, message: '请选择设备位置' }],
                                    })(
                                        <Cascader options={devicePosition} {...getFieldProps('position') } />
                                        )}
                                </FormItem>

                            }
                        </Form>
                    </div>
                </Modal>
            </div>
        );
    }
}


const WrappedRegistrationForm = Form.create()(RegistrationForm);
class WatchManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            operate_modal_visible: false,
        }
    }
    render() {
        return (
            <WrappedRegistrationForm addDevice={this.props.addDevice} />
        )
    }
}
WatchManage.propTypes = {
    addDevice: React.PropTypes.func
}
export default WatchManage