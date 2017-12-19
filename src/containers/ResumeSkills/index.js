import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { remove as skillsRemove } from '../../actions/skills'
import { NavBar, Flex, List, SwipeAction } from 'antd-mobile'
import style from './style.less'

@connect(state => {
  console.log(state)
  return {
    option: state.option,
    skills: state.skills.list,
  }
})
@withRouter
class ResumeSkills extends Component {
  componentDidMount() {
    this.props.dispatch(getAllInfo())
  }

  goTo(id) {
    this.props.history.push(`/resume/skills/${id}`)
  }

  removeItem(item) {
    this.props.dispatch(skillsRemove({
      skill_id: item.id,
    }))
  }

  render() {
    const {
      option,
      skills,
    } = this.props

    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="dark"
          className={style.nav}
          onLeftClick={() => this.props.history.goBack()}>
          技能和特长
        </NavBar>
        <Flex.Item className={style.wrap}>
          <List>
            {skills.map(item => (
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
                  extra={option.opts_master_degree_index[item.ability]}
                >
                  {item.skill_cn}
                </List.Item>
              </SwipeAction>
            ))}
          </List>
          <Flex className={style.add} justify="center">
            <Link to="/resume/skills/add">
              + 添加技能与特长
            </Link>
          </Flex>
        </Flex.Item>
      </Flex>
    )
  }
}

export default ResumeSkills
