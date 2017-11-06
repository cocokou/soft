// 120.25.95.23 15678
var colum_api = 'http://120.25.95.23:15678/zds/dynamic/column';
var data_api = 'http://120.25.95.23:15678/zds/dynamic/data';
var headers = {
  "Content-type": "application/json; charset=UTF-8"
}
export function getallcolumn(moduleName) {
  return fetch(`${colum_api}/${moduleName}`, {
    method: "POST",
    mode: "cors",
    headers: headers,
    body: JSON.stringify({
      action: "getall",
      data: {}
    })
  }).then(res => res.json())
}

export function addColumn(moduleName,column) {
  return fetch(`${colum_api}/${moduleName}`, {
    method: "POST",
    mode: "cors",
    headers: headers,
    body: JSON.stringify({
      action: "add",
      data: column
    })
  }).then(res => res.json())
}
export function delColumn(moduleName,id) {
  return fetch(`${colum_api}/${moduleName}`, {
    method: "POST",
    mode: "cors",
    headers: headers,
    body: JSON.stringify({
      action: "delete",
      data: {id:id}
    })
  }).then(res => res.json())
}
export function updateColumn(moduleName,id,column) {
  return fetch(`${colum_api}/${moduleName}`, {
    method: "POST",
    mode: "cors",
    headers: headers,
    body: JSON.stringify({
      action: "update",
      data: {
        query:{id:id},
        doc:column
      }
    })
  }).then(res => res.json())
}

//-----------------------------------------------
export function getalldata(moduleName) {
  return fetch(`${data_api}/${moduleName}`, {
    method: "POST",
    mode: "cors",
    headers: headers,
    body: JSON.stringify({
      action: "getall",
      data: {}
    })
  }).then(res => res.json())
}

export function addData(moduleName,column) {
  return fetch(`${data_api}/${moduleName}`, {
    method: "POST",
    mode: "cors",
    headers: headers,
    body: JSON.stringify({
      action: "add",
      data: column
    })
  }).then(res => res.json())
}
export function delData(moduleName,id) {
  return fetch(`${data_api}/${moduleName}`, {
    method: "POST",
    mode: "cors",
    headers: headers,
    body: JSON.stringify({
      action: "delete",
      data: {_id:id}
    })
  }).then(res => res.json())
}
export function updateData(moduleName,id,column) {
  console.log("updateData:",column)
  return fetch(`${data_api}/${moduleName}`, {
    method: "POST",
    mode: "cors",
    headers: headers,
    body: JSON.stringify({
      action: "update",
      data: {
        query:{_id:id},
        doc:column
      }
    })
  }).then(res => res.json())
}