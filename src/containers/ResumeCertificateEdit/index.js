import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { edit as certificateEdit } from '../../actions/certificates'
import { NavBar, Flex, List, InputItem, DatePicker } from 'antd-mobile'
import { createForm } from 'rc-form'
import moment from 'moment'
import style from './style.less'

import TextareaField from '../../inputs/TextareaField'

const minDate = moment().year(moment().year() - 99)
const maxDate = moment()

@connect(state => {
  console.log(state)
  return {
    option: state.option,
    certificates: state.certificates.list,
  }
})
@createForm()
@withRouter
class ResumeSkillsEdit extends Component {
  componentDidMount() {
    this.props.dispatch(getAllInfo())
  }

  changeValue() {
    this.props.form.validateFields((err, values) => {
      if (err) return
      this.props.dispatch(certificateEdit({
        ...values,
        id: this.props.match.params.id,
        obtained_year: values.obtained.format('YYYY'),
        obtained_month: values.obtained.format('MM'),
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
      certificates,
      match,
    } = this.props
    const { getFieldProps } = form
    const item = certificates.filter(item => {
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
          证书
        </NavBar>
        <Flex.Item className={style.wrap}>
          <List>
            <InputItem
              {...getFieldProps('certificate_cn', {
                initialValue: item.certificate_cn,
              })}
              clear placeholder="请输入"
            >
              证书名称
            </InputItem>
            <DatePicker
              {...getFieldProps('obtained', {
                initialValue: (item.obtained_year && item.obtained_year !== '0') ?
                  moment(`${item.obtained_year}-${item.obtained_month}`, 'Y-M') : maxDate,
              })}
              mode="date"
              title="获取时间"
              extra="请选择"
              format={s => s.format('YYYY-MM')}
              minDate={minDate}
              maxDate={maxDate}
            >
              <List.Item arrow="horizontal">获取时间</List.Item>
            </DatePicker>
            <TextareaField
              {...getFieldProps('detail_cn', {
                initialValue: item.detail_cn,
              })}
              placeholder="请输入描述信息"
            >
              <List.Item arrow="horizontal">描述</List.Item>
            </TextareaField>
          </List>
        </Flex.Item>
      </Flex>
    )
  }
}

export default ResumeSkillsEdit
