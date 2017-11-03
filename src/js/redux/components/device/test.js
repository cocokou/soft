import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Input, Select, Popover, Button, Layout, Table, Icon, Breadcrumb, Row, Col, Tree, Card, Form } from 'antd';
import Nav from '../common/pc_nav';
import * as config from 'config/app.config.js';
import './table.css';
import $ from 'jquery';



const roomList = ["A", "B", "C", "D"];
const people = [
  { personId: "访客1", roomId: "A" },
  { personId: "访客2", roomId: "A" },
  { personId: "访客3", roomId: "D" },
  { personId: "访客4", roomId: "C" }
];



export default class Classroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: people,
      groupAll: {}
    }
  }

  goRoom() {
    let groupAll={};
    roomList.map((room) => {
      groupAll[room]=[];
    });
    for(let i=0; i<people.length; i++) {
     let s = people[i];
     if(groupAll[s.roomId]==undefined){
      groupAll[s.roomId] =[];
      groupAll[s.roomId].push(s);
     } else {
       groupAll[s.roomId].push(s);
     }			 

    }
    
    console.log(groupAll)
    this.setState({groupAll:groupAll});
    //return groupAll;
  }

  render() {
  
 let groupAll =this.state.groupAll ;

    // let showX = groupAll.map((s) => (
    //   <div key={s.personId}>
    //     {s.personId}</div>
    // ));
    let showX = []
    for (let roomId in groupAll) {
      console.log("roomId:",roomId)
      let room = groupAll[roomId].map(v => {
        return <div key={v.roomId}>{v}</div>
      });
      showX.push(<div  >{room}</div>);
    }

    return (
      <div>

        <Button onClick={this.goRoom.bind(this)}>查看</Button>

        <div className="left">
          <div>
               
          </div>
        </div>

      </div>
    )
  }

}


