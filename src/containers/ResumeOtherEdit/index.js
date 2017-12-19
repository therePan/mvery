import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { edit as otherExpsEdit } from '../../actions/other_exps'
import { NavBar, Flex, List } from 'antd-mobile'
import { createForm } from 'rc-form'
import style from './style.less'

import TextareaField from '../../inputs/TextareaField'
import Topic from '../../inputs/Topic'

@connect(state => {
  console.log(state)
  return {
    option: state.option,
    other_exps: state.other_exps.list,
  }
})
@createForm()
@withRouter
class ResumeOtherEdit extends Component {
  componentDidMount() {
    this.props.dispatch(getAllInfo())
  }

  changeValue() {
    this.props.form.validateFields((err, values) => {
      if (err) return
      const { id } = this.props.match.params
      this.props.dispatch(otherExpsEdit({
        ...values,
        ...(id !== 'add' ? { id } : {}),
      })).then(data => {
        this.props.history.goBack()
      })
    })
  }

  render() {
    const {
      form,
      // option,
      other_exps,
      match,
    } = this.props
    const { getFieldProps } = form
    const item = other_exps.filter(item => {
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
          其他
        </NavBar>
        <Flex.Item className={style.wrap}>
          <List>
            <Topic
              {...getFieldProps('info_type', {
                initialValue: item.info_type ? [parseInt(item.info_type, 10)] : [],
              })}
              title="主题类型"
              extra="请选择"
            >
              <List.Item arrow="horizontal">主题类型</List.Item>
            </Topic>
            <TextareaField
              {...getFieldProps('content_cn', {
                initialValue: item.content_cn,
              })}
              placeholder="请输入描述"
            >
              <List.Item arrow="horizontal">描述</List.Item>
            </TextareaField>
          </List>
        </Flex.Item>
      </Flex>
    )
  }
}

export default ResumeOtherEdit
