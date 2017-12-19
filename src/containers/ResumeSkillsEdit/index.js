import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { edit as skillsEdit } from '../../actions/skills'
import { NavBar, Flex, List, InputItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import style from './style.less'

import TextareaField from '../../inputs/TextareaField'
import MasterDegree from '../../inputs/MasterDegree';

@connect(state => {
  console.log(state)
  return {
    option: state.option,
    skills: state.skills.list,
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
      this.props.dispatch(skillsEdit({
        ...values,
        id: this.props.match.params.id,
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
      skills,
      match,
    } = this.props
    const { getFieldProps } = form
    const item = skills.filter(item => {
      return item.id === match.params.id
    })[0] || {}

    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="dark"
          className={style.nav}
          onLeftClick={() => this.props.history.goBack()}
          rightContent={<span onClick={() => this.changeValue()}>保存</span>}
        >
          语言能力
        </NavBar>
        <Flex.Item className={style.wrap}>
          <List>
            <InputItem
              {...getFieldProps('skill_cn', {
                initialValue: item.skill_cn,
              })}
              clear placeholder="请输入"
            >
              技能/特长
            </InputItem>
            <MasterDegree
              {...getFieldProps('ability', {
                initialValue: item.ability ? [parseInt(item.ability, 10)] : [],
              })}
              title="熟练程度"
              extra="请选择"
            >
              <List.Item arrow="horizontal">掌握程度</List.Item>
            </MasterDegree>
            <TextareaField
              {...getFieldProps('detail_cn', {
                initialValue: item.detail_cn,
              })}
              placeholder="请输入专业描述"
            >
              <List.Item arrow="horizontal">专业描述</List.Item>
            </TextareaField>
          </List>
        </Flex.Item>
      </Flex>
    )
  }
}

export default ResumeSkillsEdit
