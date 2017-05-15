'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import QueryLine from './QueryLine';
import QueryTab from './QueryTab';
import $ from 'jquery';
class QueryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'basicInfo',
            countArr: [1, 1, 1],
            queryObj: {},
            curIndex: [
                [0],
                [0],
                [0]
            ],
            curName: '',
        };
        this.setPstate = this.setPstate.bind(this);
    }
    walk(obj) {
        if (Object.prototype.toString.call(Object(obj)) == '[Object object]') {
            this.setState({
                queryObj: obj
            });
        }
    }
    setPstate(obj) {
        this.setState(obj);
    }
    doSearch() {
        console.clear();
        console.log(this.state.queryObj);
        let outputObj = {};
        let queryObj = $.extend({}, this.state.queryObj);
        for (var q in queryObj) {
            if (queryObj[q][0]) {
                outputObj[q] = queryObj[q].join(',');
            } else {
                outputObj[q] = queryObj[q].join(',').slice(1);
            }
        }
        $.ajax({
            url: 'generateQueryHash.shtml',
            method: "POST",
            contentType: 'charset=utf-8;',
            data: outputObj,
            success: function(data) {
                $('table').bootstrapTable('refresh', {
                    url: rootPath + "/statistics/advancedSearchStatistics.shtml?query=" + data
                });
            }
        });
        console.log(outputObj);
    }
    addLines() {
        let max = this.props.maxLength;
        let tabKeys = this.props.tabs.map((tab, index) => {
            return tab['index'];
        });
        let tabPos = tabKeys.indexOf(this.state.current);
        let countArr = [...this.state.countArr];
        let curIndexArr = [...this.state.curIndex];
        this.setState(function(previousState, currentProps) {
            if (previousState.countArr[tabPos] === max) {
                alert(`最多${previousState.countArr[tabPos]}行`);
                return;
            }
            countArr[tabPos] = previousState.countArr[tabPos] + 1;
            curIndexArr[tabPos][previousState.countArr[tabPos]] = 0;
            //console.log('curIndexArr',curIndexArr);
            return {
                countArr: countArr,
                curIndex: curIndexArr
            }
        });
        $('.fixed-table-container').height($(window).height() - $('#root').height() - 250);
        $('.fixed-table-body').height($(window).height() - $('#root').height() - 250);
        $('table').height({
            'height': $(window).height() - $('#root').height() - 150 + 'px'
        });
    }
    removeLines() {
        let tabKeys = this.props.tabs.map((tab, index) => {
            return tab['index']
        });
        let tabPos = tabKeys.indexOf(this.state.current);
        let countArr = [...this.state.countArr];
        let curIndexArr = [...this.state.curIndex];
        let queryObj = Object.assign({}, this.state.queryObj);
        if (queryObj[`query${tabPos}`] && queryObj[`query${tabPos}`].length) {
            queryObj[`query${tabPos}`].length = queryObj[`query${tabPos}`].length - 1;
            delete queryObj[`query${tabPos}`][this.state.countArr[tabPos] - 1];
        }
        queryObj[`query${tabPos+3}`] && delete queryObj[`query${tabPos+3}`][this.state.countArr[tabPos] - 1];
        this.setState(function(previousState, currentProps) {
            if (previousState.countArr[tabPos] === 1) {
                alert(`最少${previousState.countArr[tabPos]}行`);
                return;
            }
            countArr[tabPos] = previousState.countArr[tabPos] - 1;
            curIndexArr[tabPos][previousState.countArr[tabPos]] = 0;
            return {
                countArr: countArr,
                curIndex: curIndexArr,
                queryObj: queryObj
            }
        });
        $('.fixed-table-container').height($(window).height() - $('#root').height() - 200);
        $('.fixed-table-body').height($(window).height() - $('#root').height() - 200);
        $('table').height({
            'height': $(window).height() - $('#root').height() - 150 + 'px'
        });
        //console.log(curIndexArr);
    }
    switchTab(event) {
        if (event.target.tagName !== 'LI') return;
        let cls = event.target.className.split(' ');
        let tabKeys = this.props.tabs.map((tab, index) => {
            return tab['index']
        });
        let tabPos = tabKeys.indexOf(this.state.current);
        let $tabLis = $('.npc-queryCateory').find('li');
        $tabLis.removeClass('npc-cateoryActive').addClass('npc-nocateoryActive');
        $(event.target).addClass('npc-cateoryActive');
        this.setState(function(previousState, currentProps) {
            return {
                current: cls[0]
            }
        });
    }
    render() {
        let tabKeys = this.props.tabs.map((tab, index) => {
            return tab['index'];
        });
        let tabPos = tabKeys.indexOf(this.state.current);
        let count = this.state.countArr[tabPos];
        let times = [];
        while (count > 0) {
            times.push(count);
            --count;
        }
        //console.log(this.state.curIndex);
        /*
        des: bug: new Array(num) don't work
        let times = new Array(count);
        */
        return ( < div className = "npc-advance-form" >
            < QueryTab tabs = { this.props.tabs }
            switchTab = { this.switchTab.bind(this) }
            /> < div className = "npc-advance-lineWrapper" > {
            times.map((itime, index) => {
                return <QueryLine tabs = { this.props.tabs }
                linetime = { index }
                curIndex = { this.state.curIndex }
                setPstate = { this.setPstate }
                walk = { this.walk }
                key = { index }
                queryObj = { this.state.queryObj }
                tabKey = { this.state.current }
                data = { this.props.tabData }
                />
            })
        } < /div> < div className = "npc-advance-btns" > < button className = "btn btn-info"
        onClick = { this.addLines.bind(this) } >
            < i className = "fa fa-plus" > < /i>增加 < /button > < button className = "btn btn-danger"
        onClick = { this.removeLines.bind(this) } >
            < i className = "fa fa-minus" > < /i>
        减少 < /button> < button className = "btn btn-warning"
        onClick = { this.doSearch.bind(this) } >
            < i className = "fa fa-search" > < /i>
        查询 < /button> < /div > < /div>
    );
}
}

export default QueryContainer;