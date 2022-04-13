// let baseUrl = 'https://crm-mp-webapi-dev.sunacctg.com/wxapp-mcenter/api/' //  开发
import { config } from './config.js'
// let baseUrl = 'https://crm-mp-member-dev.sunacctg.com/api/' //  测试
console.log(config)
//带参数的post请求
function getRequestWithParameter(requestData) {
  console.log(config)
  //logRequest(requestData)   //打印请求地址和请求参数
  return new Promise((reslove, reject) => {
    const requestTask = wx.Request({
      url: config.BaseUrl + requestData.endPoint,   //接口地址
      data: requestData.data,   //参数
      method: 'GET',
      responseType: requestData.responseType || '',
      header: {
        "Content-Type": "application/json"
      },
      success: (res)=>{
        reslove(res.data)
      },
      fail: (err)=>{
        reject(err)
      }
    })
  })
  return requestTask;
}
function RequestWithUpload(path) {
  // 上传地点
  return new Promise((reslove,reject)=>{
    wx.uploadFile({
      url: config.BaseUrl + '/api/park/union/file/upload',   //接口地址
      filePath: path,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      success: function(res) {
        console.log(res)
        reslove(res)
      },
      reject: function(err) {
        reject(err)
      }
    }) 
  })
}

module.exports = {
  getRequestWithParameter: getRequestWithParameter,
  RequestWithUpload: RequestWithUpload
}