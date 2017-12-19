/**
 * Created by huangchao on 2017/10/12. BusinessLetter
 */
import React, { Component } from 'react'
import style from './style.less'
import {connect} from 'react-redux'
import JobCard from '../../components/JobCard'
import ForMassageWrap from '../../components/ForMassage'
import { NavBar } from 'antd-mobile'
import {messageDetail} from '../../actions/SystemMessage'
// import PropTypes from 'prop-types'

@connect(state => {
  return {
    detail: state.SystemMessage.detail,
  }
})
class BusinessLetter extends Component {
  static propTypes = {
  }

  goPosition = (job_id, comapny_id) => {
    this.props.history.push(`/${comapny_id}/${job_id}`)
  }

  componentWillMount() {
    const messageId = this.props.match.params.message_id
    this.props.dispatch(messageDetail({message_id: messageId}))
  }

  render() {
    // console.log(this.props.detail)
    const {detail} = this.props
    const jobInfo = this.props.detail.job_info || {}
    return (
      <div className={style.BusinessLetterWrap}>
        <NavBar
          mode="dark"
          onLeftClick={() => {this.props.history.go(-1)}}
        >{detail.type === 1 ? '系统消息' : '企业来信'}</NavBar>
        <div>
          {detail.type === 1? null
            : <div className={style.position} onClick={() => this.goPosition(jobInfo.job_id, jobInfo.c_userid)}>
              <JobCard data={detail.job_info} />
            </div>}
        </div>
        <ForMassageWrap {...detail} />
      </div>
    )
  }
}

export default BusinessLetter
