import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { remove as otherExpsRemove } from '../../actions/other_exps'
import { NavBar, Flex, List, SwipeAction } from 'antd-mobile'
import style from './style.less'

@connect(state => {
  console.log(state)
  return {
    option: state.option,
    other_exps: state.other_exps.list,
  }
})
@withRouter
class ResumeOther extends Component {
  componentDidMount() {
    this.props.dispatch(getAllInfo())
  }

  goTo(id) {
    this.props.history.push(`/resume/other/${id}`)
  }

  removeItem(item) {
    this.props.dispatch(otherExpsRemove({
      other_id: item.id,
    }))
  }

  render() {
    const {
      // option,
      other_exps,
    } = this.props

    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="dark"
          className={style.nav}
          onLeftClick={() => this.props.history.goBack()}>
          其他
        </NavBar>
        <Flex.Item className={style.wrap}>
          <List>
            {other_exps.map(item => (
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
                >
                  {item.content_cn}
                </List.Item>
              </SwipeAction>
            ))}
          </List>
          <Flex className={style.add} justify="center">
            <Link to="/resume/other/add">
              + 添加其它
            </Link>
          </Flex>
        </Flex.Item>
      </Flex>
    )
  }
}

export default ResumeOther
