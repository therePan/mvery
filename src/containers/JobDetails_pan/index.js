import React from 'react'
import JobDetailsCard from '../../components/JobDetailsCard'
import HotelEntry from '../../components/HotelEntry'
import JobIntroduce from '../../components/JobIntroduce'
import Connection from '../../components/Connection'
import style from './style.less'

class JobDetails extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'JobDetails'
  }
  render() {
    return (
      <div>
        <JobDetailsCard />
        <HotelEntry />
        <JobIntroduce title={<div className={style.title}>职位介绍</div>} />
        <Connection />
      </div>
    )
  }
}

export default JobDetails
