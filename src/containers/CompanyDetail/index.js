/**
 * Created by huangchao on 2017/10/10.
 */
import React from 'react'
import style from './style.less'
import { NavBar } from 'antd-mobile'
import {connect} from 'react-redux'
import ComInfor from '../../components/ComInfor'
import ShowArticle from '../../components/ShowArticle'
import Connection from '../../components/Connection/'
import RestPosition from '../../components/RestPosition'
import CompanyBar from '../../components/CompanyBar'
import {companydetail, companyList} from '../../actions/company'
import company from '@static/company@3x.png'
import rest from '@static/rest@3x.png'

@connect(state => {
  return {
    company: state.company,
    list: state.company.list,
  }
})
class CompanyDetail extends React.Component {

  nextPost = (job_id, c_userid) => {
    this.props.history.replace(`/${c_userid}/${job_id}`)
  }

  componentDidMount() {
    // console.log(this.props)
    const id = this.props.match.params.comapny_id
    this.props.dispatch(companydetail({ // 企业详细信息
      company_id: id,
    }))
    this.props.dispatch(companyList({ // 该企业其他职位
      company_id: id,
    }))
  }
  render() {
    // console.log(this.props.company)
    const data = this.props.company
    return (
      <div className={style.CompanyDetailWrap}>
        <NavBar
          mode="dark"
          onLeftClick={() => {this.props.history.go(-1)}}
        >企业介绍</NavBar>
        <div className={style.connent}>
          <ComInfor {...this.props}/>
          <ShowArticle type="2" title="公司介绍" src={company} data={data} />
          <Connection {...this.props} />
          <RestPosition callback={this.nextPost} title="该企业其他职位" src={rest} data={this.props.list} />
        </div>
        <CompanyBar {...this.props} />
      </div>
    )
  }
}

export default CompanyDetail
