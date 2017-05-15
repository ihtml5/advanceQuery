'use strict';

import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

class QuerySelect extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let selectKeyCls = this.props.selectKey ? this.props.selectKey : 'query';
    return (
      <select className={`${selectKeyCls} npc-search-select`} onChange={(event)=> {
        this.props.changeHandler(event)
      }} defaultValue={this.props.lastVal}>
      {/*<option selected value="">请选择要查询的项</option>*/}
      {
        this.props.data.listofName.map((option,index) => {
          return (<option key={`${this.props.selectKey} ${index}`} value={this.props.data.listofVal[index]}>{option}</option>);
        })
      }</select>
    );
  }
}

export default QuerySelect;
