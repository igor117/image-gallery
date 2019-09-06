export function createActionTypes(base, actions = []) {
  return actions.reduce((acc, type) => {
    acc[type] = `${base}_${type}`

    return acc
  }, {})
}

export function createAction(type, data = {}) {
  return { type, payload: data }
}

export const PAGE_SIZE = 12;
export const FIRST_PAGE = 0;
export const PREV_PAGE = 1;
export const NEXT_PAGE = 2;
export const LAST_PAGE = 3;
