export default [
  {
  'key': 'device_management',
  "name": '位置管理',
  "link": [
  {
    "key": 'RoomAccess',
    "name": "人员管理",
    "link": '/dm/room'
  },
  {
    "key": 'DevicePoint',
    "name": "位置管理",
    "link": '/dm/position'
  } ,
  {
    "key": 'monitorPoint',
    "name": "位置monitor",
    "link": '/dm/devicemonitor'
  } ,
  {
    "key": 'DeviceViewAccess',
    "name": "设备列表",
    "link": '/dm/device'
  },
  {
    "key": 'DeviceOrg',
    "name": "部门列表",
    "link": '/dm/org'
  }
]
},
{
  "key": 'auth_management',
  "name": '资产管理',
  "link": [
  {
    "key": 'menuManager',
    "name": '菜单管理',
    "link": '/am/menu',
  
  },
  {
    "key": '系统设置',
    "name": '系统设置',
    "link": '/am/test'
  },
  {
    "key": 'emma',
    "name": '物资编码',
    "link": '/am/emma'
  },
]
},

]