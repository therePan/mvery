/**
 * Created by huangchao on 2017/10/12.
 */
import React, { Component } from 'react'
import style from './style.less'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { NavBar, SwipeAction } from 'antd-mobile'
import CollectCompanyItemWrap from '../../components/CollectCompanyItem'
import Nothing from '../../components/Nothing'
import {getCollectCompantInit, deleteCompany} from '../../actions/CollectCompany'

@connect(state => {
  return {
    list: state.CollectCompany.list,
  }
})
class SelectCompany extends Component {
  static propTypes = {
  }

  cancleCollect = id => {
    this.props.dispatch(deleteCompany({
      company_id: id,
    }))
  }

  componentWillMount() {
    this.props.dispatch(getCollectCompantInit())
  }

  render() {
    // console.log(this.props.list)
    const {list} = this.props
    return (
      <div className={style.SelectCompanyWrap}>
        <NavBar
          mode="dark"
          onLeftClick={() => {this.props.history.go(-1)}}
        >关注企业</NavBar>
        <div className={style.listbox}>
          {
            list.length > 0 ?
            list.map((data, index) => {
              return(
                <SwipeAction
                  key={index}
                  autoClose
                  right={[
                    {
                      text: '删除',
                      onPress: () => this.cancleCollect(data.company_id),
                      style: { backgroundColor: '#F4333C', color: 'white', width: '120px' },
                    },
                  ]}
                >
                  <Link  to={`/${data.company_id}`}>
                    <CollectCompanyItemWrap {...data} />
                  </Link>
                </SwipeAction>
              )
            })
              : <Nothing font="快去收藏更多的职位吧～"/>
          }
        </div>
      </div>
    )
  }
}

export default SelectCompany


