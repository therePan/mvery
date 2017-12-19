// 清酒稻香
import React from 'react'
// import style from './style.less'
import { List } from 'antd-mobile'
import { createForm } from 'rc-form'
import Post from '../../inputs/Post'
import Area from '../../inputs/Area'
import Industry from '../../inputs/Industry'
import More from '../../inputs/More'
import Salary from '../../inputs/Salary'
import SimpleItem from '../../inputs/SimpleItem'

@createForm()
class Test2 extends React.Component {
  format(value) {
    return value.length ? `(${value.length})` : null
  }

  formatMore(value) {
    const len = Object.keys(value).length
    return len ? `(${len})` : ''
  }

  // componentDidUpdate() {
  //   this.props.form.validateFields((err, values) => {
  //     console.log(values)
  //   })
  // }

  render() {
    const { form } = this.props
    const { getFieldProps } = form

    return (
      <div>
        <List>
          <Post {...getFieldProps('post')}>
            <List.Item arrow="horizontal">意向职位</List.Item>
          </Post>
          <Post {...getFieldProps('posts')} maxLength={3}>
            <List.Item arrow="horizontal">意向职位</List.Item>
          </Post>
          <Area {...getFieldProps('area')}>
            <List.Item arrow="horizontal">选择城市</List.Item>
          </Area>
          <Area {...getFieldProps('areas')} maxLength={3}>
            <List.Item arrow="horizontal">选择城市</List.Item>
          </Area>
          <Industry {...getFieldProps('industry')}>
            <List.Item arrow="horizontal">行业分类</List.Item>
          </Industry>
          <More {...getFieldProps('more')}>
            <List.Item arrow="horizontal">更多搜索条件</List.Item>
          </More>
          <Salary {...getFieldProps('salary')}>
            <List.Item arrow="horizontal">薪资模式</List.Item>
          </Salary>
          <Salary.Scope {...getFieldProps('salary_scope')}>
            <List.Item arrow="horizontal">薪资范围</List.Item>
          </Salary.Scope>
        </List>
        <Area
          {...getFieldProps('areas1')}>
          <span>选择地区</span>
        </Area>

        <Post {...getFieldProps('simple-posts')}
          extra="" format={this.format} maxLength={5}>
          <SimpleItem arrow="horizontal">行业</SimpleItem>
        </Post>
        <Area {...getFieldProps('simple-area')}
          extra="">
          <SimpleItem arrow="horizontal">城市</SimpleItem>
        </Area>
        <Salary.Scope {...getFieldProps('simple-salary_scope')}
          extra="" format={this.format}>
          <SimpleItem arrow="horizontal">薪资</SimpleItem>
        </Salary.Scope>
        <More {...getFieldProps('simple-more')}
          format={this.formatMore}>
          <SimpleItem arrow="horizontal">更多</SimpleItem>
        </More>
      </div>
    )
  }
}

export default Test2
