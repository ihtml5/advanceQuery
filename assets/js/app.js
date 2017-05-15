'use strict';

require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
import QueryContainer from './components/QueryContainer';
const store = configureStore();
const tabs = [
  {
    'name': '建议基本信息查询',
    'index': 'basicInfo',
    'active': true
  },
  {
    'name': '建议提出情况查询',
    'index': 'putInfo'
  },
  {
    'name': '建议办理情况查询',
    'index': 'dealInfo'
  },
];
const tabData = {
  // operator: {
  //     listofName: ['请选择操作符','等于','不等于','包含','不包含','大于','小于','大于等于','小于等于','为空','不为空'],
  //     listofVal: ['',1,2,3,4,5,6,7,8,9,10]
  // },
  consymbol: {
    listofName: ['请选择连接符','并且','并且(',')并且','或者','或者(',')或者','(',')'],
    listofVal: ['',1,2,3,4,5,6,7,8]
  },
  /*基本查询*/
  basicInfo: {
      listofName: ['请选择要查询的项','建议编号','建议题目','主题代表','建议人数(附议人数)','是否代表团建议',
                  '主题词','办理方式','解决程度','是否补办','建议类别',
                  '代表是否公开','审核组是否公开','承办单位是否公开'],
      listofVal:  ['','proposalCode','title','proposerName','secondedCount','insteadProposerId',
            'subjectWord','unitHandleWay','solveDegree','isReHandle','proposalType','deputyIsPublic',
            'groupIsPublic','unitIsPublic'],
      children:[
      null,
      null,
      null,
      null,
      {
        listofName: ['请选择人数','1人','2人','3人','4人','5人','6人','7人','8人','9人','10人','11人'],
        listofVal:  ['',1,2,3,4,5,6,7,8,9,10,11]
      },
      {
        listofName: ['请选择','是','否'],
        listofVal:  ['',1,2]
      },
      null,
      {
        listofName: ['请选择','单办','主会办','参考'],
        listofVal:  ['',1,2,3]
      },
      {
        listofName: ['请选择','A类：吸纳代表建议，问题在办理期限内解决的',
                        'B类：吸纳代表建议，列入工作计划的',
          'C类：受法规、政策、财力和物力等客观条件限制，无法吸纳代表建议，向代表说明解释或作为一般性工作参考的'],
        listofVal: ['',1,2,3]
      },
      {
        listofName: ['请选择','是','否'],
        listofVal: ['',1,2]
      },
      {
        listofName: ['请选择','具体事务','政策调整完善','工作作风改进','城市规划调整','基本建设项目','体质机制改革',
                  '法规制定修改','一般性工作建议','管理服务完善'],
        listofVal: ['',1,2,3,4,5,6,7,8,9]
      },
      {
        listofName: ['请选择','是','否'],
        listofVal: ['',1,2]
      },
      {
        listofName: ['请选择','是','否'],
        listofVal: ['',1,2]
      },
      {
        listofName: ['请选择','是','否'],
        listofVal: ['',1,2]
      }],
      valType:[2,2,2,2,1,2,2,1,1,1,1,1,1],
      operator: [
      {
        listofName: ['请选择操作符'],
        listofVal: ['']
      },
      {
        listofName: ['请选择操作符','等于','不等于','包含','不包含','大于','小于','大于等于','小于等于','为空','不为空'],
        listofVal: ['',1,2,3,4,5,6,7,8,9,10]
      },
      {
        listofName: ['请选择操作符','等于','不等于','包含','不包含','为空','不为空'],
        listofVal: ['',1,2,3,4,9,10]
      },
      {
        listofName: ['请选择操作符','等于','不等于','包含','不包含','为空','不为空'],
        listofVal: ['',1,2,3,4,9,10]
      },
      {
        listofName: ['请选择操作符','等于','不等于','包含','不包含','大于','小于','大于等于','小于等于','为空','不为空'],
        listofVal: ['',1,2,3,4,5,6,7,8,9,10]
      },
      {
        listofName: ['请选择操作符','等于','为空','不为空'],
        listofVal: ['',1,9,10]
      },
      {
        listofName: ['请选择操作符','等于','不等于','包含','不包含','为空','不为空'],
        listofVal: ['',1,2,3,4,9,10]
      },
      {
        listofName: ['请选择操作符','等于','不等于','包含','不包含','为空','不为空'],
        listofVal: ['',1,2,3,4,9,10]
      },
      {
        listofName: ['请选择操作符','等于','不等于','包含','不包含','为空','不为空'],
        listofVal: ['',1,2,3,4,9,10]
      },
      {
        listofName: ['请选择操作符','等于','为空','不为空'],
        listofVal: ['',1,9,10]
      },
      {
        listofName: ['请选择操作符','等于','不等于','包含','不包含','为空','不为空'],
        listofVal: ['',1,2,3,4,9,10]
      },
      {
        listofName: ['请选择操作符','等于','为空','不为空'],
        listofVal: ['',1,9,10]
      },
      {
        listofName: ['请选择操作符','等于','为空','不为空'],
        listofVal: ['',1,9,10]
      },
      {
        listofName: ['请选择操作符','等于','为空','不为空'],
        listofVal: ['',1,9,10]
      }]
    },
  /* 建议提出 */
  putInfo: {
      listofName: ['请选择要查询的项','建议编号','代表编号','代表姓名','团别','是否主提代表'],
      listofVal: ['','proposalCode','deputyCode','proposerName','groupName','isMajorProposer'],
      children: [null,null,null,null,null,{
        listofName: ['请选择','是','否'],
        listofVal: ['',1,2]
      }],
      valType:[2,2,2,2,2,1],
      operator: [
        {
          listofName: ['请选择操作符'],
          listofVal: ['']
        },
        {
          listofName: ['请选择操作符','等于','不等于','包含','不包含','大于','小于','大于等于','小于等于','为空','不为空'],
          listofVal: ['',1,2,3,4,5,6,7,8,9,10]
        },
        {
          listofName: ['请选择操作符','等于','不等于','包含','不包含','大于','小于','大于等于','小于等于','为空','不为空'],
          listofVal: ['',1,2,3,4,5,6,7,8,9,10]
        },
        {
          listofName: ['请选择操作符','等于','不等于','包含','不包含','大于','小于','大于等于','小于等于','为空','不为空'],
          listofVal: ['',1,2,3,4,5,6,7,8,9,10]
        },
        {
          listofName: ['请选择操作符','等于','不等于','包含','不包含','大于','小于','大于等于','小于等于','为空','不为空'],
          listofVal: ['',1,2,3,4,5,6,7,8,9,10]
        },
        {
          listofName: ['请选择操作符','等于','为空','不为空'],
          listofVal: ['',1,9,10]
        }
    ]
  },
  /*建议处理*/
  dealInfo: {
      listofName: ['请选择要查询的项','单位编号','单位类别','单位名称','办理类型','交办日期','交办认可','办结日期','解决程度',
            '代表意见','答复方式','是否上传','代表具体意见'],
      listofVal: ['','code','unitType','unitName','handleWay','handleStartTime','isConfirm','handleFinishTime','solveDegree',
            'isFeedback','communicationWay','isHandle','feedback'],
      children:[null,null,{
        listofName: ['请选择','市人大','市委系统单位','市政府系统单位市政府系统单位.综合经济',
        '市政府系统单位.城建城管','市政府系统单位.教科文卫体','市政府系统单位.社会法制',
        '市政府系统单位.区、县','市政府系统单位.其他','市高法','市检察院','中央垂直管理单位'],
        listofVal: ['',1,2,3,4,5,6,7,8,9,10,11]
      },null,{
        listofName: ['请选择','单办','主办','会办'],
        listofVal: ['',1,2,3,]
      },'DatePicker',null,'DatePicker',{
        listofName: ['请选择','A类：吸纳代表建议，问题在办理期限内解决的',
        'B类：吸纳代表建议，列入工作计划的','C类：受法规、政策、财力和物力等客观条件限制，无法吸纳代表建议，向代表说明解释或作为一般性工作参考的'],
        listofVal: ['',1,2,3,]
      },{
        listofName: ['请选择','有意见','无意间','同意','不同意'],
        listofVal: ['',1,2,3,4]
      },{
        listofName: ['请选择','电话','信函','面谈','座谈会','其他'],
        listofVal: ['',1,2,3,4,5]
      },null,null],
      valType:[2,2,1,2,1,2,1,2,1,1,1,1,2],
      operator: [
        {
          listofName: ['请选择操作符'],
          listofVal: ['']
        },
        {
          listofName: ['请选择操作符','等于','不等于','包含','不包含','大于','小于','大于等于','小于等于','为空','不为空'],
          listofVal: ['',1,2,3,4,5,6,7,8,9,10]
        },
        {
          listofName: ['请选择操作符','等于','不等于','包含','不包含','大于','小于','大于等于','小于等于','为空','不为空'],
          listofVal: ['',1,2,3,4,5,6,7,8,9,10]
        },
        {
          listofName: ['请选择操作符','等于','不等于','包含','不包含','大于','小于','大于等于','小于等于','为空','不为空'],
          listofVal: ['',1,2,3,4,5,6,7,8,9,10]
        },
        {
          listofName: ['请选择操作符','等于','不等于','包含','不包含','为空','不为空'],
          listofVal: ['',1,2,3,4,9,10]
        },
        {
          listofName: ['请选择操作符','等于','不等于','大于','小于','大于等于','小于等于','为空','不为空'],
          listofVal: ['',1,2,5,6,7,8,9,10]
        },
        {
          listofName: ['请选择操作符','等于','不等于','包含','不包含','大于','小于','大于等于','小于等于','为空','不为空'],
          listofVal: ['',1,2,3,4,5,6,7,8,9,10]
        },
        {
          listofName: ['请选择操作符','等于','不等于','大于','小于','大于等于','小于等于','为空','不为空'],
          listofVal: ['',1,2,5,6,7,8,9,10]
        },
        {
          listofName: ['请选择操作符','等于','不等于','包含','不包含','大于','小于','大于等于','小于等于','为空','不为空'],
          listofVal: ['',1,2,3,4,5,6,7,8,9,10]
        },
        {
          listofName: ['请选择操作符','等于','不等于','包含','不包含','大于','小于','大于等于','小于等于','为空','不为空'],
          listofVal: ['',1,2,3,4,5,6,7,8,9,10]
        },
        {
          listofName: ['请选择操作符','等于','不等于','包含','不包含','大于','小于','大于等于','小于等于','为空','不为空'],
          listofVal: ['',1,2,3,4,5,6,7,8,9,10]
        },
        {
          listofName: ['请选择操作符','等于','为空','不为空'],
          listofVal: ['',1,9,10]
        },
        {
          listofName: ['请选择操作符','等于','不等于','包含','不包含','大于','小于','大于等于','小于等于','为空','不为空'],
          listofVal: ['',1,2,3,4,5,6,7,8,9,10]
        }
    ]
  }
};
const maxLength = 10;
const root = document.getElementById('root');
ReactDOM.render(<QueryContainer maxLength={maxLength} tabs={tabs} tabData={tabData}/>,root);