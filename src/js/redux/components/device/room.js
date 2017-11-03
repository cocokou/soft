import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout, Breadcrumb,Card } from 'antd';
import Nav from '../common/pc_nav';
// import * as config from 'config/app.config.js';
import './table.css';
import $ from 'jquery';
import socketCluster from '../../../lib/socketcluster';

const { Content, Sider } = Layout;

const areaList = [
  { area_id: "10016", room_name: "A" },
  { area_id: "10017", room_name: "B" },
  { area_id: "10018", room_name: "C" },
  { area_id: "10021", room_name: "D" }
];


class TopHeader extends React.Component {
  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>位置管理</Breadcrumb.Item>
          <Breadcrumb.Item>人员管理</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}

export default class Classroom extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
    this.state = {
      roomAll: {},
      data: {},
      dev_status:""
    }
  }

  getAreaPeople(area_id) {

    var data = {
      "header": {
        "token": sessionStorage.getItem("token") || ''
      },
      "data": {
        "payload_type": "api",
        "description": {
          "type": "dev_man",
          "id": "app_find_area_people",
          "params": {
            "area_id": area_id
          }
        }
      }
    };
    return new Promise((resolve) => {
      $.ajax({
        url: "http://119.23.132.97/device-manager/80",
        type: "POST",
        cache: false,
        dataType: "json",
        data: JSON.stringify(data),
        success: resolve
      });
    });

  }

  getAllAreaPeople() {
    console.log("starting.....")

    let roomAll = {};

    let plist = areaList.map((area) => {
        let p = this.getAreaPeople(area.area_id);
        p.then((data) => {
            if ('data' in data) {
                roomAll[area.area_id] = data.data;
            }
        }
        );
      return p;
    })
    Promise.all(plist).then(alldata => {
      console.log("promise all ....",alldata)
      this.setState({ roomAll: roomAll });
    });
    console.log("ending....")
  }


  handleLoad() {
    
            window.localStorage.setItem("socketCluster.authToken", sessionStorage.getItem("token") || ''); 
      
            var socket = socketCluster.connect({
                hostname: '120.25.95.23',
                port: 8000
            });
    
            socket.on('error', function (err) {
                throw 'Socket error - ' + err;
            });
    
            socket.on('connect', function () {
                console.log('CONNECTED');
            });
    
            var asset_status_channel = socket.subscribe('asset_status');
     
    
            asset_status_channel.on('subscribeFail', function (err) { // 订阅channel失败:大多由于权限原因.
                console.log('Failed to subscribe to the sample channel due to error: ' + err);
            });
    
            asset_status_channel.watch((data) => {
                console.log('asset_status_channel message:', data);
                if (data.msg != "[]") {
                    let roomAll = this.state.roomAll;
                    try {
                        let sMsg = JSON.parse(data.msg);
                        sMsg.forEach(val => {
                            let to = val.to;
                            let from = val.from;
                            let name = val.name;
                            //check(); to from name undefined null
                            if (from) {
                                roomAll[from] = roomAll[from].filter(val => {
                                    return val.name != name;
                                }); 
                            }
                            console.log("roomAll:",roomAll);
                            if (to) {
                                roomAll[to].push({name:name});
                            }
                        });
                        this.setState({roomAll:roomAll});
                    } catch(e) {
                        console.error(e);
                        return;
                    }
                   
                    this.setState({ dev_status: data.msg })
                }
    
            });
            var dev_status_channel = socket.subscribe('dev_status');
            
            dev_status_channel.on('subscribeFail', function (err) { // 订阅channel失败:大多由于权限原因.
                console.log('Failed to subscribe to the dev channel due to error: ' + err);
            });
    
            dev_status_channel.watch((data) => {
                console.log('dev_status_channel message:', data);
                if (!(data.msg === "[]")) {
                    this.setState({ dev_status: data })
                }
            });
        }
  
  componentDidMount() {
    this.getAllAreaPeople();
    this.handleLoad()
    setInterval(this.getAllAreaPeople.bind(this), 60000);
  }

  render() {
    let roomAll = this.state.roomAll;
    console.log('roomAll:', roomAll)
    areaList.forEach(v => {
      if (roomAll[v.area_id] === undefined) {
        roomAll[v.area_id] = []
      }
    })
    //let roomlist = Object.getOwnPropertyNames(roomAll);

    let viewRooms = areaList.map(r => (
      <Card id={r.area_id} className='room' key={r.area_id}>
        <div>房间 {r.room_name}</div>
        {
          roomAll[r.area_id].map(p => (
            <span className='person' key={p.name}> {p.name}</span>
          ))
        }
      </Card>
    ))

    return (
      <div>
        <TopHeader />

        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Nav />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>

            <div>
              {viewRooms}
            </div>
            <div>{this.state.dev_status}</div>

          </Content>
        </Layout>

      </div>
    )
  }

}
