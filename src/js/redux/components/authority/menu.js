import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Button, Row, Col, Icon, Form, Input, Modal, Tree, Layout, } from 'antd';
import $ from 'jquery';
import Add from './addtab';
import Nav from '../common/pc_nav';
import EditableCell from './edit'
import { Menu } from 'antd';
import { Link } from 'react-router';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Panel = Collapse.Panel;
const FormItem = Form.Item;
const { Content, Sider } = Layout;


export default class TreeManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: { display: "none" },
            myData: [{
                label: '资产管理',
                value: '资产管理',
                editable: false,
                key: 'sz',
                children: [{
                    label: '资产档案',
                    value: '资产档案',
                    editable: false,
                    key: 'sz-0',
                    children: [{
                        label: '资产分类',
                        value: '资产分类',
                        editable: false,
                        key: 'sz-0-0'
                    }, {
                        label: '资产位置',
                        value: '资产位置',
                        editable: false,
                        key: 'sz-0-1',
                    }]
                },
                {
                    label: '资产变动',
                    value: '资产变动',
                    editable: false,
                    key: 'sz-1',
                    children: [{
                        label: '资产调拨',
                        value: '资产调拨',
                        editable: false,
                        key: 'sz-1-0',
                    }, {
                        label: '资产报废',
                        value: '资产报废',
                        editable: false,
                        key: 'sz-1-1',
                    }]
                }]
            },
            {
                label: '物资管理',
                value: '物资管理',
                editable: false,
                key: 'wz',
                children: [{
                    label: '物资档案',
                    value: '物资档案',
                    editable: false,
                    key: 'wz-0',
                    children: [{
                        label: '物资编码',
                        value: '物资编码',
                        editable: false,
                        key: 'wz-0-0'
                    }]
                }]
            }]
        }
        this.addMenu = this.addMenu.bind(this)
        this.addSubMenu = this.addSubMenu.bind(this)
    }

    handleClick(e) {
        console.log('click ', e);
      }
    //添加一级菜单
    addMenu(values) {

        let myData = this.state.myData;

        let tab = {
            label: values.value,
            value: values.value,
            editable: false,
            key: values.id,
        };
        myData.push(tab);
        this.setState({ myData:myData });
    }

    //添加子菜单
    addSubMenu(item) {
        // if (!item.value) return;
        let key = "";
        let myData = this.state.myData;
        if (item.children === undefined) {
            item.children = [];
            key = item.key + "-" + 0
        } else {
            let lastchildkey=item.children[item.children.length-1].key;
            let i = lastchildkey.lastIndexOf("-")+1;
            let subid = Number(lastchildkey.substr(i))+1;
            key = item.key+"-"+subid;
        }

        console.log("key:",key)
        let tab = {
            label: '',
            value: '',
            editable: true,
            key: key
        };
        item.children.push(tab);
        this.setState({ myData:myData });
    }

    //edit
    edit(item) {
        item.editable = true;
        this.setState({ myData: this.state.myData })
    }

    //删除
    deleteModal(item, index, array) {
        let myData = this.state.myData;
        array.splice(index, 1);
        this.setState({ myData });
    }

    handleChange(item, value) {
        item.value = value;
        this.setState({ myData: this.state.myData });
    }
    editDone(item, type) {
        const { data } = this.state;

        if (item && typeof item.editable !== 'undefined') {
            item.editable = false;
            item.status = type;
    
        }

        this.setState({ data }, () => {
            if (item && typeof item.editable !== 'undefined') {
                delete item.status;
            }
        });
    }
    render() {
        const loop = data => data.map((item, index, array) => {
            if (item.children) {
                return (
                    <div key={item.key}>
                        <Collapse 
                        bordered={false}
                         >
                            <Panel header={
                                <div>
                                    <Row gutter={20} >
                                        <Col span={6} >
                                            <EditableCell
                                                editable={item.editable}
                                                value={item.value}
                                                onChange={value => this.handleChange(item, value)}
                                                status={item.status}
                                            />
                                     
                                        </Col>
                                        <Col span={18} >                                            
                                            {
                                                item.editable ?
                                                    <span >
                                                        <a onClick={() => this.editDone(item, 'save')}>保存</a>
                                                        <span className="ant-divider" />
                                    
                                                        <a onClick={() => this.editDone(item, 'cancel')}> 取消</a> 
                                                    </span>
                                                    :
                                                    <a onClick={this.edit.bind(this, item)}> 修改 &nbsp;&nbsp;</a>
                                                  
                                            }
                                            <span className="ant-divider" />
                                            <a onClick={this.deleteModal.bind(this, item, index, array)}> 删除 &nbsp;&nbsp;</a><span className="ant-divider" />
                                            <a onClick={this.addSubMenu.bind(this, item)}> +子菜单 &nbsp;&nbsp;</a>

                                        </Col>
                                        
                                        
                                    </Row>
                                </div>}>
                                {loop(item.children)}
                            </Panel>
                        </Collapse>
                    </div>
                );
            } else {
                return (
                    <div key={item.key}>
                    <Collapse 
                    bordered={false} 
                    accordion>
                        <Panel header={
                            <div>
                            <Row gutter={20} >
                                    <Col span={6}>
                                        <EditableCell
                                            editable={item.editable}
                                            value={item.value}
                                            onChange={value => {
                                                console.log("EditableCell.onchange.value:",value)
                                                this.handleChange(item, value)}
                                        }
                                            status={item.status}
                                        />
                                  </Col>
                                  <Col span={18} >                                            
                                  {
                                      item.editable ?
                                          <span >
                                              <a onClick={() => this.editDone(item, 'save')}>保存</a>
                                              <span className="ant-divider" />
                          
                                              <a onClick={() => this.editDone(item, 'cancel')}> 取消</a> 
                                          </span>
                                          :
                                          <a onClick={this.edit.bind(this, item)}> 修改 &nbsp;&nbsp;</a>
                                        
                                  }
                                  <span className="ant-divider" />
                                  <a onClick={this.deleteModal.bind(this, item, index, array)}> 删除 &nbsp;&nbsp;</a><span className="ant-divider" />
                                  <a onClick={this.addSubMenu.bind(this, item)}> +子菜单 &nbsp;&nbsp;</a>

                              </Col>
                                </Row>
                            </div>}>
                        </Panel>
                    </Collapse>
                </div>
                );


            }
        });

        const mloop = data => data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu key={item.key} title={item.value}>
                        {mloop(item.children)}
                    </SubMenu>
                );
            } else {
                return (
                    <Menu.Item key={item.key}>{item.value}</Menu.Item>
                );
            }
        })

        return (
            <div>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Nav />
                    </Sider>
                    <Content style={{ minHeight: 280 }}>
                        <div style={{ marginLeft: "30px" }}>
                         
                            <div style={{ borderBottom: "1px solid #d9d9d9", fontWeight: "bold", paddingBottom:10}}>
                                <Row>
                                    <Col span={6}>
                                     菜单管理  
                                    <a><Link to='/am/test'> &nbsp;&nbsp;&nbsp;TEST </Link> </a>
                                    </Col>
                                    <Col span={10} >
                                    <Add addMenu={this.addMenu} /> 
                                    </Col>
                                </Row>
                            </div> 

                            <Row>
                            <Col span={6}>        
                            <Menu
                            style={{ minWidth: 240 }}
                            // theme="dark"
                            mode="inline"    
                        >
                            {mloop(this.state.myData)}
                        </Menu>
                         </Col>
                         <Col span={18} >
                         <div style={{ marginTop: "10px" }}>
                         {loop(this.state.myData)}
                     </div>
                         </Col>

                  

                            </Row>
                     
                        </div>
                    </Content>
                </Layout>
            </div>

        );
    }
};

