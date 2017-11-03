import React, { PropTypes, Component } from 'react';
import {Form,Input,Radio, Row,Col,Button,Modal} from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
let mapList = [];

export default class MapModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: true,
            value: "",
        };
        //获取平面图列表
        let token = sessionStorage.getItem("token");
        var data = {
            "header": {
                "token": token
            },
            "data": {
                "payload_type": "api",
                "description": {
                    "type": "dev_man",
                    "id": "dm_dev_loc_list_pic",
                    "params": {
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
               mapList = data.data;                     
                
            }            
        });
    }
    onChange(e) {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
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
    //提交
    handleSubmit(e) {
        e.preventDefault();
        //提交背景图
        let token = sessionStorage.getItem("token");
        var data = {
            "header": {
                "token": token
            },
            "data": {
                "payload_type":"api",
                "description":{
                    "type":"dev_man",
                    "id":"dm_dev_loc_set_plane_image",
                    "params":{
                        "plane_id":this.props.planeData.id,
                        "image_name":this.state.value
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
               window.location.reload();
            }
        });
    }

    render() {
        const { visible } = this.state;
        const loop = data => data.map((item) => {
            return (
                <div key={item.name} style={{borderBottom:"1px dotted #ccc",paddingTop:"3px"}}><table><tbody><tr><td><Radio value={item.name}></Radio></td><td><img src={item.name} style={{border:"1px dotted #ccc",width:"100px", height:"60px"}}/></td></tr></tbody></table></div>
            );
        });
        return (
            <div>
                <Modal
                    visible={visible}
                    title="设置/修改平面图"
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    footer={[
                        <div className="steps-action">
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
                            <Button type="default" onClick={this.handleCancel.bind(this)}>取消</Button>
                        </div>
                    ]}
                >
                    <RadioGroup onChange={this.onChange.bind(this)} value={this.state.value} style={{maxHeight:"350px",minWidth:"100%", overflowY:"scroll",overflowX:"hidden"}}>
                        {loop(mapList)}
                    </RadioGroup>
                </Modal>
            </div>
        );
    }
}
