import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo, edit as resumeEdit } from '../../actions/resume'
import { NavBar, Flex, List, InputItem, DatePicker } from 'antd-mobile'
import { createForm } from 'rc-form'
import moment from 'moment'
import style from './style.less'

import Area from '../../inputs/Area'
// import WorkYear from '../../inputs/WorkYear'
import Education from '../../inputs/Education'
import JobStatus from '../../inputs/JobStatus'
import IdType from '../../inputs/IdType'
import Marital from '../../inputs/Marital'
import Policital from '../../inputs/Policital'
import Nation from '../../inputs/Nation'
import Gender from '../../inputs/Gender'

@connect(state => {
  console.log(state)
  return {
    option: state.option,
    resume: state.resume,
  }
})
@createForm()
@withRouter
class ResumeInfo extends Component {
  componentDidMount() {
    this.props.dispatch(getAllInfo())
  }

  changeValue() {
    this.props.form.validateFields((err, values) => {
      if (err) return
      this.props.dispatch(resumeEdit({
        ...values,
        appchannel: 'web',
        birthday: values.birthday.format('YYYY-MM-DD'),
        graduation_time: values.graduation_time.format('YYYY-MM-DD'),
      })).then(data => {
        this.props.history.goBack()
      })
    })
  }
  
  render() {
    const {
      form,
      // option,
      resume,
    } = this.props
    const { getFieldProps } = form

    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="dark"
          className={style.nav}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={<span onClick={() => this.changeValue()}>保存</span>}
        >
          基本信息
        </NavBar>
        <Flex.Item className={style.wrap}>
          <List>
            <InputItem
              {...getFieldProps('true_name_cn', {
                initialValue: resume.true_name_cn,
              })}
              clear placeholder="请输入"
            >
              姓名
            </InputItem>
            <Gender
              {...getFieldProps('gender', {
                initialValue: resume.gender,
              })}
            >
              <List.Item>性别</List.Item>
            </Gender>
            <InputItem
              {...getFieldProps('mobile', {
                initialValue: resume.mobile,
              })}
              clear placeholder="请输入" type="tel"
            >
              手机号码
            </InputItem>
            <DatePicker
              {...getFieldProps('birthday', {
                initialValue: moment(parseInt(resume.birthday, 10) === 0 ? moment().year(2000) : resume.birthday),
              })}
              mode="date"
              title="出生日期"
              extra="请选择"
              minDate={moment().year(moment().year() - 100)}
              maxDate={moment().year(moment().year() - 15)}
            >
              <List.Item arrow="horizontal">出生日期</List.Item>
            </DatePicker>
            <InputItem
              {...getFieldProps('work_year', {
                initialValue: resume.work_year,
              })}
              clear placeholder="请输入" type="tel"
            >
              工作经验
            </InputItem>
            {/* <WorkYear
              {...getFieldProps('work_year', {
                initialValue: [resume.work_year],
              })}
              title="工作经验"
              extra="请选择"
            >
              <List.Item arrow="horizontal">工作经验</List.Item>
            </WorkYear> */}
            <Education
              {...getFieldProps('degree', {
                initialValue: resume.degree ? [resume.degree] : [],
              })}
              title="最高学历"
              extra="请选择"
            >
              <List.Item arrow="horizontal">最高学历</List.Item>
            </Education>
            <Area
              {...getFieldProps('current_location', {
                initialValue: resume.current_location ? [resume.current_location] : [],
              })}
            >
              <List.Item arrow="horizontal">现居地</List.Item>
            </Area>
            <Area
              {...getFieldProps('domicile_location', {
                initialValue: resume.domicile_location ? [resume.domicile_location] : [],
              })}
            >
              <List.Item arrow="horizontal">户籍地</List.Item>
            </Area>
            <JobStatus
              {...getFieldProps('job_status', {
                initialValue: resume.job_status ? [resume.job_status] : [],
              })}
              title="求职状态"
              extra="请选择"
            >
              <List.Item arrow="horizontal">求职状态</List.Item>
            </JobStatus>
            <InputItem
              {...getFieldProps('email', {
                initialValue: [resume.email],
              })}
              clear placeholder="请输入"
            >
              电子邮箱
            </InputItem>
            <InputItem
              {...getFieldProps('height', {
                initialValue: [resume.height],
              })}
              clear placeholder="请输入" type="number"
            >
              身高(cm)
            </InputItem>
            <InputItem
              {...getFieldProps('weight', {
                initialValue: [resume.weight],
              })}
              clear placeholder="请输入" type="number"
            >
              体重(kg)
            </InputItem>
            <DatePicker
              {...getFieldProps('graduation_time', {
                initialValue: moment(parseInt(resume.birthday, 10) === 0 ? moment() : resume.birthday),
              })}
              mode="date"
              title="毕业时间"
              extra="请选择"
              minDate={moment().year(moment().year() - 100)}
              maxDate={moment().year(moment().year() + 10)}
            >
              <List.Item arrow="horizontal">毕业时间</List.Item>
            </DatePicker>
            <IdType
              {...getFieldProps('id_type', {
                initialValue: [resume.id_type],
              })}
              title="证件类型"
              extra="请选择"
            >
              <List.Item arrow="horizontal">证件类型</List.Item>
            </IdType>
            <InputItem
              {...getFieldProps('id_number', {
                initialValue: resume.id_number,
              })}
              clear placeholder="请输入"
            >
              证件号码
            </InputItem>
            <InputItem
              {...getFieldProps('qq', {
                initialValue: resume.qq,
              })}
              clear placeholder="请输入"
            >
              QQ
            </InputItem>
            <Marital
              {...getFieldProps('marital', {
                initialValue: [resume.marital],
              })}
              title="婚姻状况"
              extra="请选择"
            >
              <List.Item arrow="horizontal">婚姻状况</List.Item>
            </Marital>
            <Policital
              {...getFieldProps('policital', {
                initialValue: [resume.policital],
              })}
              title="政治面貌"
              extra="请选择"
            >
              <List.Item arrow="horizontal">政治面貌</List.Item>
            </Policital>
            <Nation
              {...getFieldProps('nation', {
                initialValue: [resume.nation],
              })}
              title="民族"
              extra="请选择"
            >
              <List.Item arrow="horizontal">民族</List.Item>
            </Nation>
          </List>
        </Flex.Item>
      </Flex>
    )
  }
}

export default ResumeInfo
