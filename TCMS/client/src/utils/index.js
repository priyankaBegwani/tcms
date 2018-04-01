import request from './request';
import { ErrorCode } from '../constants';

export function validate(obj) {
    const { value, min, regex } = obj;
    return value.length >= min && regex.test(value);
}

export function fetchService(config) {
    const that = this;
    let option = Object.assign({}, {
        "method": config.method || "GET",
        "headers": {
            "Content-Type": config.contentType || "application/json; charset=UTF-8"
        },
        "credentials" : 'include'
    }, config);
    if (config.method == "GET") {
        delete option.body
    }

    request(config.url, option).then(response => {
      console.log("response >>",response);
      if(response.success && response.data) {
        typeof config.callBack == "function" && config.callBack(response.data);
      }else{
        const messageObj = {};
        if (response.message) {
            messageObj.message = response.message;
        }
        that.props.showErrorMessageBox(messageObj);
      }
    }).catch(error => {

      if (error.responseCode === ErrorCode.SOMETHING_WRONG) {
         if (typeof config.failure == "function"){
           config.failure(error);
         } else{
            that.props.showErrorMessageBox();
         }

      } /*else if(){
        typeof config.failure == "function" && config.failure(response.data);
      }*/else {
        throw error;
      }
    });
}

export function debounce(){
    let interval = undefined;
    return (method, milliseconds) => {
        interval && clearTimeout(interval);
        interval = setTimeout(() => {
            typeof method == "function" && method();
        },milliseconds);
    }
}
