import React from 'react';
import { Link } from 'react-router';
import { Input, Select, Button, Layout, Table, Icon, Breadcrumb, TreeSelect, Dropdown, Row, Col, Popconfirm, Cascader, InputNumber, Tree, Card, Form, Modal } from 'antd';
import Nav from '../common/pc_nav';
import * as config from 'config/app.config.js';
import EditableCell from './edit'

// import './table.css';
import $ from 'jquery';

const TreeNode = Tree.TreeNode;
const { Content, Sider } = Layout;
const Search = Input.Search;
const treeData = [];
const statusData = [{
    label: "全选",
    value: '',
    key: '0-0-0'
}, {
    label: '正常',
    value: '正常',
    key: '0-0-1',
}, {
    label: '不正常',
    value: '不正常',
    key: '0-0-2',
}, {
    label: '未登记',
    value: '未登记',
    key: '0-0-3',
}];
const typeData = [{
    label: "全选",
    value: '',
    key: '0-0-4',
}, {
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




class TopHeader extends React.Component {
    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item><Link to="/dm/device"><Icon type="arrow-left" />设备管理</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/dm/org2">查看</Link></Breadcrumb.Item>
                </Breadcrumb>
            </div>
        )
    }
}


class OrgTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: ['0-0-0', '0-0-1'],
            autoExpandParent: true,
            selectedKeys: [],
            displayTable:{display:"none"}
        }
    }
    onExpand(expandedKeys) {
        console.log('onExpand', arguments);
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onSelect(selectedKeys, info) {
        console.log('onSelect', selectedKeys);

        // console.log('onSelect', info);
        if (selectedKeys.length < 1) {
            // un select
        } else if (selectedKeys[0]) {
            let tmp = selectedKeys[0];
            console.log("onselect key:", tmp);
            tmp = 'table-' + tmp;
            console.log("tmp:", tmp);

           $('.plane').css('display', 'none'); 
           $('#'+tmp).css('display', 'block'); 
         
        } else {
            // error
        }
        this.setState({ selectedKeys });
    }
    render() {
        const loop = data => data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode key={item.key} title={item.value} disableCheckbox={item.key === '0-0-0'}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }

            return <TreeNode key={item.key} title={item.value} />;

        });
        return (
            <div>
            <TopHeader />
            <Layout style={{padding:'24px 0', background: '#fff' }}>
              <Sider width={200} style={{ background: '#fff' }}>
                <Nav />
              </Sider>
              <Content style={{padding:'0 24px', minHeight: 280 }}>
              {/*<FilterHeader />*/}
              <Row>
                <Col span={6}>
                <h3>我的部门</h3>
                <Tree
                    onExpand={this.onExpand.bind(this)}
                    expandedKeys={this.state.expandedKeys}
                    autoExpandParent={this.state.autoExpandParent}
                    onSelect={this.onSelect.bind(this)}
                    selectedKeys={this.state.selectedKeys}
                >
                    {loop(orgData)}
                </Tree>
                </Col>
                <Col span={14}>
                <table className="plane" id='table-0-0-0-2' style={this.state.displayTable}>
                <tr>
                    <td >2一区</td>
                    <td >2二区</td>
                    <td >2三区</td>
                    <td >2四区</td>
                </tr>
                <tr>
                    <td id="target11">2一区</td>
                    <td id="target12">2一区</td>
                    <td id="target13">2一区</td>
                    <td id="target14">2一区</td>
                </tr>
            </table>
            <table className="plane" id='table-0-0-0-1' style={this.state.displayTable}>
                <tr>
                    <td >1一区</td>
                    <td >1二区</td>
                    <td >1三区</td>
                    <td >1四区</td>
                </tr>
                <tr>
                    <td id="target11">1一区</td>
                    <td id="target12">1一区</td>
                    <td id="target13">1一区</td>
                    <td id="target14">1一区</td>
                </tr>
            </table>
                </Col>
              </Row>
              </Content>
            </Layout>
          </div>

        //     <Row>
        //     <Col span={10}>
            
        //      <table className="plane" id='table-0-0-0-2' style={this.state.displayTable}>
        //          <tr>
        //              <td >2一区</td>
        //              <td >2二区</td>
        //              <td >2三区</td>
        //              <td >2四区</td>
        //          </tr>
        //          <tr>
        //              <td id="target11">2一区</td>
        //              <td id="target12">2一区</td>
        //              <td id="target13">2一区</td>
        //              <td id="target14">2一区</td>
        //          </tr>
        //      </table>
        //      <table className="plane" id='table-0-0-0-1' style={this.state.displayTable}>
        //          <tr>
        //              <td >1一区</td>
        //              <td >1二区</td>
        //              <td >1三区</td>
        //              <td >1四区</td>
        //          </tr>
        //          <tr>
        //              <td id="target11">1一区</td>
        //              <td id="target12">1一区</td>
        //              <td id="target13">1一区</td>
        //              <td id="target14">1一区</td>
        //          </tr>
        //      </table>
          
        //      </Col>

        //     <Col span={4} style={{ minWidth: 200 }}>
        //     <h3>我的部门</h3>
        //     <Tree
        //         onExpand={this.onExpand.bind(this)}
        //         expandedKeys={this.state.expandedKeys}
        //         autoExpandParent={this.state.autoExpandParent}
        //         onSelect={this.onSelect.bind(this)}
        //         selectedKeys={this.state.selectedKeys}
        //     >
        //         {loop(orgData)}
        //     </Tree>
        //     </Col>
            
         
        // </Row>

                


       
        );
    }
}





export default class ManageDevice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }
    render() {
        var { list } = this.state;

        return (
            <div>
                <TopHeader />
                <Layout style={{ padding: '24px 0', background: '#fff' }}>

                    <Content style={{ padding: '0 24px', minHeight: 280 }}>

                        <div>

                           
                       
                                    <OrgTree />
                             
                             
                      
                        </div>

                    </Content>
                </Layout>
            </div>
        )
    }

}
