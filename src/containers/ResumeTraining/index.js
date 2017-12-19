import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { NavBar, Flex, List, SwipeAction } from 'antd-mobile'
import style from './style.less'

@connect(state => {
  console.log(state)
  return {
    option: state.option,
    training_exps: state.training_exps.list,
  }
})
@withRouter
class ResumeTraining extends Component {
  componentDidMount() {
    this.props.dispatch(getAllInfo())
  }

  goTo(id) {
    this.props.history.push(`/resume/training/${id}`)
  }

  render() {
    const {
      // option,
      training_exps,
    } = this.props

    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="dark"
          className={style.nav}
          onLeftClick={() => this.props.history.goBack()}>
          培训经历
        </NavBar>
        <Flex.Item className={style.wrap}>
          <List>
            {training_exps.map(item => (
              <SwipeAction
                key={item.id}
                autoClose
                right={[
                  {
                    text: '删除',
                    onPress: () => this.removeItem(item),
                    style: { backgroundColor: '#F4333C', color: 'white' },
                  },
                ]}
              >
                <List.Item
                  arrow="horizontal"
                  key={item.id} onClick={() => this.goTo(item.id)}
                  extra={item.course_cn}
                >
                  {item.institutions_cn}
                </List.Item>
              </SwipeAction>
            ))}
          </List>
          <Flex className={style.add} justify="center">
            <Link to="/resume/training/add">
              + 添加培训经历
            </Link>
          </Flex>
        </Flex.Item>
      </Flex>
    )
  }
}

export default ResumeTraining
