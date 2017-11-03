import React, { Component } from 'react';
import {Button, Row, Col, Form, Input, Modal } from 'antd';
import $ from 'jquery';

export default class UploadFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        };
    }
    handleCancel() {
        this.setState({
            visible: false,
        });
    }
    upload() {
        var file = $("#file_sc").val();
        if (file == "") {
            $("#remind").html("请选择需要上传的图片！");
            setTimeout(function () { $("#remind").html("") }, 3000);
            return false;
        } else {
            $("#uploadBtn").html("请稍后...");
            function uploadinfo(uploadstatus) {
                $("#remind").html(uploadstatus);
                setTimeout(function () { $("#remind").html("") }, 3000);
                $("#uploadBtn").html("上传");
                $("#file_sc").val("");
            }
            $.ajax({
                url: 'http://119.23.132.97:80/upload',
                type: 'POST',
                cache: false,
                async: true,
                data: new FormData($('#form1')[0]),
                processData: false,
                contentType: false
            }).done(function (res) {
                //添加图片URL
                let token = sessionStorage.getItem("token");
                var urlParam = {
                    "header": {
                        "token": token
                    },
                    "data": {
                        "payload_type": "api",
                        "description": {
                            "type": "dev_man",
                            "id": "dm_dev_loc_add_new_background_pic",
                            "params": {
                                "file_name": res.data
                            }
                        }
                    }
                };
                $.ajax({
                    url: "http://119.23.132.97/device-manager/80",
                    type: "POST",
                    async: true,
                    cache: false,
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify(urlParam),
                    success: function (data) {
                        uploadinfo("上传成功！");
                    }
                });
                
            }).fail(function (res) {
                uploadinfo("上传失败，请稍后再试！");
            });
        }
    }
    render() {
        return (
            <div>

                <Modal
                    visible={this.state.visible}
                    title="上传背景图"
                    onOk={this.handleCancel.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    footer={[
                        <div className="steps-action">
                            <Button type="primary" onClick={this.upload.bind(this)} id="uploadBtn">上传</Button>
                            <Button type="default" onClick={this.handleCancel.bind(this)} >关闭</Button>
                        </div>
                    ]}
                >
                    <div style={{ fontWeight: "bold", padding: "10px" }}>
                        <Form id="form1" enctype="multipart/form-data">
                            <Input id="file_sc" name="file" type="file" style={{ border: "none" }} />
                        </Form>
                        <label style={{ padding: "10px", color: "red", fontWeight: "bold" }} id="remind"></label>
                    </div>
                </Modal>
            </div>
        )
    }
}