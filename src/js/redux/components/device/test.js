import React from 'react';
import { Link } from 'react-router';
import { Input, Select, Button, Layout, Table, Icon, Breadcrumb, TreeSelect, Dropdown, Row, Col, Card } from 'antd';
import Nav from '../common/pc_nav';
import * as config from 'config/app.config.js';
import echarts from 'echarts';


const { Content, Sider } = Layout;



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

// let dom = document.getElementById("chart");
// let mychart = echarts.init(dom);

// myChart.setOption({
//     title: { text: 'ECharts 入门示例' },
//     tooltip: {},
//     xAxis: {
//         data: ["衬衫","羊毛衫","雪纺衫"]
//     },
//     yAxis: {},
//     series: [{
//         name: '销量',
//         type: 'bar',
//         data: [10, 10, 20]
//     }]
// });

class Summary extends React.Component {
  render() {
    return (
      <div id="chart" style={{width:500, height:"400px"}} >

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

<div id="chart"></div>
    
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



/******************初始化设置******************/
// 容器高度
var chartheight = 200;
// 颜色阈值
var colors = ['#FD6969', '#EFC87C', '#38E7A7', '#2396FC'];
// 数据
var xAxisData = [];
var data = [];
for (var i = 0; i < 24; i++) {
    xAxisData.push(i);
    data.push(Math.round(Math.random()*3*i));
}
/******************初始化设置******************/

// 柱形图样式
let bar_style = {
  width: '100%',
  height: chartheight+'px'
}
// 配置
let bar_option = {
  grid: {
    show: false,
    left: 15,
    right: 15,
    top: 15,
    bottom: 30
  },
  // 颜色渐变视觉交互
  visualMap: {
    formatter: function(value) {
      return Math.round(value) + 'mm';
    },
    type: 'continuous',
    color: colors,
    min: 0,
    max: 60,
    left: 7,
    top: 0,
    itemHeight: chartheight-30,
    itemWidth: 5,
    textStyle: {
      color: '#5AB6C9'
    }
  },
  xAxis: {
    data: xAxisData,
    splitNumber: 5,
    scale: true,
    axisLabel: {
      formatter: function(value, index) {
        var today = new Date();
        if(0 == index) {
          texts = '';
        } else {
          var texts = today.getHours() == value ? '现在' : value+':00';
        }
        return texts;
      },
      textStyle: {
        color: '#5AB6C9',
        fontSize: 8
      }
    },
    splitLine: {
        show: true,
    },
    // 坐标轴留白策略
    boundaryGap: false,
    axisLine: { 
      show: true,
      lineStyle: {
        color: '#ffffff',
        width: 1,
        opacity: 0.1,
      } 
    },
    axisTick: { 
      show: true,
      interval: 0,
      lineStyle: {
        color: '#ffffff',
        opacity: 0.2
      }
    },
    splitLine: { show: false }
  },
  yAxis: {
    type: 'value',
    splitNumber: 3,
    // 刻度间隔
    // interval: 20,
    scale: true,
    axisLabel: {
      formatter: function(value, index) {
        let texts = index == 0 ? '' : value + 'mm';
        return texts;
      },
      inside: true,
      textStyle: {
        color: '#5AB6C9',
        fontSize: 10
      }
    },
    axisLine: { 
      show: false,
      lineStyle: {
        color: '#fff',
        opacity: 0.1,
      }
    },
    axisTick: { 
      inside: true,
      show: true,
      lineStyle: {
        color: '#fff',
        opacity: 0.1
      }
    },
    splitLine: {
      // 辅助线
      show: false,
    }
  },
  series: [{
    type: 'bar',
    data: data,
    barCategoryGap: '40%', 
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0,0,0,1,[{
            offset:0,
            color: colors[0]
          },{
            offset:0.33,
            color: colors[1]
          },{
            offset:0.66,
            color: colors[2]
          },{
            offset:1,
            color: colors[3]
          }]
        ),
        barBorderRadius: 10,
      }
    },
    animationDelay: function (idx) {
        return idx * 10;
    }
  }],
  animationEasing: 'elasticOut',
  animationDelayUpdate: function (idx) {
      return idx * 5;
  }
};

export {bar_style, bar_option};