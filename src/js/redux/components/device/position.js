// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router';
// import { Upload, message, Input, Select, Tooltip, Button, Layout, Table, Icon, Breadcrumb, Row, Col, Popconfirm, Cascader, InputNumber, Card, Form, Modal } from 'antd';
// import Nav from '../common/pc_nav';
// import './table.css';
// import $ from 'jquery';
// import PositionManagerContent from './positionContent';
// import PlaneModel from './PlaneModel';
// import UploadFile from './UploadFile';

// const { Content, Sider } = Layout;
// let planeData = [];

// class PositionManager extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     }
//     //查询平面(树形数据)
//     let token = sessionStorage.getItem("token");
//     var data = {
//       "header": {
//         "token": token
//       },
//       "data": {
//         "payload_type": "api",
//         "description": {
//           "type": "dev_man",
//           "id": "dm_dev_loc_get_loc_tree",
//           "params": {
//             "parent_point_id": null
//           }
//         }
//       }
//     };
//     $.ajax({
//       url: "http://119.23.132.97/device-manager/80",
//       type: "POST",
//       async: false,
//       cache: false,
//       contentType: "application/json",
//       dataType: "json",
//       data: JSON.stringify(data),
//       success: function (data) {
//         if (data.result.code == "0") {
//           planeData.splice(0, planeData.length);//清空数组，防止数组存入重复数据
//           var alldata = data.data;
//           //把数据封装成树形结构（目前是一个机械方式的愚蠢递归，后续需要优化算法）
//           for (var i = 0; i < alldata.length; i++) {
//             if (alldata[i].type == "1") {
//               if (alldata[i].parent_id == null) {
//                 var treeNode = {};
//                 treeNode.id = alldata[i].id;
//                 treeNode.name = alldata[i].name;
//                 treeNode.parent_point = alldata[i].parent_id;
//                 treeNode.width = alldata[i].plane_width;
//                 treeNode.length = alldata[i].plane_length;
//                 treeNode.image = alldata[i].image;
//                 var child = [];
//                 for (var j = 0; j < alldata.length; j++) {
//                   if (alldata[i].id == alldata[j].parent_id) { //判断哪个点
//                     for (var k = 0; k < alldata.length; k++) { //获取点上的面
//                       if (alldata[j].id == alldata[k].parent_id) { //二级面
//                         var treeNode2 = {};
//                         var child2 = [];
//                         treeNode2.id = alldata[k].id;
//                         treeNode2.name = alldata[k].name;
//                         treeNode2.parent_point = alldata[k].parent_id;
//                         treeNode2.width = alldata[k].plane_width;
//                         treeNode2.length = alldata[k].plane_length;
//                         treeNode2.image = alldata[k].image;
//                         for (var l = 0; l < alldata.length; l++) {
//                           if (alldata[k].id == alldata[l].parent_id) { //判断哪个点
//                             for (var m = 0; m < alldata.length; m++) { //获取点上的面
//                               if (alldata[l].id == alldata[m].parent_id) { //三级面
//                                 var treeNode3 = {};
//                                 var child3 = [];
//                                 treeNode3.id = alldata[m].id;
//                                 treeNode3.name = alldata[m].name;
//                                 treeNode3.parent_point = alldata[m].parent_id;
//                                 treeNode3.width = alldata[m].plane_width;
//                                 treeNode3.length = alldata[m].plane_length;
//                                 treeNode3.image = alldata[m].image;
//                                 for (var n = 0; n < alldata.length; n++) {
//                                   if (alldata[m].id == alldata[n].parent_id) { //判断哪个点
//                                     for (var o = 0; o < alldata.length; o++) { //获取点上的面
//                                       if (alldata[n].id == alldata[o].parent_id) { //四级面
//                                         child3.push(alldata[o]);
//                                       }
//                                     }
//                                   }
//                                 }
//                                 treeNode3.child = child3;
//                                 child2.push(treeNode3);
//                               }
//                             }
//                           }
//                         }
//                         treeNode2.child = child2;
//                         child.push(treeNode2);
//                       }
//                     }
//                   }
//                 }
//                 treeNode.child = child;
//                 planeData.push(treeNode);
//               }
//             }
//           }
//         }
//       },
//       error: function (err) {
//         planeData = [];
//         alert("系统异常，请稍后再试！");
//         console.log(err);
//       }
//     });

//   }

//   //点击城市平面
//   planeMenusClick(planedata) {
//     let ContentPlane = React.createClass({
//       render: function () {
//         return (
//           <div>
//             <PositionManagerContent planedata={planedata} />
//           </div>
//         )
//       }
//     });
//     ReactDOM.render(
//       <ContentPlane />,
//       document.getElementById('content')
//     );

//     //平面切换样式
//     $(".planeMenus").removeClass("inlineAfter");
//     $("#" + planedata.id).addClass("inlineAfter");

//   }
//   //添加平面
//   addPlane() {
//     let param = {
//       ModalTitle: "addCityPlane"
//     }
//     let AfterAddPlaneModel = Form.create()(PlaneModel);//用Form.create()包装过的组件会自带 this.props.form 属性，直接传给 Form 即可
//     ReactDOM.render(
//       <div>
//         <AfterAddPlaneModel param={param} />
//       </div>,
//       document.getElementById('popModel')
//     );
//   }

