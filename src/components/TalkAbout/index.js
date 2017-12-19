import React from 'react'
import style from './style.less'
import TalkJobCard from '../TalkJobCard/'
import PropTypes from 'prop-types'

class TalkAbout extends React.Component {
  static propTypes = {
    info: PropTypes.object,
  }
  constructor(props) {
    super(props)
    this.displayName = 'TalkAbout'
  }
  render() {
    return (
      <div className={style.content}>
        {Object.keys(this.props.info).length === 0 ? null : <TalkJobCard {...this.props}/>}
      </div>
    )
  }
}

export default TalkAbout
        // <div className={style.talkJob}>正在沟通的职位：酒店总经理</div>
