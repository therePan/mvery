import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { edit as educationalsEdit } from '../../actions/educationals'
import { NavBar, Flex, List, InputItem, DatePicker, Checkbox, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import moment from 'moment'
import style from './style.less'

import Area from '../../inputs/Area'
import Education from '../../inputs/Education'
import EduMajor from '../../inputs/EduMajor'
import TextareaField from '../../inputs/TextareaField'

const minDate = moment().year(moment().year() - 99)
const maxDate = moment()

@connect(state => {
  console.log(state)
  return {
    option: state.option,
    educationals: state.educationals.list,
  }
})
@createForm()
@withRouter
class ResumeEducationEdit extends Component {
  componentDidMount() {
    this.props.dispatch(getAllInfo())
  }

  changeValue() {
    this.props.form.validateFields((err, values) => {
      if (err) return
      if (values.begin.valueOf() > values.end.valueOf()) {
        return Toast.info('开始时间需小于结束时间')
      }

      this.props.dispatch(educationalsEdit({
        ...values,
        id: this.props.match.params.id,
        is_overseas: values.overseas ? '1' : '2',
        begin_year: values.begin.format('YYYY'),
        begin_month: values.begin.format('MM'),
        end_year: values.end.format('YYYY'),
        end_month: values.end.format('MM'),
        detail_cn: values.detail_cn || '',
      })).then(data => {
        this.props.history.goBack()
      })
    })
  }

  render() {
    const {
      form,
      // option,
      educationals,
      match,
    } = this.props
    const { getFieldProps } = form
    const item = educationals.filter(item => {
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
          教育经历
        </NavBar>
        <Flex.Item className={style.wrap}>
          <List>
            <InputItem
              {...getFieldProps('school_cn', {
                initialValue: item.school_cn,
              })}
              clear placeholder="请输入"
            >
              学校名称
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
            <Education
              {...getFieldProps('degree', {
                initialValue: [item.degree],
              })}
              title="学历"
              extra="请选择"
            >
              <List.Item arrow="horizontal">学历</List.Item>
            </Education>
            <Area
              {...getFieldProps('location', {
                initialValue: item.location ? [item.location] : [],
              })}
            >
              <List.Item arrow="horizontal">所在城市</List.Item>
            </Area>
            <EduMajor
              {...getFieldProps('major_id', {
                initialValue: [item.major_id],
              })}
              title="专业类型"
              extra="请选择"
            >
              <List.Item arrow="horizontal">专业类型</List.Item>
            </EduMajor>
            <TextareaField
              {...getFieldProps('detail_cn', {
                initialValue: item.detail_cn || '',
              })}
              placeholder="请输入专业描述"
            >
              <List.Item arrow="horizontal">专业描述</List.Item>
            </TextareaField>
            <List.Item className={style.checkbox}>
              <label>
                <span>海外学习经历</span>
                <Checkbox
                  {...getFieldProps('overseas', {
                    initialValue: item.is_overseas === '1' ? true : false,
                    valuePropName: 'checked',
                  })}
                />
              </label>
            </List.Item>
          </List>
        </Flex.Item>
      </Flex>
    )
  }
}

export default ResumeEducationEdit
