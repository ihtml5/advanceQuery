import * as types from '../constants/ActionTypes'

export function addLine() {
  return { type: types.ADD_LINE};
}

export function removeLine() {
  return { type: types.REMOVE_LINE};
}

export function switchTab(tab) {
  return { type: types.SWITCH_TAB, tab};
}
