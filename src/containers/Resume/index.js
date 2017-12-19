import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllInfo, avatar } from '../../actions/resume'
import { NavBar, Card, Flex } from 'antd-mobile'
import BitmapMin from 'bitmap-min'
import style from './style.less'
import editIcon from '@static/edit@3x.png'

const Pla = (props) =>
  <i style={{display: 'inline-block', width: props.w + 'em'}} />

@connect(state => {
  return {
    option: state.option,
    resume: state.resume,
    DesiredPositions: state.DesiredPositions.list.map(item => item.position),
    DesiredLocations: state.DesiredLocations.list.map(item => item.location),
    DesiredJob: state.DesiredJob,
    educationals: state.educationals.list,
    work_exps: state.work_exps.list,
    languages: state.languages.list,
    skills: state.skills.list,
    training_exps: state.training_exps.list,
    certificates: state.certificates.list,
    other_exps: state.other_exps.list,
  }
})
@withRouter
class Resume extends Component {
  handleFaceChange = (ev) => {
    this.bitmapMin.load(ev.target.files[0], (base64, blob) => {
      this.props.dispatch(avatar({
        avatar: blob,
      })).then(() => {
        this.props.dispatch(getAllInfo())
      })
    })
  }

  componentDidMount() {
    this.bitmapMin = new BitmapMin({
      width: 360,  // 最大宽度
      height: 360, // 最大高度
      jpeg: false,  // 强制转为 jpeg|jpg
      quality: .7, // jpeg|jpg 图片的质量
    })
    this.props.dispatch(getAllInfo())
  }

