/**
 * Created by huangchao on 2017/9/28.
 */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import style from './style.less'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { SearchBar } from 'antd-mobile'
import SimpleItem from '../../inputs/SimpleItem'
import { createForm } from 'rc-form'
import Area from '../../inputs/Area'
import angleDown from '@static/angleDown@3x.png'
import {saveCityCode} from '../../actions/userStatus'


@withRouter
@connect(state => ({
  userStatus: state.userStatus,
}))
@createForm()
class MySearchBar extends Component {
  static propTypes = {
    callback: PropTypes.func,
    searchFocus: PropTypes.func,
    touchCancel: PropTypes.func,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    showCity: PropTypes.string,
    cityName: PropTypes.string,
    autoFocus: PropTypes.bool,
  }

  formatArea(value) {
    return value.length ? value.optIndex[value[0]] : '城市'
  }

  componentDidMount() {
    if(this.props.autoFocus) {
      this.autoFocusInst.onFocus()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.form.validateFields((err, values) => {
      if(err) return
      if(values.areas && nextProps.userStatus.code !== values.areas) {
       // console.log(nextProps, values)
        this.props.dispatch(saveCityCode({ // 放入用户信息的reducer
          code: values.areas,
        }))
      }
    })
  }

  render() {
    const { form, userStatus } = this.props
    const { getFieldProps } = form
    const code = userStatus.code
    let { callback = function() {},
      defaultValue,
      placeholder,
      showCity,
      searchFocus = function() {},
      touchCancel = function() {},
      onChange= function() {},
    } = this.props
    return (
      <div className={style.SearchBarWrap}>
        {
          showCity === 'false'
          ? null
          : <div className={style.leftContant}>
            <div>
              <Area {...getFieldProps('areas', { initialValue: code ? code : [] })}
                    format={this.formatArea}>
                <SimpleItem arrow="horizontal" />
              </Area>
            </div>
            <img src={angleDown} alt="img" />
          </div>
        }
        <div className={`${style.search} ${showCity === 'false' ? style.paddingAdd : null}`}>
          <SearchBar
            defaultValue={defaultValue}
            onSubmit={(val) => callback(val)}
            onFocus={() => searchFocus()}
            ref={ref => this.autoFocusInst = ref}
            onCancel={() => touchCancel()}
            onChange={(val) => onChange(val)}
            className={style.bac}
            placeholder={placeholder} />
        </div>
      </div>
    )
  }
}

export default MySearchBar

// <div className={style.leftContant}>
// <div>杭州</div>
// <img src={angleDown} alt="img" />
//   </div>
