export default function switchTab(state= {current: 'basicInfo'}, action) {
  switch(action.type){
    case 'SWITCH_TAB':
      return $.extend({},state,{current: action.text});
    default:
      return state;
  }
}
