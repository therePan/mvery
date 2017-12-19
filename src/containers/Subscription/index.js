import React, { Component } from 'react'
import {connect} from 'react-redux'
import style from './style.less'
import { List, NavBar,Toast } from 'antd-mobile';
import { createForm } from 'rc-form'
import { pipeline } from '../../helper/fetching'
// import PropTypes from 'prop-types'
import Area from '../../inputs/Area'
import Post from '../../inputs/Post'
import Salary from '../../inputs/Salary'
import WorkMode from '../../inputs/WorkMode'
import RoomBoard from '../../inputs/RoomBoard'
import { addOrder } from '../../actions/order'

@createForm()
@connect(state => ({
  order: state.order,
}))
class Subscription extends Component {
  tipsErr = (tips) => {
    var ok = true;
    for (const value of tips) {
      if (!value[2]) {
        if (!value[0] || !value[0].length) {
          Toast.info(value[1],1)
          ok = false
        }
      }else {
        if (!value[0] || !value[0].length) {
          Toast.info(value[1][0],1)
          ok = false
        }else if(!value[2].test(value[0])){
          Toast.info(value[1][1],1)
          ok = false
        }
      }
    }
    return ok;
  }
  SaveBtn = () => {
    let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
    this.props.form.validateFields((err,value) => {
      if(err) return
      console.log(value)
      let isok =this.tipsErr([
        [value.subscribe_email, ['请输入邮箱','请输入正确邮箱'], reg],
        [value.jobarea, '请选择地点'],
        [value.funtype, '请选择工作类型'],
      ])
      if (!isok) {
        // console.log('test')
      }
    })
  }

   componentDidMount() {
      let id
      pipeline(':ve.my/user/subscribe/index').then(data => {
        id = data.data.data[0].id
      }).then(() => {
        pipeline(`:ve.my/user/api/getSubscribeData?id=${id}`)
          .then(json => {
            this.props.dispatch(addOrder({
              ...json.data,
            }))
          })
      })

    }

  render() {
    // console.log(this.props.order)
    const { form } = this.props
    const { getFieldProps } = form 
    return (
      <div className={style.SubscriptionWrap}>
        <NavBar 
            onLeftClick={() => {this.props.history.go(-1)}}
            rightContent={<div onClick={this.SaveBtn}>保存</div>}
          >我的订阅</NavBar>
        <div className={style.top}>
          <List>
            <Post {...getFieldProps('funtype',{
              initialValue: [this.props.order.funtype],
            })}>
              <List.Item arrow="horizontal">职位类别</List.Item>
            </Post>
          </List>
        </div>
        <div className={style.middle}>
          <List>
            <Area {...getFieldProps('jobarea',{
              initialValue: [this.props.order.jobarea],
            })} maxLength={3}>
              <List.Item arrow="horizontal">选择城市</List.Item>
            </Area>
            <Salary.Scope {...getFieldProps('salary',{
              initialValue: [this.props.order.salary],
            })}>
              <List.Item arrow="horizontal">薪资范围</List.Item>
            </Salary.Scope>
            <RoomBoard {...getFieldProps('rations_quarters',{
              initialValue: [this.props.order.rations_quarters],
            })}>
              <List.Item arrow="horizontal">食宿情况</List.Item>
            </RoomBoard>
            <WorkMode {...getFieldProps('work_mode',{
              initialValue: [this.props.order.work_mode],
            })} maxLength={5}>
              <List.Item arrow="horizontal">职位性质</List.Item>
            </WorkMode>
          </List>
        </div>
      </div>
    )
  }
}

export default Subscription
