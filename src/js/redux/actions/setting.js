export const ADD_COLL = 'ADD_COLL'
export const DEL_COLL = 'DEL_COLL'

export const addColl = (column) => ({
    type: 'ADD_COLL',
    column
  })

export const delColl = (id) => ({
    type: 'DEL_COLL',
    id
  })