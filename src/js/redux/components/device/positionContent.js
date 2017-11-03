import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Input, Tooltip, Button, Table, Row, Col, Form, Modal, Tree } from 'antd';
import MapModel from './SetBGMapModel';
import EquimentModel from './EquimentModel';
import PlaneModel from './PlaneModel';

const Search = Input.Search;

export default class PositionManagerContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            planedata: this.props.planedata,
        };
    }
   
    //设置背景图
    setBGMap(planedata) {
        let AfterMapModel = Form.create()(MapModel);
        ReactDOM.render(
            <div>
                <AfterMapModel planeData={planedata} />
            </div>,
            document.getElementById('popModel')
        );
    }
    //删除当前平面
    deletePlane(planedata){
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
                       "plane_id": planedata.id
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
                  alert("删除成功！");
                  window.location.reload();
               }else if(data.result.code == "7013"){
                   alert("该平面内部存在平面或者设备，请先前去删除！");                   
               }
           },
           error: function (err) {
               alert("删除失败，请稍后再试！");
           }
       });
    }
    //获取点击点坐标
    getPosition(param) {
        //设备相对平面坐标
        let parentPosition = divPosition("roomMap");//背景图片div
        let childPosition = divPosition(param.id);
        let x_IconToRoom = (parseInt(childPosition.x_zhou) - parseInt(parentPosition.x_zhou));//设备相对平面X轴
        let y_IconToRoom = (parseInt(childPosition.y_zhou) - parseInt(parentPosition.y_zhou));//设备相对平面Y轴
        function divPosition(id) {
            let positions = {};
            let odiv = document.getElementById(id);
            let toLeft = odiv.getBoundingClientRect().left;
            let toTop = odiv.getBoundingClientRect().top;
            positions["x_zhou"] = toLeft;
            positions["y_zhou"] = toTop;
            return positions;
        }
        return x_IconToRoom + "," + y_IconToRoom;

    }
    //平面点拖动方法
    dragAndDrog(param) {
        let panduan=true;
        if( panduan==true){
            let div = document.getElementById(param.id);
            let dragFlag = false;
            let x, y;
    
            div.onmousedown = function (e) {
                e = e || window.event;
                x = e.clientX - div.offsetLeft;
                y = e.clientY - div.offsetTop;
                dragFlag = true;
                //用于火狐阻止拖动图片打开新窗口,但性能降低
                // e.preventDefault();
                // e.stopPropagation();
            };
    
            document.onmousemove = function (e) {
                if (dragFlag) {
                    e = e || window.event;
                    div.style.left = e.clientX - x + "px";
                    div.style.top = e.clientY - y + "px";
                    //用于ie阻止拖动图片打开新窗口
                    e.cancelBubble=true;
                    e.returnValue = false;
                }
            };
    
            document.onmouseup = function (e) {
                dragFlag = false;
            };
            
        }
       
    }
    //点击Icon设备选项
    equimentClick(param, planedata) {
        let position = this.getPosition(param);//点击处坐标
        let AfterEquimentModel = Form.create()(EquimentModel);//用Form.create()包装过的组件会自带 this.props.form 属性，直接传给 Form 即可
        ReactDOM.render(
            <div>
                <AfterEquimentModel param={position} equimentData={param} planeData={planedata} />
            </div>,
            document.getElementById('popModel')
        );
    }
    //父组件方法
    parentFunction(item) {//item为子组件PlaneModel调用该方法传递过来的参数
        this.setState({
            planedata: item
        })
    }
    //点击Icon平面选项
    planeClick(param, planedata) {
        let position = this.getPosition(param);
        let param2 = {
            ModalTitle: "addNextPlane",
            pointData: param
        }
        let AfterAddPlaneModel = Form.create()(PlaneModel);
        ReactDOM.render(
            <div>
                <AfterAddPlaneModel param={param2} point={position} planeData={planedata} parentFunction={this.parentFunction.bind(this)} />
            </div>,
            document.getElementById('popModel')
        );
    }
    render() {
        let pointList;
        let planedata = this.state.planedata;
        //判断背景图片的宽高比，进行图片展示的调整，防止图片变形
        setTimeout(function () {
            var img = new Image();
            img.src = planedata.image;
            let wd_hg = img.width / img.height;
            let real_w_h = 600 / 400;
            if (wd_hg > real_w_h) {//width较大
                $("#bg_img").css({ "width": "598px", "height": "auto" });
                $("#bg_img").attr("src", planedata.image);
                $("#bg_img2").hide();
            } else {//一致或height较大
                $("#bg_img").css({ "width": "auto", "height": "398px" });
                $("#bg_img").attr("src", planedata.image);
                $("#bg_img2").hide();
            }//宽和高减2px，因为有2px的边框
        }, 500);//延迟一秒是为了让图片加载完才能获取其属性

        //获取平面上的点
        let token = sessionStorage.getItem("token");
        var data = {
            "header": {
                "token": token
            },
            "data": {
                "payload_type": "api",
                "description": {
                    "type": "dev_man",
                    "id": "dm_dev_loc_get_plane_points",
                    "params": {
                        "plane_id": planedata.id
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
                    pointList = data.data;
                } else {
                    alert("系统异常，请稍后再试!");
                    console.log(data);
                }
            },
            error: function (err) {
                console.log(err);
                pointList = [];
            }
        });
        //新创建n个没有数据的平面
        for (let i = 0; i < 10; i++) {
            let newPlaneArray = {};
            newPlaneArray.id = "plane" + i;
            newPlaneArray.name = "";
            newPlaneArray.x = "610";
            newPlaneArray.y = "0";
            newPlaneArray.type = "plane";
            pointList.push(newPlaneArray);
        }
        //新创建n个没有数据的设备
        for (let j = 0; j < 10; j++) {
            let newEquimentArray = {};
            newEquimentArray.id = "equiment" + j;
            newEquimentArray.name = "";
            newEquimentArray.x = "650";
            newEquimentArray.y = "0";
            newEquimentArray.type = "equiment";
            pointList.push(newEquimentArray);
        }
        // alert(JSON.stringify(pointList));
        const positionIcon = data => data.map((item) => {
            if (item.type == "8") {//设备
                return (
                    <li key={item.id}><Tooltip title={<div className="IconMenus"><p>设备ID：{item.id}</p><p>设备名：{item.name}</p></div>}><img id={item.id} onMouseOver={this.dragAndDrog.bind(this, item)} onDoubleClick={this.equimentClick.bind(this, item, planedata)} className="mytests" src="/src/images/position/equiment_icon.png" style={{ top: item.y + "px", left: item.x + "px" }} /></Tooltip></li>
                );
            } else if (item.type == "1") {//平面
                let planeData = getPlane_forPoint(item.id, token);//用点获取面
                return (
                    <li key={item.id}><Tooltip title={<div className="IconMenus"><p>平面ID：{planeData[0].id}</p><p>平面名：{planeData[0].name}</p></div>}><img id={item.id} onMouseOver={this.dragAndDrog.bind(this, item)} onDoubleClick={this.planeClick.bind(this, item, planedata)} className="mytests" src="/src/images/position/plane_icon.png" style={{ top: item.y + "px", left: item.x + "px" }} /></Tooltip></li>
                );
            } else if (item.type == "plane") {//平面
                return (
                    <li key={item.id}><img id={item.id} onMouseOver={this.dragAndDrog.bind(this, item)} onDoubleClick={this.planeClick.bind(this, item, planedata)} className="mytests" src="/src/images/position/plane_icon.png" style={{ top: item.y + "px", left: item.x + "px" }} /></li>
                );
            } else if (item.type == "equiment") {//设备
                return (
                    <li key={item.id}><img id={item.id} onMouseOver={this.dragAndDrog.bind(this, item)} onDoubleClick={this.equimentClick.bind(this, item, planedata)} className="mytests" src="/src/images/position/equiment_icon.png" style={{ top: item.y + "px", left: item.x + "px" }} /></li>
                );
            }
            //获取点上的面
            function getPlane_forPoint(pointID, token) {
                let planeData;
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
                                "parent_point_id": pointID
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
                            planeData = data.data;
                        }
                    },
                    error: function (err) {
                        console.log(err);
                        planeData = [];
                    }
                });
                return planeData;
            }
        });
       
        return (
            <div>
                <Row style={{ minWidth: 120, borderBottom: "1px dotted #ccc", paddingLeft: "30px", marginBottom: "10px" }}>
                    <Col span={6}>当前平面：<label style={{ color: "orange" }}>{planedata.name}</label></Col>
                    <Col span={11} style={{ paddingBottom: "2px" }}><Search placeholder="请输入设备ID" style={{ width: 200 }} onSearch={function (value) {
                        if (value == "") {
                            alert("查询内容不能为空！");
                        } else {
                            alert(value);
                        }
                    }} /></Col>
                    <Col span={2} id="popModel"></Col>
                    <Col span={5} style={{ textAlign: "right", paddingBottom: "2px" }}><Button size="small" onClick={this.deletePlane.bind(this, planedata)}>删除平面</Button><Button size="small" onClick={this.setBGMap.bind(this, planedata)}>设置背景图</Button></Col>
                </Row>
                <Row>
                    <Col span={20} className="bg_template" id="roomMap" >
                        <div style={{ border: "1px dotted #ccc", width: "600px", height: "400px", textAlign: "center",zIndex:"0"}} >
                            <img id="bg_img" src="" />
                            <img id="bg_img2" src={planedata.image} style={{ visibility: "hidden" }} />
                        </div>
                        <div className="EquimentIconList"><ul>{positionIcon(pointList)}</ul></div>
                        <Row style={{ top: "30px", left: "600px", position: "absolute", width: "80px", color: "gray" }}><Col span={12} style={{ textAlign: "center" }}>平面</Col><Col span={12} style={{ textAlign: "center" }}>设备</Col></Row>
                       
                    </Col>
                </Row>
            </div>

        )
    }
}