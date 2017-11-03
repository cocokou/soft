import React, { Component } from 'react';
import { Collapse, Button, Row, Col, Icon, Form, Input, Modal } from 'antd';
import $ from 'jquery';
const Panel = Collapse.Panel;
const FormItem = Form.Item;


export default class PlaneModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        };
    }
    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    //添加城市平面
    addCityPlane(e) {
        e.preventDefault();
        // console.log(this.props.form.getFieldsValue());//提交的数据值
        this.props.form.validateFieldsAndScroll((err, value) => {
            if (!err) {
                // console.log(value.ID);//提交是的数据值           
                let token = sessionStorage.getItem("token");
                //添加平面
                var data = {
                    "header": {
                        "token": token
                    },
                    "data": {
                        "payload_type": "api",
                        "description": {
                            "type": "dev_man",
                            "id": "dm_dev_loc_create_plane",
                            "params": {
                                "name": value.MapName,
                                "parent_point": null,
                                "w": 600,
                                "l": 400
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
                            $("#cityNote").html("添加城市成功！");
                            setTimeout(function () {
                                $("#cityNote").html("");
                                window.location.reload();
                            }, 2000);
                        } else if (data.result.code == "7006") {
                            $("#cityNote").html("该名称城市已存在，请更换其他城市！");
                            setTimeout(function () {
                                $("#cityNote").html("");
                            }, 2000);
                        }
                    },
                    error: function (err) {
                        $("#cityNote").html("添加城市失败，请稍后再试！");
                        setTimeout(function () {
                            $("#cityNote").html("");                            
                        }, 2000);
                        console.log(err);
                    }
                });
            }
        });
    }
    handleCancel() {
        this.setState({
            visible: false,
        });
    }

    //添加下级平面
    addNexPlane(e) {
        e.preventDefault();
        // console.log(this.props.form.getFieldsValue());//提交的数据值
        this.props.form.validateFieldsAndScroll((err, value) => {
            if (!err) {
                // console.log(value.ID);//提交是的数据值           
                //先添加点，然后在该点添加平面
                let token = sessionStorage.getItem("token");
                var pointdata = {
                    "header": {
                        "token": token
                    },
                    "data": {
                        "payload_type": "api",
                        "description": {
                            "type": "dev_man",
                            "id": "dm_dev_loc_add_point_to_plane",
                            "params": {
                                "plane_id": value.planeID,
                                "x": value.planePosition.split(",")[0],
                                "y": value.planePosition.split(",")[1],
                                "pnt_name": value.MapName + "点"
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
                    data: JSON.stringify(pointdata),
                    success: function (data) {
                        if (data.result.code == "0") {
                            //添加平面
                            var planedata = {
                                "header": {
                                    "token": token
                                },
                                "data": {
                                    "payload_type": "api",
                                    "description": {
                                        "type": "dev_man",
                                        "id": "dm_dev_loc_create_plane",
                                        "params": {
                                            "name": value.MapName,
                                            "parent_point": data.data[0].id,
                                            "w": 600,
                                            "l": 400
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
                                data: JSON.stringify(planedata),
                                success: function (data) {
                                    if (data.result.code == "0") {
                                        $("#nextNote").html("添加平面成功！");
                                        setTimeout(function () {
                                            $("#nextNote").html("");
                                            window.location.reload();
                                        }, 2000);
                                    } else if (data.result.code == "7006") {
                                        $("#nextNote").html("该平面名称已存在，请更换其他名称！");
                                        setTimeout(function () {
                                            $("#nextNote").html("");
                                        }, 2000);
                                    }

                                },
                                error: function (err) {
                                    $("#nextNote").html("添加平面失败，请稍后再试！");
                                    setTimeout(function () {
                                        $("#nextNote").html("");                                        
                                    }, 2000);
                                    console.log(err);
                                }
                            });
                        } else {
                            $("#nextNote").html("添加平面失败，请稍后再试！");
                            setTimeout(function () {
                                $("#nextNote").html("");
                            }, 2000);
                        }

                    }
                });


                this.setState({
                    visible: false,
                });

            }
        });
    }
    //查看平面
    searchPlane(pointData) {
        this.props.parentFunction(pointData[0]);//把查看当前平面的数据通过调用父组件positionContent的parentFunction方法，传递过去
        this.setState({
            visible: false,
        });

    }
    //修改平面
    changePlane(pointData) {

    }
    //删除平面
    deletePlane(pointData) {
        let token = sessionStorage.getItem("token");
        //删除面
        let pointparam = {
            "header": {
                "token": token
            },
            "data": {
                "payload_type": "api",
                "description": {
                    "type": "dev_man",
                    "id": "dm_dev_loc_remove_plane",
                    "params": {
                        "plane_id": pointData[0].id
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
            data: JSON.stringify(pointparam),
            success: function (data) {
                if (data.result.code == "0") {
                    $("#infoNote").html(pointData[0].name+"删除成功！");
                    setTimeout(function () {
                        $("#infoNote").html("");
                        window.location.reload();
                    }, 2000);
                }else if(data.result.code == "7013"){
                    $("#infoNote").html("该平面内部存在平面或者设备，请先前去删除！");
                    setTimeout(function () {
                        $("#infoNote").html("");                        
                    }, 2000);
                }

            },
            error: function (err) {
                console.log(err);
                $("#infoNote").html("删除失败，请稍后再试！");
                setTimeout(function () {
                    $("#infoNote").html("");
                }, 2000);
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
        if (this.props.param.ModalTitle == "addCityPlane") {
            return (
                <div>
                    <Modal
                        title="添加平面"
                        visible={this.state.visible}
                        onOk={this.handleCancel.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                        footer={[
                            <div className="steps-action">
                                <Button type="primary" onClick={this.addCityPlane.bind(this)}>确定</Button>
                                <Button type="default" onClick={this.handleCancel.bind(this)}>取消</Button>
                            </div>
                        ]}
                    >
                        <div className="steps-content">
                            <Form onSubmit={this.addCityPlane} className="login-form">
                                <FormItem
                                    {...formItemLayout}
                                    label="名称"
                                    hasFeedback
                                >
                                    {getFieldDecorator('MapName', {
                                        rules: [{ required: true, message: '请输入平面名称!' }],
                                    })(
                                        <Input placeholder="MapName" />
                                        )}
                                </FormItem>
                            </Form>
                        </div>
                        <label id="cityNote"></label>
                    </Modal>
                </div>
            );
        } else if (this.props.param.ModalTitle == "addNextPlane") {
            let x_zhou = this.props.point.split(",")[0];
            let y_zhou = this.props.point.split(",")[1];
            if (0 < x_zhou && x_zhou < 580 && 0 < y_zhou && y_zhou < 374) {//判断该点是否在平面范围内,580=600-20,20为ICON宽,374=400-26,26为ICON高            
                //判断是添加点/加面还是查询面
                if (!isNaN(this.props.param.pointData.id)) {
                    //获取点上的面
                    let token = sessionStorage.getItem("token");
                    let pointData;
                    var data = {
                        "header": {
                            "token": token
                        },
                        "data": {
                            "payload_type": "api",
                            "description": {
                                "type": "dev_man",
                                "id": "dm_dev_loc_get_my_plane",
                                "params": {
                                    "parent_point_id": this.props.param.pointData.id
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
                                pointData = data.data;
                            } else {
                                alert("获取信息失败，请稍后再试！");
                            }

                        },
                        error: function (err) {
                            alert(JSON.stringify(err));
                            pointData = [];
                        }
                    });
                    if (0 < pointData.length) {
                        return (
                            <div>
                                <Modal
                                    title="查看平面"
                                    visible={this.state.visible}
                                    onOk={this.handleCancel.bind(this)}
                                    onCancel={this.handleCancel.bind(this)}
                                    footer={[
                                        <div className="steps-action">
                                            <Button type="primary" onClick={this.searchPlane.bind(this, pointData)}>查看</Button>
                                            {/* <Button type="default" onClick={this.changePlane.bind(this, pointData)}>修改</Button> */}
                                            <Button type="default" onClick={this.deletePlane.bind(this, pointData)}>删除</Button>
                                            <Button type="default" onClick={this.handleCancel.bind(this)}>关闭</Button>

                                        </div>
                                    ]}
                                >
                                    <div className="steps-content">
                                        <Form className="login-form">
                                            <FormItem
                                                {...formItemLayout}
                                                label="名称"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('MapName', {
                                                    rules: [{ required: true, message: '' }],
                                                    initialValue: pointData[0].name,
                                                })(
                                                    <Input placeholder="MapName" disabled={true} />
                                                    )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="平面ID"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('MapId', {
                                                    rules: [{ required: true, message: '' }],
                                                    initialValue: pointData[0].id,
                                                })(
                                                    <Input placeholder="MapId" disabled={true} />
                                                    )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="点坐标"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('planePosition', {
                                                    rules: [{ required: true, message: '' }],
                                                    initialValue: this.props.point,
                                                })(
                                                    <Input disabled={true} />
                                                    )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="父平面ID"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('planeID', {
                                                    rules: [{ required: true, message: '' }],
                                                    initialValue: this.props.planeData.id,
                                                })(
                                                    <Input disabled={true} />
                                                    )}
                                            </FormItem>
                                        </Form>
                                    </div>
                                    <label id="infoNote"></label>
                                </Modal>
                            </div>
                        );
                    } else {
                        return (<h1></h1>);
                    }

                } else {
                    return (
                        <div>
                            <Modal
                                title="添加平面"
                                visible={this.state.visible}
                                onOk={this.handleCancel.bind(this)}
                                onCancel={this.handleCancel.bind(this)}
                                footer={[
                                    <div className="steps-action">
                                        <Button type="primary" onClick={this.addNexPlane.bind(this)}>添加</Button>
                                        <Button type="default" onClick={this.handleCancel.bind(this)}>取消</Button>
                                    </div>
                                ]}
                            >
                                <div className="steps-content">
                                    <Form onSubmit={this.addNexPlane} className="login-form">
                                        <FormItem
                                            {...formItemLayout}
                                            label="名称"
                                            hasFeedback
                                        >
                                            {getFieldDecorator('MapName', {
                                                rules: [{ required: true, message: '请输入平面名称!' }],
                                            })(
                                                <Input placeholder="MapName" />
                                                )}
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout}
                                            label="点坐标"
                                            hasFeedback
                                        >
                                            {getFieldDecorator('planePosition', {
                                                rules: [{ required: true, message: '' }],
                                                initialValue: this.props.point,
                                            })(
                                                <Input disabled={true} />
                                                )}
                                        </FormItem>
                                        <FormItem
                                            {...formItemLayout}
                                            label="父平面ID"
                                            hasFeedback
                                        >
                                            {getFieldDecorator('planeID', {
                                                rules: [{ required: true, message: '' }],
                                                initialValue: this.props.planeData.id,
                                            })(
                                                <Input disabled={true} />
                                                )}
                                        </FormItem>
                                    </Form>
                                </div>
                                <label id="nextNote"></label>
                            </Modal>
                        </div>
                    );
                }


            } else {
                return (
                    <div>

                        <Modal
                            visible={visible}
                            title="添加平面"
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
}


