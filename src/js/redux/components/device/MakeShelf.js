import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Button, Popover } from 'antd';
import $ from 'jquery';

class CreateShelf extends React.Component {
  constructor(props) {
    super(props);
  }

  createTable(rows, cols) {
    let a = [];
    for (let i = 1; i <= rows; ++i) {
      let b = [];
      for (let j = 1; j <= cols; ++j) {
        b.push(<td id={'c' + i + j} key={'c' + i + j} className='grid' onDrop={this.drop} onDragOver={this.allowDrop}>{'' + i + j}</td>)
      }
      a.push(<tr key={'c' +i}>{b}</tr>);
    }
    return (<table>{a}</table>);
  }

  render() {
    let a = this.createTable(this.props.rows, this.props.cols);
    return (<div>{a}</div>);
  }
}

export default class MakeShelf extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   rows: 0,
    //   cols: 0
    // };
  }
  getRows(e) {
    console.log(e.target.value);
    this.setState({ rows: e.target.value });
  }
  getCols(e) {
    console.log(e.target.value);
    this.setState({ cols: e.target.value });
  }

  showShelf(e) {
    let rows = this.state.rows;
    let cols = this.state.cols;
    ReactDOM.render(
      <CreateShelf rows={rows} cols={cols} />,
      document.getElementById('plane')
    );
  }
 
  render() {
    return (
      <div style={{marginLeft:20}}>
      行数：<input type="text" onChange={this.getRows.bind(this)} name="rows" style={{ marginRight: 20 }} />
      列数：<input type="text" onChange={this.getCols.bind(this)} name="cols" style={{ marginRight: 20 }} />              
      
      <Button type="primary" onClick={this.showShelf.bind(this)} style={{ marginBottom: 10 }}>Create</Button>

      <div id="plane"> </div>
    </div>
    )
  }
}