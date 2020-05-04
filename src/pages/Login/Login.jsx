import React, { Component } from 'react';
import {reqLogin} from "../../api/index";
// 引入antd
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Logo from "./images/logo.png";
import "./css/login.less";
const {Item}=Form;

/*
   用户名/密码的的合法性要求
     1). 必须输入
     2). 必须大于等于4位
     3). 必须小于等于12位
     4). 必须是英文、数字或下划线组成*/
export default class Login extends Component {
  onFinish=async (values) => {//提交表单且数据验证成功后回调事件
    // 向服务器发送请求,请求登录
    //存在问题:被同源策略阻挡 参数写对象,axios底层把对象转成了json串
    // axios.post('http://localhost:4000/login',values);
    const result=await reqLogin(values)
    console.log('登录成功了',result);
  };
  // 密码的自定义校验器
  pswValidator=(_,value="")=>{
    let errMsgs=[];
    if(!value.trim()) Promise.reject('必须输入');
    if(value.length < 4) errMsgs.push('必须大于等于4位');
    if(value.length > 12) errMsgs.push('必须小于等于12位');
    if(!(/^\w+$/).test(value)) errMsgs.push('必须是英文、数字或下划线组成');

    if(errMsgs.length>0){
      return Promise.reject(errMsgs);
    }else{
      return Promise.resolve();
    }
  }

  render() {
    return (
      <div className='login'>
        <header>
          <img src={Logo} alt="WebPageIcon"/>
          <h1>商品管理系统</h1>
        </header>
        <section>
          <span>用户登录</span>
          {/* 引入antd的form表单 */}
          <Form
            className="login-form"
            onFinish={this.onFinish}
          >
            <Item 
              name="username"
              rules={[
                { required: true, message: '用户名必须输入' },
                {min:4,message:'必须大于等于4位'},
                {max:12,message:'必须小于等于12位'},
                {pattern:(/^\w+$/),message:'必须是英文、数字或下划线组成'},
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名"/>
            </Item>
            <Item 
              name="password"
              rules={[
                {validator:this.pswValidator}
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}
