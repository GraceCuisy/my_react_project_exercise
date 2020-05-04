/* 该文件是对axios的二次封装
    1.配置请求的基础路径
		2.配置超时时间
		3.统一处理post请求json编码问题（转为urlencoded）
		4.统一返回真正的数据data，而不是response对象
		5.统一处理错误 */
import axios from "axios";
import qs from "querystring";
import { message as msg} from 'antd';
// 配置基础路径
axios.defaults.baseURL='http://localhost:3000';
// 配置请求超时时间
axios.defaults.timeout=2000;

// 配置请求拦截器,统一处理参数json编码问题
axios.interceptors.request.use((config)=>{
  // console.log(config);
  const {method,data}=config;
  if(method.toLowerCase()==='post' && data instanceof Object){
    config.data=qs.stringify(data);
  }
  return config;
})

// 配置响应拦截器,返回的是response.data,
// 统一处理错误
axios.interceptors.response.use(
  response=>{
    return response.data;
  },
  error=>{
    let errorMsg='未知错误,请联系管理员解决';
    const {message}=error;
    if(message.indexOf('401')!==-1){errorMsg='身份过期,请重新登录'}
    else if(message.indexOf('timeout')!==-1){errorMsg='网络不稳定,请稍后重试'}
    else if(message.indexOf('Network Error')!==-1){errorMsg='请检查网络'}
    msg.error(errorMsg,1) //第二个参数,控制弹窗多长时间消失
    return new Promise(()=>{}); //响应拦截器统一处理错误,在组件中就不用再单独处理了
  }
)
export default axios;