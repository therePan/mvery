/**
 * Created by huangchao on 2017/9/25.
 */
import React, { Component } from 'react'
import style from './style.less'
import {connect} from 'react-redux'
import contant from '@static/contant@3x.png'
import selectCompany from '@static/selectCompany.png'
import unSelectCompany from '@static/unSelectCompany@3x.png'
import {companyCollect, companyUnCollect} from '../../actions/company'
import { Toast } from 'antd-mobile'
import store from 'store'


@connect((state) => ({
}))
class CompanyBar extends Component {
  state = {
    init: true,
  }
  select = () => {
    const isFollowed = this.props.company.is_followed
    const companyId = this.props.company.company_id
    const auth = store.get('m:auth') || {}
    if(auth.user_id) {
      if(isFollowed === 1) {
        this.props.dispatch(companyUnCollect({
          company_id: companyId,
        })).then((data) => {
          Toast.success('取消关注', 1)
        })
      }else {
        this.props.dispatch(companyCollect({
          company_id: companyId,
        })).then((data) => {
          if (data.status === 0) return Toast.info(data.errMsg, 1)
          Toast.success('关注成功', 1)
        })
      }
    } else {
      Toast.info('请先登录', 1)
    }
  }
  render() {
    const data = this.props.company
    return (
      <div className={style.CompanyBarWrap}>
        <a href={`tel:${data.contact_phone || data.contact_tel}`}>
          <div className={style.contantOus}>
            <img src={contant} alt="img1" />
            <span>联系我们</span>
          </div>
        </a>
        <div onClick={this.select} className={`${style.selectCom} ${data.is_followed === 1 ? style.has : null}`}>
          <img src={data.is_followed === 1 ? selectCompany : unSelectCompany} alt="img2" />
          <span>{data.is_followed === 1 ? '已关注企业' : '关注企业'}</span>
        </div>
      </div>
    )
  }
}

export default CompanyBar
