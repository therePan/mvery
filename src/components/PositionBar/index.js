/**
 * Created by huangchao on 2017/9/25.
 *
 *
 *
 * http://m.veryeast.cn/service/competitive/detail 比比竞争力
 * http://m.veryeast.cn/service/matching/detail 简历匹配度
 */
import React, { Component } from 'react'
import style from './style.less'
import {connect} from 'react-redux'
import select from '@static/select@3x.png'
import unselect from '@static/unselect@3x.png'
import matching from '@static/matching@3x.png'
import contend from '@static/contend@3x.png'
import {positionCollect, positionUnColiect, positionApply} from '../../actions/position'
import { Toast } from 'antd-mobile'
import store from 'store'
const auth = store.get('m:auth') || {}


@connect((state) => ({
}))
class PositionBar extends Component {
  state = {
    isSelect: true,
  }

  matching = () => {
    window.location.href = 'http://m.veryeast.cn/service/matching/detail'
  }

  competitive = () => {
    window.location.href = 'http://m.veryeast.cn/service/competitive/detail'
  }

  collect = () => {
    const jobId = this.props.position.job_id
    const isFavorited = this.props.position.is_favorited
    if(auth.user_id) {
      if(isFavorited) { // 已经收藏
        this.props.dispatch(positionUnColiect({
          job_id: jobId,
        })).then((data) => {
          Toast.success('取消收藏', 1)
        })
      } else { // 去收藏
        this.props.dispatch(positionCollect({
          job_id: jobId,
        })).then((data) => {
          if (data.status === 0) return Toast.info(data.errMsg, 1)
          Toast.success('收藏成功', 1)
        })
      }
    } else {
      Toast.info('请先登录', 1)
    }
  }
  toEmploy = () => {
    const jobId = this.props.position.job_id
    const isApplied = this.props.position.is_applied
    if(auth.user_id){
      if(!isApplied) { // 去应聘
        Toast.loading('Loading...', 10)
        this.props.dispatch(positionApply({
          job_id: jobId,
          client_id: 1,
        })).then((data) => {
          if (data.status === 0) return Toast.info(data.errMsg, 1)
          Toast.success('申请成功', 1)
        })
      }
    } else {
      Toast.info('请先登录', 1)
    }
  }
  render() {
    const data = this.props.position
    // console.log(this.props.data)
    return (
      <div className={style.PositionBarWrap}>
        <div className={style.leftBtns}>
          <div onClick={this.collect} className={style.select}>
            <img className={style.img1} src={data.is_favorited ? unselect : select} alt="img1" />
            <span>{data.is_favorited ? '取消' : '收藏'}</span>
          </div>
          <div onClick={this.matching} className={style.matching}>
            <img className={style.img2} src={matching} alt="img2" />
            <span>匹配度</span>
          </div>
          <div onClick={this.competitive} className={style.contend}>
            <img className={style.img1} src={contend} alt="img3" />
            <span>竞争力</span>
          </div>
        </div>
        <div onClick={this.toEmploy} className={`${style.rightBtn} ${data.is_applied ? style.has : null}`}>
          {data.is_applied  ? '已应聘' : '应聘职位'}
        </div>
      </div>
    )
  }
}

export default PositionBar
