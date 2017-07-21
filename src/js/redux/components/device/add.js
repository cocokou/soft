import React from 'react';
import { Input , Select, Checkbox, Button, Table, Icon, Layout, Breadcrumb, Modal} from 'antd';
const { Content } = Layout;
const CheckboxGroup = Checkbox.Group;
import {Link} from 'react-router';

export default class UserForm extends React.Component{
  render(){
    const plainOptions = ['操作员', '产品经理', '人资经理']
    return (
      <div style={{marginLeft: '26px',}}>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>用户管理</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/dm/org">我的部门</Link></Breadcrumb.Item>
          <Breadcrumb.Item>新增部门</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{padding:'24px 0', background: '#fff' }}>
          <Content style={{padding:'0 0px', minHeight: 280 }}>
            <div class="form-panel">
              <div class="panel-body">
                  <div class="form-group form-inline">
                  <label>部门名称：</label>
                  <Input type="text" style={{width: 200}} />
                </div>
  
                <div class="form-group form-inline">
                  <label>{'　用户名：'}</label>
                  <Input type="text" style={{width: 200}} />
                </div>
                <div class="form-group form-inline">
                  <label>{'　　密码：'}</label>
                  <Input type="password" style={{width: 200}} />
                </div>

              </div>
                            <div class="form-group form-inline">
              <Button  type='primary'>提交</Button>
              <Button style={{marginLeft: 30}} >取消</Button>     </div>
            </div>
          </Content>
        </Layout>
      </div>
      )
  }
}