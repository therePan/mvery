import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { edit as workExpsEdit } from '../../actions/work_exps'
import { NavBar, Flex, List, InputItem, DatePicker, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import moment from 'moment'
import style from './style.less'

import Post from '../../inputs/Post'
import Area from '../../inputs/Area'
import CompanyIndustry from '../../inputs/CompanyIndustry'
import TextareaField from '../../inputs/TextareaField'
import Salary from '../../inputs/Salary';

const minDate = moment().year(moment().year() - 99)
const maxDate = moment()

@connect(state => {
  console.log(state)
  return {
    option: state.option,
    work_exps: state.work_exps.list,
  }
})
@createForm()
@withRouter
class ResumeExperienceEdit extends Component {
  componentDidMount() {
    this.props.dispatch(getAllInfo())
  }

  changeValue() {
    this.props.form.validateFields((err, values) => {
      if (err) return
      if (values.begin.valueOf() > values.end.valueOf()) {
        return Toast.info('开始时间需小于结束时间')
      }

      this.props.dispatch(workExpsEdit({
        ...values,
        id: this.props.match.params.id,
        begin_year: values.begin.format('YYYY'),
        begin_month: values.begin.format('MM'),
        end_year: values.end.format('YYYY'),
        end_month: values.end.format('MM'),
        position_cn: this.props.option.positions_index[values.position_id],
        job_responsibilities_cn: values.job_responsibilities_cn || '',
        job_performance_cn: values.job_performance_cn || '',
      })).then(data => {
        this.props.history.goBack()
      })
    })
  }

  render() {
    const {
      form,
      // option,
      work_exps,
      match,
    } = this.props
    const { getFieldProps } = form
    const item = work_exps.filter(item => {
      return item.id === match.params.id
    })[0] || {}
    console.log(item)

    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="dark"
          className={style.nav}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={<span onClick={() => this.changeValue()}>保存</span>}
        >
          工作经历
        </NavBar>
        <Flex.Item className={style.wrap}>
          <List>
            <DatePicker
              {...getFieldProps('begin', {
                initialValue: (item.begin_year && item.begin_year !== '0') ?
                  moment(`${item.begin_year}-${item.begin_month}`, 'Y-M') : maxDate,
              })}
              mode="date"
              title="开始时间"
              extra="请选择"
              format={s => s.format('YYYY-MM')}
              minDate={minDate}
              maxDate={maxDate}
            >
              <List.Item arrow="horizontal">开始时间</List.Item>
            </DatePicker>
            <DatePicker
              {...getFieldProps('end', {
                initialValue: (item.end_year && item.end_year !== '0') ?
                  moment(`${item.end_year}-${item.end_month}`, 'Y-M') : maxDate,
              })}
              mode="date"
              title="结束时间"
              extra="请选择"
              format={s => s.format('YYYY-MM')}
              minDate={minDate}
              maxDate={maxDate}
            >
              <List.Item arrow="horizontal">结束时间</List.Item>
            </DatePicker>
            <InputItem
              {...getFieldProps('company_name_cn', {
                initialValue: item.company_name_cn,
              })}
              clear placeholder="请输入"
            >
              企业名称
            </InputItem>
            <CompanyIndustry
              {...getFieldProps('company_industry', {
                initialValue: [item.company_industry],
              })}
              title="所属行业"
              extra="请选择"
            >
              <List.Item arrow="horizontal">所属行业</List.Item>
            </CompanyIndustry>
            <Post
              {...getFieldProps('position_id', {
                initialValue: item.position_id ? [item.position_id] : [],
              })}
            >
              <List.Item arrow="horizontal">职位</List.Item>
            </Post>
            <Area
              {...getFieldProps('location', {
                initialValue: item.location ? [item.location] : [],
              })}
            >
              <List.Item arrow="horizontal">所在城市</List.Item>
            </Area>
            <Salary.Scope
              {...getFieldProps('salary', {
                initialValue: item.salary ? [parseInt(item.salary, 10)] : [],
              })}
              mode={item.salary_type}
            >
              <List.Item arrow="horizontal">职位薪资</List.Item>
            </Salary.Scope>
            <TextareaField
              {...getFieldProps('job_responsibilities_cn', {
                initialValue: item.job_responsibilities_cn,
              })}
              placeholder="请输入岗位职责"
              extra="请输入"
              >
              <List.Item arrow="horizontal">岗位职责</List.Item>
            </TextareaField>
            <TextareaField
              {...getFieldProps('job_performance_cn', {
                initialValue: item.job_performance_cn,
              })}
              placeholder="请输入工作业绩"
              extra="请输入"
            >
              <List.Item arrow="horizontal">工作业绩</List.Item>
            </TextareaField>
          </List>
        </Flex.Item>
      </Flex>
    )
  }
}

export default ResumeExperienceEdit
