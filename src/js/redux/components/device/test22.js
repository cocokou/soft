import React from 'react';
import { Link } from 'react-router';
import { Input, Select, Button, Layout, Table, Icon, Breadcrumb, TreeSelect,Popconfirm, Cascader } from 'antd';
import Nav from '../common/pc_nav';
import * as config from 'config/app.config.js';
import Add from './add'

const { Content, Sider } = Layout;
const Search = Input.Search;

const treeData=[];
const statusData = [{
    label:"全选",
    value:'',
    key:'0-0-0'
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
const typeData=[{
    label:"全选",
    value:'',
    key:'0-0-4',
},{
    label:"桌面式读写器",
    value:'桌面式读写器',
    key:'0-0-5',
},{
    label:"固定式一体化读写器",
    value:'固定式一体化读写器',
    key:'0-0-6',
},{
    label:"固定式多通道读写器",
    value:'固定式多通道读写器',
    key:'0-0-7',
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
            value:'研发部',
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
    children: [ {
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

const deviceData = [{
    id: 1,
    key: 1,
    name: 'R2000',
    type: '桌面式读写器',
    status: '正常',
    last_update_time: '2019-01-01 12:00',
    org: '深圳科技园研发部',
    location: '* * *',
}, {
    id: 2,
    key: 2,
    name: 'F5019-H',
    type: '固定式一体化读写器',
    status: '正常',
    last_update_time: '2017-01-01 12:00',
    org: '深圳科技园生产部',
    location: '* * *',
}, {
    id: 3,
    key: 3,
    name: 'F5880-H',
    type: '固定式多通道读写器',
    status: '未登记',
    last_update_time: '2017-01-01 12:00',
    org: '深圳科技园销售部',
    location: '* * *',
}, {
    id: 4,
    key: 4,
    name: 'R2000',
    type: '桌面式读写器',
    status: '正常',
    last_update_time: '2017-01-01 12:00',
    org: '深圳科技园研发部',
    location: '* * *',
}, {
    id: 5,
    key: 5,
    name: 'F5019-H',
    type: '固定式一体化读写器',
    status: '正常',
    last_update_time: '2017-01-01 12:00',
    org: '北京科技园研发部',
    location: '* * *',
}, {
    id: 6,
    key: 6,
    name: 'F5880-H',
    type: '固定式多通道读写器',
    status: '未登记',
    last_update_time: '2017-01-01 12:00',
    org: '北京科技园生产部',
    location: '* * *',
},{
    id: 7,
    key: 7,
    name: 'R2000',
    type: '固定式多通道读写器',
    status: '不正常',
    last_update_time: '2017-01-01 12:00',
    org: '北京科技园生产部',
    location: '* * *',
},{
    id: 8,
    key: 8,
    name: 'R2000',
    type: '固定式多通道读写器',
    status: '不正常',
    last_update_time: '2017-01-01 12:00',
    org: '北京科技园生产部',
    location: '* * *',
},{
    id: 9,
    key: 9,
    name: 'F5880-H',
    type: '固定式一体化读写器',
    status: '不正常',
    last_update_time: '2017-01-01 12:00',
    org: '北京科技园销售部',
    location: '* * *',
},{
    id: 10,
    key: 10,
    name: 'F5880-H',
    type: '固定式一体化读写器',
    status: '不正常',
    last_update_time: '2017-01-01 12:00',
    org: '北京A部门',
    location: '* * *',
},{
    id: 11,
    key: 11,
    name: 'F5880-H',
    type: '固定式一体化读写器',
    status: '正常',
    last_update_time: '2017-01-01 12:00',
    org: '北京A部门',
    location: '* * *',
},{
    id: 12,
    key: 12,
    name: 'F5880-H',
    type: '固定式一体化读写器',
    status: '未登记',
    last_update_time: '2017-01-01 12:00',
    org: '深圳科技园研发部',
    location: '* * *',
}];



class TopHeader extends React.Component {
    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>设备管理</Breadcrumb.Item>
                    <Breadcrumb.Item>查看设备</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        )
    }
}

class FilterHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: undefined,
            searchText: '',
            filtered: false,
            value1:'',
            value2:'',
            valueOrg:'',
        }
    }


    //搜索
    onInputChange(e){
        this.setState({ searchText: e.target.value});
        /*this.setState({ value1:e.target.value })*/
    }

    click(){
        const searchText = this.state.searchText;
        this.props.onSearch(searchText);
    }
    //搜索
    //选择

    onChangeFirst(valueFirst){
        this.setState({value1:valueFirst});
    }
    onChangeTwo(valueTwo){
        this.setState({value2:valueTwo});
    }
    onChangeOrg(valueOrg){
        const valueOrgs=valueOrg.join("");
        this.setState({valueOrg:valueOrgs});
    }

    onSelect(){
        const {value1,value2,valueOrg}=this.state;
        console.log(valueOrg);
        this.props.onSelectFirst(value1,value2,valueOrg);
}

    //选择

    render() {
        return (
            <div className="panel search">
                <div style={{ lineHeight: 3 }}>
                    <label>搜索设备：&nbsp; </label>
                    <Search placeholder="请输入关键字" style={{ maxWidth: 200, marginRight: 60 }}
                            value={this.state.searchText} onChange={this.onInputChange.bind(this)} onPressEnter={this.click.bind(this)}/>
                    <Button type="primary" icon="search" onClick={this.onSelect.bind(this)}>Search</Button>
                </div>
                <div style={{ lineHeight: 3 }}>

                    <label style={{ width: 70 }}>设备状态：&nbsp; </label>
                    <TreeSelect
                        style={{ width: 200 }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={statusData}
                        placeholder="--请选择--"
                        treeDefaultExpandAll
                        class='space-right'
                        onChange={this.onChangeFirst.bind(this)}
                        value={this.state.value1}
                    />
                    <label style={{ marginLeft: 60 }}>所属部门：&nbsp; </label>

                    <Cascader options={orgData} onChange={this.onChangeOrg.bind(this)} changeOnSelect />
                </div>

                <div style={{ lineHeight: 3 }}>
                    <label>设备位置：&nbsp; </label>
                    <TreeSelect
                        style={{ width: 200 }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={treeData}
                        placeholder="--请选择--"
                        treeDefaultExpandAll
                        class='space-right'
                    />
                    <label style={{ marginLeft: 60 }}>设备类型：&nbsp; </label>
                    <TreeSelect
                        style={{ width: 200 }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={typeData}
                        placeholder="--请选择--"
                        treeDefaultExpandAll
                        class='space-right'
                        onChange={this.onChangeTwo.bind(this)}
                        value={this.state.value2}
                    />
                </div>

            </div>
        )
    }

}

class ETable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource:deviceData,
            figureSource:deviceData,
            dataSourceTwo:deviceData,
            index: '',
            selectedRowKeys: [],
            selectedRows: [],
            record: '',
            figure:0,
            number:0
        };
  
 

        this.columns = [{
            title: '编号',
            dataIndex: 'id',
            key: 'id',
            render: id => <a href="#">{id}</a>,
        }, {
            title: '设备名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '设备状态',
            dataIndex: 'status',
            key: 'status',

            onFilter:null,
        }, {
            title: '所属部门',
            dataIndex: 'org',
            key: 'org'
        }, {
            title: '设备类型',
            dataIndex: 'type',
            key: 'type'
        }, {
            title: '状态更新时间',
            dataIndex: 'last_update_time',
            key: 'last_update_time'
        }, {
            title: '设备位置',
            dataIndex: 'location',
            key: 'location'
        }, {
            title: '操作',
            key: 'action',
            render: (text, record, index) => (
                <div>
          <span>
            <a href="#">查看</a>
          </span>
                    <span className="ant-divider" />
                    <span>
            <a href="#">编辑</a>
          </span>
                    <span className="ant-divider" />
                    <span>
            <Popconfirm title="设备删除后不能恢复，确定要删除这台设备吗？" placement="leftBottom" okText="删除" cancelText="取消">
              <a href="javascript:;" >删除</a>
            </Popconfirm>

          </span>
                </div>
            ),
        }];
    }

    onSearch(searchText) {
        // const {dataSource } = this.state;
        let reg = new RegExp(searchText, 'gi');

            this.setState({
                dataSourceTwo: deviceData.map(function (record) {
                    let type = record.type.match(reg);
                    let org = record.org.match(reg);
                    let Name = record.name.match(reg);
                    let Status = record.status.match(reg);
                    if (!type && !org && !Name && !Status) {

                        return null;
                    }
                    return {
                        status: record.status,
                        org: record.org,
                        name: record.name,
                        location: record.location,
                        last_update_time: record.last_update_time,
                        id: record.id,
                        type: record.type,
                    };
                }).filter(record => !!record),
            });
    }
    onSelectFirst(selectFirst,selectTwo,selectOrg) {

        let regFirst = new RegExp('^'+selectFirst);
        let regTwo=new RegExp(selectTwo);
        let regThree=new RegExp(selectOrg);
        console.log(regThree);
        console.log(regTwo);
        this.setState({
            dataSourceTwo: deviceData.map(function (record) {
                let Status = record.status.match(regFirst);
                let type = record.type.match(regTwo);
                let Org=record.org.match(regThree);
                console.log(record.org);
                console.log(Org);
                if (!type||!Status||!Org) {
                    return null;
                }if(type){
                return {
                    status: record.status,
                    org: record.org,
                    name: record.name,
                    location: record.location,
                    last_update_time: record.last_update_time,
                    id: record.id,
                    type: record.type,
                }}
                if(Status){
                    return {
                        status: record.status,
                        org: record.org,
                        name: record.name,
                        location: record.location,
                        last_update_time: record.last_update_time,
                        id: record.id,
                        type: record.type,
                    }}
                if(Org){
                    return {
                        status: record.status,
                        org: record.org,
                        name: record.name,
                        location: record.location,
                        last_update_time: record.last_update_time,
                        id: record.id,
                        type: record.type,
                    }}
            }).filter(record => !!record),
        

        });

    }






    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys: selectedRowKeys,
                    selectedRows: selectedRows
                })
            },
        };
        const { dataSourceTwo }=this.state;
        return (
            <div>
                <FilterHeader  onSearch={this.onSearch.bind(this)} onSelectFirst={this.onSelectFirst.bind(this)}/>
           


          
                    <Button type="primary">删除设备</Button>
             

                <Button  style={{ margin: 20 }}>暂停设备</Button>
                <Button >重启设备</Button>

                <Table columns={this.columns}
                       dataSource= {dataSourceTwo}
                       rowSelection={rowSelection}
                />
            </div>

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
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Nav />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>


                        <ETable />

                    </Content>
                </Layout>
            </div>
        )
    }

}