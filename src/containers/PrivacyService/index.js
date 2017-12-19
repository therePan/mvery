/**
 * Created by huangchao on 2017/10/12.
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import style from './style.less'
import ShowItem from '../../components/ShowItem'
import { NavBar, Toast } from 'antd-mobile'
import {getUserStatus} from '../../actions/userStatus'
import {getBlackList, setResumeStatus, deleteBlackLIst} from '../../actions/Privacy'

@connect(state => {
  return {
    userStatus: state.userStatus,
    BlackList: state.Privacy.BlackList,
  }
})
class PrivacyService extends Component {
  static propTypes = {
  }

  deleteItem = (id) => {
    this.props.dispatch(deleteBlackLIst({id}))
      .then(() => {
        Toast.success('恢复成功', 1)
      })
  }

  changeType = (type) => {
    this.props.dispatch(setResumeStatus({
      privacy: type,
    })).then(() => {
      Toast.success('保存成功', 1)
    })
  }

  addCompany = () => {
    this.props.history.push('/person/shield')
  }

  componentWillMount() {
    this.setState({
      type: this.props.userStatus.resume_status || '1',
    })
    this.props.dispatch(getUserStatus())
    this.props.dispatch(getBlackList())
  }

  render() {
    const {BlackList} = this.props
    const resumeStatus = this.props.userStatus.resume_status
    // console.log(resumeStatus)
    return (
      <div className={style.PrivacyServiceWrap}>
        <NavBar
          mode="dark"
          onLeftClick={() => {this.props.history.go(-1)}}
        >隐私服务</NavBar>
        <div className={style.wrapTitle}>屏蔽企业</div>
        <div onClick={() => this.changeType('1')} className={style.commont}>
          <div className={style.title}>所有公司都能看到我</div>
          <span className={`${style.unSelect} ${resumeStatus === '1' ? style.select : null}`} />
        </div>
        <div className={style.someUlookBox}>
          <div onClick={() => this.changeType('2')} className={`${style.commont} ${style.unBottom}`}>
            <div className={style.title}>不希望以下企业看到</div>
            <span className={`${style.unSelect} ${resumeStatus === '2' ? style.select : null}`} />
          </div>
          <div className={style.listBox}>
            {
              BlackList.map((data, index) =>
                <ShowItem key={index} comtant={data.company_name} id={data.c_userid} callback={this.deleteItem} />
              )
            }
          </div>
          <div onClick={this.addCompany} className={style.addBtn}>
            + 新增企业
          </div>
        </div>
        <div onClick={() => this.changeType('3')} className={`${style.commont} ${style.unBottom}`}>
          <div className={style.title}>只有投递才能看到我的简历</div>
          <span className={`${style.unSelect} ${resumeStatus === '3' ? style.select : null}`} />
        </div>
      </div>
    )
  }
}

export default PrivacyService
