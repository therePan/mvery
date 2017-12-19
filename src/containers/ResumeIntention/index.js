import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { edit as intentionEdit } from '../../actions/intention'
import { NavBar, Flex, List, Checkbox } from 'antd-mobile'
import { createForm } from 'rc-form'
import style from './style.less'

import Post from '../../inputs/Post'
import Area from '../../inputs/Area'
import WorkMode from '../../inputs/WorkMode'
import Industry from '../../inputs/Industry'
import StarLevel from '../../inputs/StarLevel'
import ArrivalTime from '../../inputs/ArrivalTime'
import Salary from '../../inputs/Salary'

@connect(state => {
  console.log(state)
  return {
    option: state.option,
    DesiredJob: state.DesiredJob,
    DesiredCompanyTypes: state.DesiredCompanyTypes.list,
    DesiredLocations: state.DesiredLocations.list.map(item => item.location),
    DesiredPositions: state.DesiredPositions.list.map(item => item.position),
  }
})
@createForm()
@withRouter
class ResumeIntention extends Component {
  componentDidMount() {
    this.props.dispatch(getAllInfo())
  }

  changeValue() {
    this.props.form.validateFields((err, values) => {
      if (err) return
      console.log(values)
      this.props.dispatch(intentionEdit({
        ...values,
        PersonDesiredJob: JSON.stringify({
          arrival_time: `${values.arrival_time}`,
          current_salary: `${values.current_salary[2]}`,
          current_salary_currency: values.current_salary[1],
          current_salary_is_show: values.current_salary_is_show ? 1 : 2,
          current_salary_mode: values.current_salary[0],
          desired_salary: values.desired_salary[2],
          desired_salary_currency: values.desired_salary[1],
          desired_salary_is_show: values.desired_salary_is_show ? 1 : 2,
          desired_salary_mode: values.desired_salary[0],
          work_mode: `${values.work_mode}`,
        }),
        PersonDesiredCompanyType: JSON.stringify(values.company_industry.map(item => ({
          company_type: item,
          industry: item.slice(0, 2) + '00',
          star: values.star_level[0],
        }))),
        PersonDesiredLocations: JSON.stringify(values.desired_locations),
        PersonDesiredPositions: JSON.stringify(values.desired_positions),
      })).then(data => {
        this.props.history.goBack()
      })
    })
  }

  render() {
    const {
      form,
      // option,
      DesiredJob,
      DesiredCompanyTypes,
      DesiredLocations,
      DesiredPositions,
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
          求职意向
        </NavBar>
        <Flex.Item className={style.wrap}>
          <List>
            <WorkMode
              {...getFieldProps('work_mode', {
                initialValue: [parseInt(DesiredJob.work_mode || 0, 10)],
              })}
              title="工作类型"
              extra="请选择"
            >
              <List.Item arrow="horizontal">工作类型</List.Item>
            </WorkMode>
            <Area
              {...getFieldProps('desired_locations', {
                initialValue: DesiredLocations,
              })}
              maxLength={5}
            >
              <List.Item arrow="horizontal">工作地点</List.Item>
            </Area>
            <Post
              {...getFieldProps('desired_positions', {
                initialValue: DesiredPositions,
              })}
              maxLength={5}
            >
              <List.Item arrow="horizontal">意向职位</List.Item>
            </Post>
            <Industry
              {...getFieldProps('company_industry', {
                initialValue: DesiredCompanyTypes.map(item => `${('0' + item.industry).slice(-2)}${('0' + item.company_type).slice(-2)}`),
              })}
              maxLength={5}
            >
              <List.Item arrow="horizontal">意向企业</List.Item>
            </Industry>
            <StarLevel
              {...getFieldProps('star_level', {
                initialValue: DesiredCompanyTypes[0] ? [DesiredCompanyTypes[0].star] : [],
              })}
            >
              <List.Item arrow="horizontal">星级</List.Item>
            </StarLevel>
            <ArrivalTime
              {...getFieldProps('arrival_time', {
                initialValue: DesiredJob.arrival_time ? [DesiredJob.arrival_time] : [],
              })}
            >
              <List.Item arrow="horizontal">到岗时间</List.Item>
            </ArrivalTime>
            <Salary
              {...getFieldProps('current_salary', {
                initialValue: [DesiredJob.current_salary_mode, DesiredJob.current_salary_currency, DesiredJob.current_salary],
              })}
            >
              <List.Item arrow="horizontal">目前薪资</List.Item>
            </Salary>
            <List.Item className={style.checkbox}>
              <label>
                <span>企业查看简历时不显示</span>
                <Checkbox
                  {...getFieldProps('current_salary_is_show', {
                    initialValue: DesiredJob.current_salary_is_show === '1',
                    valuePropName: 'checked',
                  })}
                />
              </label>
            </List.Item>
            <Salary
              auto
              {...getFieldProps('desired_salary', {
                initialValue: [DesiredJob.desired_salary_mode, DesiredJob.desired_salary_currency, DesiredJob.desired_salary],
                // {
                //   mode: '1',
                //   currency: '1',
                //   salary: '3',
                // },
              })}
            >
              <List.Item arrow="horizontal">期望薪资</List.Item>
            </Salary>
            <List.Item className={style.checkbox}>
              <label>
                <span>企业查看简历时显示面议</span>
                <Checkbox
                  {...getFieldProps('desired_salary_is_show', {
                    initialValue: DesiredJob.desired_salary_is_show === '1',
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

export default ResumeIntention
