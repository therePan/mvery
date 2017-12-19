import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { edit as trainingEdit } from '../../actions/trainings'
import { NavBar, Flex, List, InputItem, DatePicker, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import moment from 'moment'
import style from './style.less'

import Area from '../../inputs/Area'
import TextareaField from '../../inputs/TextareaField'

const minDate = moment().year(moment().year() - 99)
const maxDate = moment()

@connect(state => {
  console.log(state)
  return {
    option: state.option,
    training_exps: state.training_exps.list,
  }
})
@createForm()
@withRouter
class ResumeTrainingEdit extends Component {
  componentDidMount() {
    this.props.dispatch(getAllInfo())
  }

  changeValue() {
    this.props.form.validateFields((err, values) => {
      if (err) return
      if (values.begin.valueOf() > values.end.valueOf()) {
        return Toast.info('开始时间需小于结束时间')
      }

      this.props.dispatch(trainingEdit({
        ...values,
        id: this.props.match.params.id,
        begin_year: values.begin.format('YYYY'),
        begin_month: values.begin.format('MM'),
        end_year: values.end.format('YYYY'),
        end_month: values.end.format('MM'),
        detail_cn: values.detail_cn,
      })).then(data => {
        this.props.history.goBack()
      })
    })
  }

  render() {
    const {
      form,
      // option,
      training_exps,
      match,
    } = this.props
    const { getFieldProps } = form
    const item = training_exps.filter(item => {
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
          培训经历
        </NavBar>
        <Flex.Item className={style.wrap}>
          <List>
            <InputItem
              {...getFieldProps('institutions_cn', {
                initialValue: item.institutions_cn,
              })}
              clear placeholder="请输入"
            >
              培训机构名称
            </InputItem>
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
              {...getFieldProps('course_cn', {
                initialValue: item.course_cn,
              })}
              clear placeholder="请输入"
            >
              培训课程
            </InputItem>
            <Area
              {...getFieldProps('location', {
                initialValue: item.location ? [item.location] : [],
              })}
            >
              <List.Item arrow="horizontal">所在城市</List.Item>
            </Area>
            <InputItem
              {...getFieldProps('certificates_cn', {
                initialValue: item.certificates_cn,
              })}
              clear placeholder="请输入"
            >
              获得证书
            </InputItem>
            <TextareaField
              {...getFieldProps('detail_cn', {
                initialValue: item.detail_cn,
              })}
              placeholder="请输入证书描述"
            >
              <List.Item arrow="horizontal">证书描述</List.Item>
            </TextareaField>
          </List>
        </Flex.Item>
      </Flex>
    )
  }
}

export default ResumeTrainingEdit
