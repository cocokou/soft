import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Button, Popover } from 'antd';
import $ from 'jquery';

let devices = [{
  id: 'D-001',
  key: 'Dev1',
  name: '产品001'
}, {
  id: 'D-002',
  key: 'Dev2',
  name: '产品002',
}, {
  id: 'D-003',
  key: 'Dev3',
  name: '产品003',
}];


export default class DevList extends Component {
  constructor(props) {
    super(props);
  }
 

  render() {
    return (
      <div>
       <ul>
       {devices.map(d =>(
        <li className='devlist' onDrop={this.drop} onDragOver={this.allowDrop}>
        <Popover content={    <div>
          <p>编号: {d.id}</p>
          <p>名称：{d.name} </p>
        </div>} >
        <span draggable="true" onDragStart={this.drag} id={d.id} className='device'>{d.name}</span>
      </Popover>
        </li>
       ))}
       
       </ul>
   </div>
    )
  }
}
