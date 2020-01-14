import axios from 'axios';
import {showLoading, hideLoading} from './loading'
import {Message} from 'element-ui';
import store from "../store";

axios.defaults.timeout = 5000;
axios.defaults.baseURL = process.env.API_ROOT;

//http request 请求拦截器
axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/json'
    }
    if (store.state.showLoading) {
      //根据标记显示loading,防止有些请求不需要loading
      showLoading();
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


//http response 响应拦截器
axios.interceptors.response.use(
  response => {
    hideLoading();
    if (response.data.errCode == 2) {
      router.push({
        path: "/login",
        querry: {redirect: router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        if (response.data.code === 200) {
          resolve(response.data);
        } else {
          Message.error(response.data.massage)
        }
      })
      .catch(err => {
        Message.error("请求错误,请重试!");
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        if (response.data.code === 200) {
          resolve(response.data);
        } else {
          Message.error(response.data.message)
        }
      }).catch(err => {
      Message.error("请求错误,请重试!");
      reject(err)
    })
  })
}

