import React, { PropTypes, Component } from 'react';
import {Form, Input, Tooltip,Row, Col,Button,  Modal} from 'antd';
const FormItem = Form.Item;


export default class EquimentModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: true,
        };
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
    //修改设备信息
    changeEquiment() {
       
    }
    //删除设备
    deleteEquiment(equimentData) {
        let token = sessionStorage.getItem("token");
        let equimentdata ={
            "header": {
              "token":token
            },
            "data":{
                        "payload_type":"api",
                      "description":{
                          "type":"dev_man",
                          "id":"dm_dev_loc_remove_device",
                          "params": {
                                  "device_point": equimentData.id
                              }
                      }	
              }
          }
        $.ajax({
            url: "http://119.23.132.97/device-manager/80",
            type: "POST",
            async: false,
            cache: false,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(equimentdata),
            success: function (data) {
                if (data.result.code == "0") {
                    $("#noteinfo").html(equimentData.name+"删除成功！");
                    setTimeout(function () {
                        $("#noteinfo").html("");
                        window.location.reload();
                    }, 2000);
                }

            },
            error: function (err) {
                $("#noteinfo").html(equimentData.name+"删除失败，请稍后再试！");
                setTimeout(function () {
                    $("#noteinfo").html("");
                }, 2000);
                console.log(err);
            }
        });
    }
    //添加设备
    handleSubmit(e) {
        e.preventDefault();
        // console.log(this.props.form.getFieldsValue());//提交的数据值
        this.props.form.validateFieldsAndScroll((err, value) => {
            if (!err) {
                console.log(value);//提交是的数据值
                let token = sessionStorage.getItem("token");
                var data = {
                    "header": {
                        "token": token
                    },
                    "data": {
                        "payload_type": "api",
                        "description": {
                            "type": "dev_man",
                            "id": "dm_dev_loc_add_point_and_device_to_plain",
                            "params": {
                                "plain_id": value.planeId,
                                "x": value.equimentPosition.split(",")[0],
                                "y": value.equimentPosition.split(",")[1],
                                "pnt_name": value.equimentName,
                                "dev_id": 10005
                            }
                        }
                    }
                };
                $.ajax({
                    url: "http://119.23.132.97/device-manager/80",
                    type: "POST",
                    async: false,
                    cache: false,
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify(data),
                    success: function (data) {
                        if (data.result.code == "0") {
                            $("#note").html("设备添加成功！");
                            setTimeout(function () {
                                $("#note").html("");
                                window.location.reload();
                            }, 2000);
                        }

                    },
                    error: function (err) {
                        $("#note").html("设备添加失败，请稍后再试！");
                        setTimeout(function () {
                            $("#note").html("");
                        }, 2000);
                        console.log(err);
                    }
                });
            }
        });

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
        let x_zhou = this.props.param.split(",")[0];
        let y_zhou = this.props.param.split(",")[1];
        if (0 < x_zhou && x_zhou < 580 && 0 < y_zhou && y_zhou < 374) {//580=600-20,20为ICON宽,374=400-26,26为ICON高  
            if (this.props.equimentData.name != "") {
                return (
                    <div>
                        <Modal
                            visible={visible}
                            title="设备信息"
                            onOk={this.handleOk.bind(this)}
                            onCancel={this.handleCancel.bind(this)}
                            footer={[
                                <div className="steps-action">
                                    <Button type="primary" onClick={this.handleCancel.bind(this)}>关闭</Button>
                                    {/* <Button type="default" onClick={this.changeEquiment.bind(this)}>修改</Button> */}
                                    <Button type="default" onClick={this.deleteEquiment.bind(this,this.props.equimentData)}>删除</Button>
                                </div>
                            ]}
                        >
                            <div className="steps-content">
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <FormItem
                                        {...formItemLayout}
                                        label="设备名称"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('equimentName', {
                                            rules: [{ required: true, message: '请输入设备名称!' }],
                                            initialValue: this.props.equimentData.name,
                                        })(
                                            <Input placeholder="equimentName" disabled={true} />
                                            )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="设备类型"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('equimentType', {
                                            rules: [{ required: true, message: '请输入设备类型!' }],
                                            initialValue: this.props.equimentData.type,
                                        })(
                                            <Input placeholder="equimentType" disabled={true} />
                                            )}
                                    </FormItem>                                   
                                    <FormItem
                                        {...formItemLayout}
                                        label="平面ID"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('planeId', {
                                            rules: [{ required: true, message: '' }],
                                            initialValue: this.props.planeData.id,
                                        })(
                                            <Input disabled={true} />
                                            )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="设备坐标"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('equimentPosition', {
                                            rules: [{ required: true, message: '' }],
                                            initialValue: this.props.param,
                                        })(
                                            <Input disabled={true} />
                                            )}
                                    </FormItem>
                                </Form>
                            </div>
                            <label id="noteinfo"></label>
                        </Modal>
                    </div>
                );
            } else {
                return (
                    <div>
                        <Modal
                            visible={visible}
                            title="添加设备"
                            onOk={this.handleOk.bind(this)}
                            onCancel={this.handleCancel.bind(this)}
                            footer={[
                                <div className="steps-action">
                                    <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
                                    <Button type="default" onClick={this.handleCancel.bind(this)}>取消</Button>
                                </div>
                            ]}
                        >
                            <div className="steps-content">
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <FormItem
                                        {...formItemLayout}
                                        label="设备名称"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('equimentName', {
                                            rules: [{ required: true, message: '请输入设备名称!' }],
                                        })(
                                            <Input placeholder="equimentName" />
                                            )}
                                    </FormItem>                                   
                                    <FormItem
                                        {...formItemLayout}
                                        label="平面ID"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('planeId', {
                                            rules: [{ required: true, message: '' }],
                                            initialValue: this.props.planeData.id,
                                        })(
                                            <Input disabled={true} />
                                            )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="设备坐标"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('equimentPosition', {
                                            rules: [{ required: true, message: '' }],
                                            initialValue: this.props.param,
                                        })(
                                            <Input disabled={true} />
                                            )}
                                    </FormItem>
                                </Form>
                            </div>
                            <label id="note"></label>
                        </Modal>
                    </div>
                );
            }

        } else {
            return (
                <div>
                    <Modal
                        visible={visible}
                        title="添加设备"
                        onOk={this.handleCancel.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                        footer={[
                            <div className="steps-action">
                                {/* <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button> */}
                                <Button type="default" onClick={this.handleCancel.bind(this)}>确定</Button>
                            </div>
                        ]}
                    >
                        <div>
                            请拖动到边框内<label style={{ color: "#ff6902", fontWeight: "bold" }}>平面区域</label>进行添加！
                        </div>
                    </Modal>
                </div>
            );
        }

    }
}
