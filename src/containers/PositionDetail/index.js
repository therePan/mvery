/**
 * Created by huangchao on 2017/10/10.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { NavBar, Modal } from 'antd-mobile'
import Clipboard from 'clipboard'
import {connect} from 'react-redux'
import style from './style.less'
import ShowArticle from '../../components/ShowArticle'
import RestPosition from '../../components/RestPosition'
import PositionBar from '../../components/PositionBar'
import JobDetailsCard from '../../components/JobDetailsCard'
import HotelEntry from '../../components/HotelEntry'
import article from '@static/artlcle@3x.png'
import rest from '@static/rest@3x.png'
import share from '@static/share@3x.png'
import {positiondetail, emptyInfo} from '../../actions/position'
// import LisetItem from '../../components/ListItem'

@connect((state) => ({
  position: state.position,
}))
class PositionDetail extends React.Component {

  share = () => {
    const shareLink = window.location.href
    // const shareImg = this.props.user.portrait_url
    if (navigator.userAgent.indexOf('UCBrowser') > -1 && window.ucbrowser) { // uc  浏览器
      const shareArgs = ['简历分享', '快来看看我的简历吧', shareLink, '', '', '\n@' + window.location.host, '']
      return window.ucbrowser.web_share(...shareArgs)
    }
    Modal.alert(
      Clipboard.isSupported() ? '链接已经复制到剪贴板' : '长按分享此链接',
      <p style={{wordWrap: 'break-word'}}>{shareLink}</p>, [
        { text: '确定', style: 'default' },
      ])
  }
  nextPost = (job_id, c_userid) => {
    this.props.history.replace(`/${c_userid}/${job_id}`)
    this.props.dispatch(positiondetail({
      job_id: job_id,
    }))
    window.location.reload()
  }
  componentDidMount() {
    // console.log(this.props)
    const href = window.location.href
    const jobId = this.props.match.params.job_id
    this.props.dispatch(positiondetail({
      job_id: jobId,
    }))
    this.clipboard = Clipboard.isSupported() && new Clipboard(this.refs.share, {
      text: () => `${href}`,
    })
  }
  componentWillUnmount() {
    Clipboard.isSupported() && this.clipboard.destroy()
    this.props.dispatch(emptyInfo)
  }
  render() {
    // console.log(jobId)
    const company = this.props.position.company_detail || {}
    const list = this.props.position.list || []
    const data = this.props.position
    return (
      <div className={style.PositionDetailWrap}>
        <NavBar
          mode="dark"
          onLeftClick={() => {this.props.history.go(-1)}}
          rightContent={<div onClick={this.share} className={style.share} key="1">
            <img src={share} alt="分享" ref="share" />
          </div>}
        >职位详情</NavBar>
        <div className={style.connent}>
          <JobDetailsCard {...this.props} />
          <div>
            <Link to={`/${company.company_id}`}>
              <HotelEntry {...this.props} />
            </Link>
          </div>
          <ShowArticle type="1" title="职位介绍" src={article} data={data} {...this.props}/>
          <RestPosition callback={this.nextPost} title="其他职位推荐" src={rest} data={list} />
        </div>
        <PositionBar {...this.props} />
      </div>
    )
  }
}

export default PositionDetail
