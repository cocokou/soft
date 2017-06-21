import React from 'react';
import { Link } from 'react-router';
import { Input, Select, Button, Layout, Table, Icon, Breadcrumb, TreeSelect, Dropdown, Row, Col, Card } from 'antd';
import Nav from '../common/pc_nav';
import * as config from 'config/app.config.js';

const { Content, Sider } = Layout;
const Search = Input.Search;

const Option = Select.Option;
class TopHeader extends React.Component {
  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>设备管理</Breadcrumb.Item>
          <Breadcrumb.Item>Summary</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}

// var echarts = require('echarts');

// 基于准备好的dom，初始化echarts实例
// var myChart = echarts.init(document.getElementsByClassName('chart'));
// // 绘制图表
// myChart.setOption({
//     title: { text: 'ECharts 入门示例' },
//     tooltip: {},
//     xAxis: {
//         data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
//     },
//     yAxis: {},
//     series: [{
//         name: '销量',
//         type: 'bar',
//         data: [5, 20, 36, 10, 10, 20]
//     }]
// });

class Summary extends React.Component {
  render() {
    return (
      <div style={{ width: '100%', padding: '30px' ,minHeight: 280}}>
        <Row gutter={16}  >
          <Col span={8}>
            <Card title="设备使用情况" bordered={true}>
            <img src="http://placehold.it/180x120" />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="活跃设备数量" bordered={true}>Card content</Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={true}>Card content</Card>
          </Col>
        </Row>
      </div>
    )
  }
}

class SummaryPanel extends React.Component {
  render() {
    return (
      <div>

        <Card title="Summary" style={{ width: '100%', minHeight: 280 }}>
          <Row gutter={16} style={{fontSize: 24, marginTop: 20 }}>
            <Col span={8}>
              <div className="gutter-box" style={{ height: 80, backgroundColor: '#4ca64c', color: "#fff", borderRadius: 5 }}  >
                <div style={{ padding: '20px' }}><Icon type="check-circle" /> 正常设备数：<a href=""> 666</a></div>
              </div>
            </Col>

            <Col span={8}>
              <div className="gutter-box" style={{ height: 80, backgroundColor: '#ff4c4c', color: "#fff", borderRadius: 5 }}  >
                <div style={{ padding: '20px' }}><Icon type="close-circle" /> 异常设备数： <a href="">22</a></div>
              </div>
            </Col>

            <Col className="gutter-row" span={8}>
              <div className="gutter-box" style={{ height: 80, backgroundColor: '#428bca', color: "#fff", borderRadius: 5 }}  >
                <div style={{ padding: '20px' }}> <Icon type="info-circle" /> 未登记设备：<a style={{ color: "#fff" }} href="">12</a></div>
              </div>
            </Col>

          </Row>
        </Card>

      </div>
    )
  }
}


export default class DeviceSummary extends React.Component {

  render() {

    return (
      <div>
        <TopHeader />
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Nav />
          </Sider>
           
            <Summary />


    
        </Layout>
      </div>
    )
  }
  /*  componentDidMount(){
          var options = config.default.fetchOptions('POST', 'GetProductList', {})
          fetch(config.default.product_info, options)
          .then(res => res.json())
          .then(json => {
            var data = json.data.map( m => {m.key=m.id; return m})
            this.setState({list: data})
          })
          .catch(ex => {console.warn("parsed err: " + ex)})
    }*/
}