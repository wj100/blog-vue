window.g = {
  AXIOS_TIMEOUT: 10000,
  ApiUrl: "http://192.168.2.32:8081/data-store", // 配置服务器地址,
  ParentPage: {
    CrossDomainProxyUrl: '/Home/CrossDomainProxy',
    BtnsApi: '/api/services/app/Authorization/GetBtns',
    OrgsApi: '/api/services/app/authorization/GetOrgsByUserId'
  }
}
