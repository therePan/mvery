import React from 'react'
import style from './style.less'
import { NavBar, Toast } from 'antd-mobile'
import TipOffsType from '../../components/TipOffsType'
import TipBoard from '../../components/TipBoard'
import TipTel from '../../components/TipTel'
import { createForm } from 'rc-form';
import { pipeline } from '../../helper/fetching'
import {connect} from 'react-redux'

@connect(state => ({
  tel: state.auth.phone,
}))
@createForm()
class TipOffs extends React.Component {

  submitInfor = () => {
    const job_id = this.props.location.state.d
    this.props.form.validateFields((err, values) => {
      if (!values.feed_back_type) {
        Toast.info('请选择举报类型',0.5);
        return
      }
      values.job_id = job_id
      console.log(values);
      pipeline(':ve.mobile.interface/job/report',values).then(() => {
        Toast.info('举报成功',0.5);
      }).then(() => {
        setTimeout(() =>{
          this.props.history.go(-1)
        }, 300)
      })
    })
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className={style.content}>
        <NavBar 
          onLeftClick={() => this.props.history.go(-1)}
          rightContent={<div onClick={this.submitInfor}>提交</div>}
        >职位举报</NavBar>
        <TipOffsType {...getFieldProps('feed_back_type')}/>
        <TipBoard {...getFieldProps('description')}/>
        <TipTel {...getFieldProps('p_mobile', {
          initialValue: this.props.tel,
        })}/>
      </div>
    )
  }
}

export default TipOffs
