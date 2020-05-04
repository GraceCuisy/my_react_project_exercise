// 统一管理项目的ajax请求
import ajax from './ajax';

export const reqLogin=(loginObj)=>ajax.post('/login',loginObj);

