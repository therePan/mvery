import React from 'react'
import ConnectCard from '../../components/ConnectCard'
import { pipeline } from '../../helper/fetching'
import {Modal} from 'antd-mobile'

class ConnectList extends React.Component {
  state = {
    msgList: [],
  }
  componentDidMount() {
    pipeline(':ve.mobile.interface/user/msgList').then(
      data => {
        if (data.errCode === 2002) {
          Modal.alert('', '请先登录', [
            { text: '稍后', style: 'default' },
            { text: '登录', onPress: () => this.props.push('/user/login', {rediact: this.props.location.pathname}) },
          ])
        }
        this.setState({
          msgList: data.data || [],
        })
      }
    ).catch(json => {
      console.log(json)
    })
  }
  render() {
    return (
      <div>
        {
          this.state.msgList.map((elem, index) => <ConnectCard key={index} msgList={elem}/>)
        }
      </div>
    )
  } 
}

export default ConnectList
