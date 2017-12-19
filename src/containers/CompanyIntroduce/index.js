import React from 'react'
import ComInfor from '../../components/ComInfor/'
import JobIntroduce from '../../components/JobIntroduce/'
import Connection from '../../components/Connection/'
import OtherJob from '../../components/OtherJob/'
import style from './style.less'

class CompanyIntroduce extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'CompanyIntroduce'
  }
  render() {
    return (
      <div>
        <ComInfor />
        <JobIntroduce title={<div className={style.title}>职位介绍</div>} />
        <Connection />
        <OtherJob />
      </div>
    )
  }
}

export default CompanyIntroduce
