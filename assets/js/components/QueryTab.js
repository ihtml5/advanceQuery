'use strict';

import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
class QueryTab extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ul className="npc-ul npc-queryCateory" onMouseOver={this.props.switchTab}>
        {this.props.tabs.map(function(tab,index){
          return <li className={tab['active']? `${tab['index']} npc-cateoryActive` : tab['index']} key={index}>{tab['name']}</li>;
        })}
      </ul>
    );
  }
}

export default QueryTab;
