/**
 * Created by huangchao on 2017/11/4.
 */
import React from 'react'
import style from './style.less'
import { createForm } from 'rc-form'
import Post from '../../inputs/Post'
import Area from '../../inputs/Area'
import Salary from '../../inputs/Salary'
import SimpleItem from '../../inputs/SimpleItem'
import More from '../../inputs/More'
import angleDownGray from '@static/Rectangle@3x.png'


@createForm()
class FilterSearch extends React.Component {

  format(value) {
    return value.length ? `(${value.length})` : null
  }

  formatArea(value) {
    return value.length ? value.optIndex[value[0]] : '城市'
  }

  formatMore(value) {
    // console.log(value)
    const len = Object.keys(value).length
    return len ? `(${len})` : ''
  }
  componentWillReceiveProps(nextProps) {
    this.props.form.validateFields((err, values) => {
      const text = JSON.stringify(values)
      if (this.values !== text) {
        this.values = text
        this.props.onChange(values)
      }
    })
  }

  render() {
    const { form } = this.props
    const { getFieldProps } = form
    return (
      <div className={style.FilterSearchWrap}>
        <div className={style.item}>
          <Post {...getFieldProps('position')}
                extra="" format={this.format} maxLength={5}>
            <SimpleItem arrow="horizontal">行业</SimpleItem>
          </Post>
          <div className={style.jiantou}>
            <img src={angleDownGray} alt="" />
          </div>
        </div>
        <div className={style.item}>
          <Area {...getFieldProps('area')}
                extra="" format={this.formatArea}>
            <SimpleItem arrow="horizontal" />
          </Area>
          <div className={style.jiantou}>
            <img src={angleDownGray} alt="" />
          </div>
        </div>
        <div className={style.item}>
          <Salary.Scope {...getFieldProps('salary')}
                        extra="" format={this.format}>
            <SimpleItem arrow="horizontal">薪资</SimpleItem>
          </Salary.Scope>
          <div className={style.jiantou}>
            <img src={angleDownGray} alt="" />
          </div>
        </div>
        <div className={style.item}>
          <More {...getFieldProps('more')}
                extra="" format={this.formatMore}>
            <SimpleItem arrow="horizontal">更多</SimpleItem>
          </More>
          <div className={style.jiantou}>
            <img src={angleDownGray} alt="" />
          </div>
        </div>
      </div>
    )
  }
}

export default FilterSearch
