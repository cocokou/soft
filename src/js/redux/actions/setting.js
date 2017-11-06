export const ADD_COLL = 'ADD_COLL'
export const DEL_COLL = 'DEL_COLL'
export const GET_ALL_COLL = 'GET_ALL_COLL'
export const addColl = (field) => ({
    type: 'ADD_COLL',
    field
  })

export const delColl = (id) => ({
    type: 'DEL_COLL',
    id
  })
export const getAllColl = (columns) => ({
  type:'GET_ALL_COLL',
  columns:columns
})