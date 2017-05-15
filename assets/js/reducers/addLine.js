import $ from 'jquery';
export default function addLine(state= {count:1}, action) {
  switch(action.type){
    case 'ADD_LINE':
      return $.extend({},state,{count: action.count});
    default:
      return state;
  }
}
