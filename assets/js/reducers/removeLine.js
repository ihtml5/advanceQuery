export default function removeLine(state= {},action) {
  switch(action.type){
    case 'REMOVE_LINE':
        return $.extend({},state);
    default:
      return state;
  }
}
