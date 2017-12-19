/**
 * Created by huangchao on 2017/10/12.
 */
import React, { Component } from 'react'
import style from './style.less'
import { NavBar, SwipeAction } from 'antd-mobile'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import CollectPostItem from '../../components/CollectPostItem'
import Nothing from '../../components/Nothing'
import {getCollectPostInit, deletePost} from '../../actions/CollectPost'
// import PropTypes from 'prop-types'


@connect((state) => {
  return {
    list: state.CollectPost.list,
  }
})
class SelectPost extends Component {
  static propTypes = {
  }

  cancleCollect = job_id => {
    this.props.dispatch(deletePost({
      job_id,
    }))
  }

  componentWillMount() {
    this.props.dispatch(getCollectPostInit())
  }

  render() {
    // console.log(this.props.list)
    const {list} = this.props
    return (
      <div className={style.SelectPostWrap}>
        <NavBar
          mode="dark"
          onLeftClick={() => {this.props.history.go(-1)}}
        >我的收藏</NavBar>
        <div className={style.listBox}>
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
                        onPress: () => this.cancleCollect(data.job_id),
                        style: { backgroundColor: '#F4333C', color: 'white', width: '120px' },
                      },
                    ]}
                  >
                    <Link  to={`/${data.company_id}/${data.job_id}`}>
                      <CollectPostItem {...data} />
                    </Link>
                  </SwipeAction>
                )
              })
              : <Nothing font="快去关注更多的企业吧～" />
          }
        </div>
      </div>
    )
  }
}

export default SelectPost