  render() {
    const {
      option,
      resume,
      DesiredPositions,
      DesiredLocations,
      DesiredJob,
      educationals,
      work_exps,
      languages,
      skills,
      training_exps,
      certificates,
      other_exps,
    } = this.props

    return (
      <Flex direction="column" align="stretch" className={style.root}>
        <NavBar
          mode="dark"
          className={style.nav}
          onLeftClick={() => this.props.history.goBack()}>
          编辑简历
        </NavBar>
        <Flex.Item className={style.wrap}>
          <div>
            <Card
              className={style.card}>
              <Card.Header title="添加头像" />
              <Card.Body className={style.main}>
                <div className={style.head}>
                  <div>
                    <img src={resume.photo} />
                    <img className={style.edit} src={editIcon} />
                  </div>
                  <span>点击更换</span>
                  <input
                    className={style.face}
                    type="file"
                    accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                    onChange={this.handleFaceChange} />
                </div>
              </Card.Body>
            </Card>
            <Card
              className={style.card}>
              <Card.Header
                title={<span>基本信息 <i className={style.required}>必填</i></span>}
                extra={<Link to="/resume/info"><img className={style.edit} src={editIcon} /></Link>} />
              <Card.Body className={style.main}>
                <div className={style.item}>
                  <span>姓<Pla w={2} />名</span>：
                  {resume.true_name_cn}
                </div>
                <div className={style.item}>
                  <span>性<Pla w={2} />别</span>：
                  {option.opts_gender.filter(item => parseInt(resume.gender, 10) === item.code).map(item => item.value)[0] || '未知'}
                </div>
                <div className={style.item}>
                  <span>年<Pla w={2} />龄</span>：
                  {(() => {
                    const now = new Date()
                    const birthday = new Date(resume.birthday)
                    return parseInt((now.getFullYear() - birthday.getFullYear()) +
                      (now.getMonth() - birthday.getMonth()) / 100 +
                      (now.getDate() - birthday.getDate()) / 10000, 10)
                  })()}
                </div>
                <div className={style.item}>
                  <span>所在城市</span>：
                  {option.areas_index[resume.current_location]}
                </div>
                <div className={style.item}>
                  <span>工作年限</span>：
                  {resume.work_year}年
                </div>
                <div className={style.item}>
                  <span>联系电话</span>：
                  {resume.mobile}
                </div>
                <div className={style.item}>
                  <span>联系邮箱</span>：
                  {resume.email}
                </div>
                <div className={style.item}>
                  <span>求职状态</span>：
                  {option.opts_job_status_index[resume.job_status]}
                </div>
              </Card.Body>
            </Card>
            <Card
              className={style.card}>
              <Card.Header
                title={<span>求职意向 <i className={style.required}>必填</i></span>}
                extra={<Link to="/resume/intention"><img className={style.edit} src={editIcon} /></Link>} />
              <Card.Body className={style.main}>
                <div className={style.item}><span>求职岗位</span>：{DesiredPositions.map(item => option.positions_index[item]).join(', ')}</div>
                <div className={style.item}><span>工作地点</span>：{DesiredLocations.map(item => option.areas_index[item]).join(', ')}</div>
                <div className={style.item}><span>期望薪资</span>：{option.opts_salary.salary_scope_index[DesiredJob.desired_salary]}</div>
              </Card.Body>
            </Card>
            <Card
              className={style.card}>
              <Card.Header
                title={<span>教育经历</span>}
                extra={<Link to="/resume/education"><img className={style.edit} src={editIcon} /></Link>} />
              <Card.Body className={style.main}>
                {educationals.map(item => (
                  <Flex key={item.id} direction="column" align="stretch" className={style.panel}>
                    <div>{item.school_cn || '学校名称'}</div>
                    <Flex>
                      <Flex.Item>
                        <span>{item.major_cn || '不限'}</span> | <span>{option.opts_education_index[item.degree] || '不限'}</span>
                      </Flex.Item>
                      <span>{item.begin_year}-{item.end_year !== '0' ? item.end_year : '至今'}</span>
                    </Flex>
                  </Flex>
                ))}
              </Card.Body>
            </Card>
            <Card
              className={style.card}>
              <Card.Header
                title={<span>工作经验</span>}
                extra={<Link to="/resume/experience"><img className={style.edit} src={editIcon} /></Link>} />
              <Card.Body className={style.main}>
                {work_exps.map(item => (
                  <Flex key={item.id} direction="column" align="stretch" className={style.panel}>
                    <div>{item.company_name_cn}</div>
                    <Flex>
                      <Flex.Item>{option.positions_index[item.position_id]}</Flex.Item>
                      <span>{`${item.begin_year}.${item.begin_month}`}-{item.end_year !== '0' ? `${item.end_year}.${item.end_month}` : '至今'}</span>
                    </Flex>
                    <div className={style.info}>
                      <span>{item.job_responsibilities_cn}</span>
                    </div>
                  </Flex>
                ))}
              </Card.Body>
            </Card>
            <Card
              className={style.card}>
              <Card.Header
                title={<span>语言能力</span>}
                extra={<Link to="/resume/language"><img className={style.edit} src={editIcon} /></Link>} />
              <Card.Body className={style.main}>
                {languages.map(item => (
                  <Flex key={item.id} className={style.panel}>
                    <Flex.Item>{option.opts_language_index[item.language]}</Flex.Item>
                    <Flex.Item>{option.opts_master_degree_index[item.ability]}</Flex.Item>
                  </Flex>
                ))}
              </Card.Body>
            </Card>
            <Card
              className={style.card}>
              <Card.Header
                title={<span>技能和特长</span>}
                extra={<Link to="/resume/skills"><img className={style.edit} src={editIcon} /></Link>} />
              <Card.Body className={style.main}>
                {skills.map(item => (
                  <Flex key={item.id} className={style.panel}>
                    <Flex.Item>{item.skill_cn}</Flex.Item>
                    <Flex.Item>{option.opts_master_degree_index[item.ability]}</Flex.Item>
                  </Flex>
                ))}
              </Card.Body>
            </Card>
            <Card
              className={style.card}>
              <Card.Header
                title={<span>培训经历</span>}
                extra={<Link to="/resume/training"><img className={style.edit} src={editIcon} /></Link>} />
              <Card.Body className={style.main}>
                {training_exps.map(item => (
                  <Flex key={item.id} direction="column" align="stretch" className={style.panel}>
                    <div>{item.institutions_cn}</div>
                    <Flex>
                      <Flex.Item>
                        <span>{item.course_cn}</span>
                      </Flex.Item>
                      <span>{item.begin_year}.{item.begin_month}-{item.end_year !== '0' ? `${item.end_year}.${item.end_month}` : '至今'}</span>
                    </Flex>
                  </Flex>
                ))}
              </Card.Body>
            </Card>
            <Card
              className={style.card}>
              <Card.Header
                title={<span>证书</span>}
                extra={<Link to="/resume/certificate"><img className={style.edit} src={editIcon} /></Link>} />
              <Card.Body className={style.main}>
                {certificates.map(item => (
                  <Flex key={item.id} className={style.panel}>
                    <Flex.Item>{item.certificate_cn}</Flex.Item>
                    <span>{item.obtained_year}.{item.obtained_month}</span>
                  </Flex>
                ))}
              </Card.Body>
            </Card>
            <Card
              className={style.card}>
              <Card.Header
                title={<span>其他</span>}
                extra={<Link to="/resume/other"><img className={style.edit} src={editIcon} /></Link>} />
              <Card.Body className={style.main}>
                {other_exps.map(item => (
                  <Flex key={item.id} direction="column" align="stretch" className={style.panel}>
                    <div>{option.opts_topic_index[item.info_type]}</div>
                    <div className={style.info}>
                      <span>{item.content_cn}</span>
                    </div>
                  </Flex>
                ))}
              </Card.Body>
            </Card>
          </div>
        </Flex.Item>
      </Flex>
    )
  }
}

export default Resume
