import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { remove as languagesRemove } from '../../actions/languages'
import { NavBar, Flex, List, SwipeAction } from 'antd-mobile'
import style from './style.less'

@connect(state => {
  console.log(state)
  return {
    option: state.option,
    languages: state.languages.list,
  }
})
@withRouter
class ResumeInfo extends Component {
  componentDidMount() {
    this.props.dispatch(getAllInfo())
  }

  goTo(id) {
    this.props.history.push(`/resume/language/${id}`)
  }

  removeItem(item) {
    this.props.dispatch(languagesRemove({
      lang_id: item.id,
    }))
  }

  render() {
    const {
      option,
      languages,
    } = this.props

    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="dark"
          className={style.nav}
          onLeftClick={() => this.props.history.goBack()}>
          语言能力
        </NavBar>
        <Flex.Item className={style.wrap}>
          <List>
            {languages.map(item => (
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
                  {option.opts_language_index[item.language]}
                </List.Item>
              </SwipeAction>
            ))}
          </List>
          <Flex className={style.add} justify="center">
            <Link to="/resume/language/add">
              + 添加语言能力
            </Link>
          </Flex>
        </Flex.Item>
      </Flex>
    )
  }
}

export default ResumeInfo
