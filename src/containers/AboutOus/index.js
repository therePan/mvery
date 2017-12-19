/**
 * Created by huangchao on 2017/11/3.
 */
import React, { Component } from 'react'
// import {connect} from 'react-redux'
import { NavBar } from 'antd-mobile'
import style from './style.less'
import logo from '@static/logo.png'
// import LisetItem from '../../components/ListItem'
// import { NavBar, Toast } from 'antd-mobile'

class AboutOus extends Component {

  render() {
    return (
      <div className={style.AboutOusWrap}>
        <NavBar
          mode="dark"
          onLeftClick={() => {this.props.history.go(-1)}}
        >关于我们</NavBar>
        <div className={style.top}>
          <img src={logo} alt="logo" />
          <p className={style.version}>v5.1.2</p>
          <div className={style.introduce}>
            最佳东方成立于2003年，是旅游服务业专业的招聘平
            台，隶属杭州东方网升科技股份有限公司。目前，最佳
            东方平台入驻企业已累计达6w+家，覆盖全国34个省
            市、自治区和港澳特别行政区以及十多个(包括英国、
            美国、迪拜、马尔代夫等)海外国家和地区，服务涵盖
            酒店、餐饮、公寓、海外、邮轮、物业、航空、景区、
            养老、地产等领域，充足的岗位为个人求职提供多方向
            的选择，在最短的时间内找到适合自己的工作。
          </div>
        </div>
        <div className={style.middle}>
          <div className={style.item}>
            <span className={style.title}>官方网站：</span>
            <span className={style.value}>www.veryeast.cn</span>
          </div>
          <div className={style.item}>
            <span className={style.title}>移动官网：</span>
            <span className={style.value}>m.veryast.cn</span>
          </div>
          <div className={style.item}>
            <span className={style.title}>服务热线：</span>
            <span className={style.value}>400-826-0101</span>
          </div>
          <div className={style.item}>
            <span className={style.title}>官方微信：</span>
            <span className={style.font}>最佳东方</span>
          </div>
          <div className={style.item}>
            <span className={style.title}>官方微博：</span>
            <span className={style.font}>@最佳东方</span>
          </div>
        </div>
      </div>
    )
  }
}

export default AboutOus