//   //上传背景图
//   UploadFile() {
//     let UploadFiles = Form.create()(UploadFile);
//     ReactDOM.render(
//       <div>
//         <UploadFiles />
//       </div>,
//       document.getElementById('popModel')
//     );
//   }
//   render() {
//     setTimeout(function () {
//       $(".hiddenDiv").children().hide();
//       $(".hiddenDiv2").children().hide();
//       $(".hiddenDiv3").children().hide();
//       $(".planeList img").on("click", function () {
//         $(this).parent().siblings().children().toggle();
//         var src = $(this).attr("src");
//         if (src == "/src/images/jiantou_down.png") { $(this).attr("src", "/src/images/jiantou_right.png"); }
//         else { $(this).attr("src", "/src/images/jiantou_down.png"); }
//       });
//     }, 10);
//     const loop = data => data.map((item, index) => {
//       if (0 < item.child.length) {
//         return (
//           <div key={index} >
//             <div style={{ padding: "5px 0" }}><img src="/src/images/jiantou_right.png" /> <label id={item.id} className="planeMenus" onClick={this.planeMenusClick.bind(this, item)}> {item.name}</label> </div>
//             <div className="hiddenDiv" style={{ textAlign: "left", paddingLeft: "55%" }}>{item.child.map((item2, index2) => {
//               if (0 < item2.child.length) {
//                 return (
//                   <div key={index2}>
//                     <div style={{ padding: "5px 0" }} ><img src="/src/images/jiantou_right.png" /> <label id={item2.id} className="planeMenus" onClick={this.planeMenusClick.bind(this, item2)}> {item2.name}</label> </div>
//                     <div className="hiddenDiv2" style={{ paddingLeft: "25%" }}>{item2.child.map((item3, index3) => {
//                       if (0 < item3.child.length) {
//                         return (
//                           <div key={index3}>
//                             <div style={{ padding: "5px 0" }}><img src="/src/images/jiantou_right.png" /> <label id={item3.id} className="planeMenus" onClick={this.planeMenusClick.bind(this, item3)}> {item3.name}</label> </div>
//                             <div className="hiddenDiv3" style={{ paddingLeft: "30%" }}>{item3.child.map((item4, index4) => {
//                               return (
//                                 <div key={index4}>
//                                   <div style={{ padding: "5px 0" }}><label id={item4.id} className="planeMenus" onClick={this.planeMenusClick.bind(this, item4)}> {item4.name}</label> </div>
//                                 </div>
//                               )
//                             })}
//                             </div>
//                           </div>
//                         )
//                       } else {
//                         return (
//                           <div key={index3}>
//                             <div style={{ padding: "5px 0" }} ><label style={{ paddingLeft: "10px" }}></label> <label id={item3.id} className="planeMenus" onClick={this.planeMenusClick.bind(this, item3)}> {item3.name}</label> </div>
//                           </div>
//                         )
//                       }

//                     })}
//                     </div>
//                   </div>
//                 )
//               } else {
//                 return (
//                   <div key={index2}>
//                     <div style={{ padding: "5px 0" }} ><label style={{ paddingLeft: "10px" }}></label> <label id={item2.id} className="planeMenus" onClick={this.planeMenusClick.bind(this, item2)}> {item2.name}</label> </div>
//                   </div>
//                 )
//               }
//             })}
//             </div>
//           </div>
//         )
//       } else {
//         return (
//           <div key={index} >
//             <div style={{ padding: "5px 0" }}><label style={{ paddingLeft: "10px" }}></label>  <label id={item.id} className="planeMenus" onClick={this.planeMenusClick.bind(this, item)}> {item.name}</label> </div>
//           </div>
//         )
//       }
//     });

//     return (
//       <div>
//         <Layout style={{ padding: '24px 0', background: '#fff' }}>
//           <Sider width={200} style={{ background: '#fff' }}>
//             <Nav />
//           </Sider>
//           <Content style={{ minHeight: 280 }}>
//             <Row>
//               <Col span={4} id="planeList" style={{ minWidth: 120, borderRight: "1px dotted #ccc", textAlign: "center" }}>
//                 <Row style={{ paddingBottom: "5px" }}>
//                   <Col span={12}>
//                     <Button size="small" onClick={this.addPlane.bind(this)} style={{ width: "90%" }}>添加城市</Button>
//                   </Col>
//                   <Col span={12}>
//                     <Button size="small" onClick={this.UploadFile.bind(this)} style={{ width: "90%" }}>上传背景</Button>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col className="planeList" style={{ minWidth: 120, borderTop: "1px dotted #ccc", textAlign: "center" }}>
//                     {loop(planeData)}
//                   </Col>
//                 </Row>
//               </Col>
//               <Col span={18} id="content"></Col>
//               <Col span={2} id="popModel"></Col>
//             </Row>
//           </Content>
//         </Layout>
//       </div>

//     );
//   }
// }


// export default class ManageDevice extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       list: [],
//     }
//   }
//   render() {
//     let { list } = this.state;
//     return (
//       <div>
//         <Layout style={{ padding: '24px 0', background: '#fff' }}>

//           <Content style={{ padding: '0 24px', minHeight: 280 }}>
//             <div>
//               <PositionManager />
//             </div>
//           </Content>
//         </Layout>
//       </div>
//     )
//   }

// }
