import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo } from '../../actions/resume'
import { remove as certificateRemove } from '../../actions/certificates'
import { NavBar, Flex, List, SwipeAction } from 'antd-mobile'
import style from './style.less'

@connect(state => {
  console.log(state)
  return {
    option: state.option,
    certificates: state.certificates.list,
  }
})
@withRouter
class ResumeCertificate extends Component {
  componentDidMount() {
    this.props.dispatch(getAllInfo())
  }

  goTo(id) {
    this.props.history.push(`/resume/certificate/${id}`)
  }

  removeItem(item) {
    this.props.dispatch(certificateRemove({
      cert_id: item.id,
    }))
  }

  render() {
    const {
      // option,
      certificates,
    } = this.props

    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="dark"
          className={style.nav}
          onLeftClick={() => this.props.history.goBack()}>
          证书
        </NavBar>
        <Flex.Item className={style.wrap}>
          <List>
            {certificates.map(item => (
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
                  onClick={() => this.goTo(item.id)}
                  extra={`${item.obtained_year}/${item.obtained_month}`}
                >
                  {item.certificate_cn}
                </List.Item>
              </SwipeAction>
              
            ))}
          </List>
          <Flex className={style.add} justify="center">
            <Link to="/resume/certificate/add">
              + 添加证书
            </Link>
          </Flex>
        </Flex.Item>
      </Flex>
    )
  }
}

export default ResumeCertificate
