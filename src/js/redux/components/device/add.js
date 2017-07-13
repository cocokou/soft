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
        value: '科技园',
        key: '0-0-1',
        children: [{
            label: '研发部',
            value: '研发部',
            key: '0-0-0-1',
        }, {
            label: '生产部',
            value: '生产部',
            key: '0-0-0-2',
        }, {
            label: '销售部',
            value: '销售部',
            key: '0-0-0-3',
        }]
    }, {
        label: '海岸城',
        value: '海岸城',
        key: '0-0-2',
    }]
}, {
    label: '北京',
    value: '北京',
    key: '0-1',
    children: [{
        label: '科技园',
        value: '科技园',
        key: '0-2-2',
        children: [{
            label: '研发部',
            value: '研发部',
            key: '0-2-2-1',
        }, {
            label: '生产部',
            value: '生产部',
            key: '0-2-2-2',
        }, {
            label: '销售部',
            value: '销售部',
            key: '0-2-2-3',
        }]
    }, {
        label: 'A部门',
        value: 'A部门',
        key: '0-1-1',
    },
    {
        label: 'B部门',
        value: 'B部门',
        key: '0-2-3',
    }]
}];


const typeData = [{
    label: "桌面式",
    value: '桌面式',
    key: '0-0-5',
}, {
    label: "固定式",
    value: '固定式',
    key: '0-0-6',
}, {
    label: "多通道",
    value: '多通道',
    key: '0-0-7',
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
            count: 12,
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

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                const comment = {
                    id: count,
                    key: count,
                    name: values.name,
                    status: '正常',
                    type: values.type,
                    org: values.org.join('')
  
                }
                this.props.addDevice(comment)
                console.log(values)
            }
        });
        this.setState({ current: 0, visible: false, count: count })
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { current, visible } = this.state;

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
                             
                                <Button type="default" onClick={this.handleCancel.bind(this)}>取消</Button>
                                                   
                                <Button type="primary" onClick={this.handleSubmit.bind(this)}>确认</Button>
                            
                        </div>
                    ]}
                >
            
                    <div className="steps-content">
                        <Form>
                          
                                <FormItem
                                    {...formItemLayout}
                                    label={(
                                        <span>设备名称&nbsp;</span>
                                    )}
                                    hasFeedback
                                >
                                    {getFieldDecorator('name', {
                                      rules: [{ required: true, message: '请输入' }],
                                    })(
                                        <Input />

                                        )}

                                </FormItem>

                        
                                <FormItem
                                    {...formItemLayout}
                                    label="所属部门"
                                >
                                    {getFieldDecorator('org', {
                                        rules: [{ type: 'array', required: true, message: '请选择所属部门' }],
                                    })(
                                        <Cascader options={orgData} />
                                        )}
                                </FormItem>

                     

                                <FormItem
                                    {...formItemLayout}
                                    label="设备类型"
                                >
                                    {getFieldDecorator('type', {
                                        rules: [{ required: true, message: '请选择设备类型' }],
                                    })(
                                        <Cascader options={typeData} />
                                        )}
                                </FormItem>

                        </Form>
                    </div>
                </Modal>
            </div>
        );
    }
}


const WrappedRegistrationForm = Form.create()(RegistrationForm);
class CreateDevice extends React.Component {
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

export default CreateDevice