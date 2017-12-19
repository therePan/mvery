import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { remove as workExpsRemove } from '../../actions/work_exps'
import { NavBar, Flex, List, SwipeAction } from 'antd-mobile'
import style from './style.less'

@connect(state => {
  console.log(state)
  return {
    option: state.option,
    work_exps: state.work_exps.list,
  }
})
@withRouter
class ResumeExperience extends Component {
  componentDidMount() {
    this.props.dispatch(getAllInfo())
  }

  goTo(id) {
    this.props.history.push(`/resume/experience/${id}`)
  }

  removeItem(item) {
    this.props.dispatch(workExpsRemove({
      work_exp_id: item.id,
    }))
  }

  render() {
    const {
      work_exps,
    } = this.props

    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="dark"
          className={style.nav}
          onLeftClick={() => this.props.history.goBack()}>
          工作经历
        </NavBar>
        <Flex.Item className={style.wrap}>
          <List>
            {work_exps.map(item => (
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
                <List.Item arrow="horizontal" key={item.id} onClick={() => this.goTo(item.id)}>
                  <div>{this.props.option.positions_index[item.position_id] || '职位名称'}</div>
                  <div className={style.etime}>
                    {`${item.begin_year}-${item.begin_month}`}-
                    {item.end_year !== '0' ? `${item.end_year}-${item.end_month}` : '至今'}
                  </div>
                </List.Item>
              </SwipeAction>
            ))}
          </List>
          <Flex className={style.add} justify="center">
            <Link to="/resume/experience/add">
              + 添加工作经历
            </Link>
          </Flex>
        </Flex.Item>
      </Flex>
    )
  }
}

export default ResumeExperience
