'use strict';

import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import QuerySelect from './QuerySelect';
import { DatePicker } from 'antd';
class QueryLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curIndex: 0,
      curName: ''
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }
  changeHandler() {
     let data = this.props.data;
     let tabKey = this.props.tabKey;
     let curIndexArr = this.props.curIndex;
     let evt = null;
     let isRepeat = false;
     arguments[2] ? evt = arguments[2] : evt = event;
     let selectVal = evt.target.value;
     let selectPos = data[tabKey]['listofVal'].indexOf(selectVal);
     let outputObj = this.props.queryObj;
     let pos = ['queryName','queryOperator','queryVal'].indexOf(arguments[0]);
     let tabKeys = this.props.tabs.map((tab,index) => {
       return tab['index'];
     });
     let tabPos = tabKeys.indexOf(tabKey);
     let outputArr = new Array(5);
     if (evt.target.value.length === 0) {
       pos === 0 && delete outputObj[`query${tabPos}`][this.props.linetime];
       this.props.setPstate({
         queryObj: outputObj
       });
       evt.stopPropagation() && evt.preventDefault();
       return;
     }
     if (pos>-1 ) {
       //console.clear();
       console.log(outputObj);
       outputObj[`query${tabPos}`] = outputObj[`query${tabPos}`] || [];
      //  outputObj[`query${tabPos}`].map(function(oarr,idx) {
      //    if (oarr.indexOf(evt.target.value)>-1 && pos === 0) {
      //      isRepeat = true;
      //    }
      //  });
      //  if(isRepeat) {
      //    event.stopPropagation() && event.preventDefault();
      //    alert('你已选择,请选择其他');
      //    return;
      //  }
       outputArr = outputObj[`query${tabPos}`] && outputObj[`query${tabPos}`][this.props.linetime] ? outputObj[`query${tabPos}`][this.props.linetime].split('#') : [];
       outputArr[pos] = evt.target.value;
       outputArr[3] = pos===0? data[tabKey]['valType'][selectPos]: outputArr[3] || '';
       outputArr[4] = Number(this.props.linetime) + 1;
       console.log(data[tabKey]['valType'][selectPos],selectPos,outputArr);
       outputObj[`query${tabPos}`] = outputObj[`query${tabPos}`] || [];
       outputObj[`query${tabPos}`][this.props.linetime] = outputArr.join('#');
     } else {
       outputArr = outputObj[`query${tabPos+3}`] && outputObj[`query${tabPos+3}`][this.props.linetime] ? outputObj[`query${tabPos+3}`] : [];
       outputObj[`query${tabPos+3}`] = outputObj[`query${tabPos+3}`] || [];
       outputObj[`query${tabPos+3}`][this.props.linetime] = `${evt.target.value}#${Number(this.props.linetime)+1}`;
     }
     if (pos === 0) {
       curIndexArr[tabPos][this.props.linetime] = selectPos;
       this.setState({
           curIndex: selectPos,
           curName: selectVal
        });
       this.props.setPstate({
         curIndex: curIndexArr,
         curName: selectVal
       });
     }
     this.props.setPstate({
       queryObj: outputObj
     });
     //console.log(arguments[0],arguments[1],tabPos);
  }

  onDateChange(value, dateString) {
    let data = this.props.data;
    let selectVal = dateString;
    let tabKey = this.props.tabKey;
    let outputObj = this.props.queryObj;
    let tabKeys = this.props.tabs.map((tab,index) => {
      return tab['index'];
    });
    let tabPos = tabKeys.indexOf(tabKey);
    let outputArr = new Array(5);
    if (value.length === 0) {
      return;
    }
    outputObj[`query${tabPos}`] = outputObj[`query${tabPos}`] || [];
    outputArr = outputObj[`query${tabPos}`] && outputObj[`query${tabPos}`][this.props.linetime] ? outputObj[`query${tabPos}`][this.props.linetime].split('#') : [];
    outputArr[2] = dateString;
    outputArr[3] = outputArr[3] || '';
    outputArr[4] = Number(this.props.linetime) + 1;
    outputObj[`query${tabPos}`] = outputObj[`query${tabPos}`] || [];
    outputObj[`query${tabPos}`][this.props.linetime] = outputArr.join('#');
    this.props.setPstate({
      queryObj: outputObj
    });
    console.clear();
    console.log(dateString,outputObj);
  }

  render() {
    let firstLine = null;
    let rdata = this.props.data;
    let rtabKey = this.props.tabKey;
    let tabKeys = this.props.tabs.map((tab,index) => {
      return tab['index'];
    });
    let tabPos = tabKeys.indexOf(rtabKey);
    let lastVals = this.props.queryObj[`query${tabPos}`] || [];
    let ilastVals = lastVals[this.props.linetime] || '';
    let iilastVals = ilastVals.split('#') || '';
    let conlastVals = this.props.queryObj[`query${tabPos+3}`] || [];
    let iconlastVals = conlastVals[this.props.linetime] ? conlastVals[this.props.linetime].split('#')[0] : '';
    let relateCom = null;
    let relateChild = rdata[rtabKey].children[this.props.curIndex[tabPos][this.props.linetime] || 0];
    //console.clear();
    //console.log(this.props.curIndex.length,this.props.curIndex);
    //console.log(iilastVals,`query${tabPos}`,this.props.queryObj[`query${tabPos}`]);
    console.log('iconlastVals',iconlastVals);
    if (this.props.linetime) {
      firstLine = <QuerySelect lastVal={iconlastVals || ''} key={`${rtabKey}0`} data={this.props.data.consymbol} selectKey={'consymbol'} curIndex={this.props.curIndex} changeHandler={this.changeHandler.bind(this,'consymbol',this.props.linetime)}/>;
    } else {
      firstLine = <span className="npc-advance-space"></span>
    }
    if(!relateChild) {
      relateCom = <input key={`${rtabKey}${this.props.linetime}3`} defaultValue = {iilastVals[2] || ''} type="text" onChange={()=> {this.changeHandler('queryVal',this.props.linetime)}} placeholder={`请输入${this.props.curIndex[tabPos][this.props.linetime] === 0 ? '' : rdata[rtabKey]['listofName'][this.props.curIndex[tabPos][this.props.linetime]]}`}/>
    } else if (relateChild == 'DatePicker') {
      relateCom = <DatePicker onChange={this.onDateChange} defaultValue={iilastVals[2] || ''}/>
    } else {
      relateCom = <QuerySelect lastVal= {iilastVals[2] || ''} key={`${rtabKey}${this.props.linetime}3`} selectKey={'queryVal'} data={relateChild} changeHandler={this.changeHandler.bind(this,'queryVal',this.props.linetime)}/>;
    }
    return (
        <div className="am-form-group npc-advance-line">
          {/* 第一行和其他行不同，少一个操作符下拉框*/}
          {firstLine}
          <QuerySelect lastVal= {iilastVals[0] || ''} key={`${rtabKey}1`} data={rdata[rtabKey]} changeHandler={this.changeHandler.bind(this,'queryName',this.props.linetime)}/>
          <QuerySelect lastVal= {iilastVals[1] || ''} key={`${rtabKey}2`} data={ rdata[rtabKey].operator[this.props.curIndex[tabPos][this.props.linetime] || 0]} selectKey={'queryOperator'} changeHandler={this.changeHandler.bind(this,'queryOperator',this.props.linetime)}/>
          {/* rdata[rtabKey].children[this.props.curIndex[tabPos][this.props.linetime] || 0]? <QuerySelect lastVal= {iilastVals[2] || ''} key={`${rtabKey}${this.props.linetime}3`} selectKey={'queryVal'} data={rdata[rtabKey]['children'][this.props.curIndex[tabPos][this.props.linetime] || 0]} changeHandler={this.changeHandler.bind(this,'queryVal',this.props.linetime)}/> : <input key={`${rtabKey}${this.props.linetime}3`} defaultValue = {iilastVals[2] || ''} type="text" onChange={()=> {this.changeHandler('queryVal',this.props.linetime)}} placeholder={`请输入${this.props.curIndex[tabPos][this.props.linetime] === 0 ? '' : rdata[rtabKey]['listofName'][this.props.curIndex[tabPos][this.props.linetime]]}`}/> */}
          {relateCom}
        </div>
    );
  }
}

export default QueryLine;
