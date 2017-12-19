import React from 'react'
import style from './style.less'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@withRouter
class TalkJobCard extends React.Component {
  static propTypes = {
    info: PropTypes.object,
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.info.company_name !== this.props.info.company_name
  }
  turnDetails = () => {
    const id = this.props.history.location.pathname.split('/')[2];
    this.props.history.push(`/${id}`)
  }
  render() {
    return (
      <div className={style.content} onClick={ this.turnDetails }>
        <div className={style.left}>
          <img src={this.props.info.company_logo} alt=""/>
        </div>
        <div className={style.right}>
          <div className={style.line01}>{this.props.info.company_name}</div> 
          <div className={style.line02}>
            <div className={style.area}>地点：{this.props.info.current_location}</div>
            <div className={style.industry}>行业：{this.props.info.company_industry}</div>
            <div className={style.start}>星级：{this.props.info.star}</div>
          </div> 
        </div>
      </div>
    )
  }
}

export default TalkJobCard
