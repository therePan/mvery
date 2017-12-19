import React from 'react'
import { List, NavBar, PickerView, Flex } from 'antd-mobile'
import { connect } from 'react-redux'
import ComplexSelView, { style as style$ } from '../../components/Complex/ComplexSelView'
import style from './style.less'

@connect(state => {
  return {
    options: state.option.opts_salary,
  }
})
class Salary extends ComplexSelView {
  constructor(props) {
    super(props)
    this.state = {
      value: [...props.value].map(item => parseInt(item, 10)),
    }
    this.init()
  }

  format() {
    const { auto, value, options } = this.props
    return auto ? options.salary_scope_index[value[2]] : `${value[2]}${options.salary_currency_index[value[1]]}`
  }
  
  handleValueChange = value => {
    this.setState({
      value: value,
    })
  }

  handleValueChangeByNumber = value => {
    this.setState({
      value: [...this.state.value.slice(0, 2), value],
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: [...nextProps.value].map(item => parseInt(item, 10)),
      })
    }
  }

  mainView() {
    const { options } = this.props
    const s1 = options.salary_mode.map(item => ({ value: item.code, label: item.value }))
    const s2 = options.salary_currency.map(item => ({ value: item.code, label: item.value }))
    const s3 = options.salary_scope.filter(item => item.mode === (this.state.value[0]))
      .map(item => ({ value: item.code, label: item.value }))
    console.log(this)

    return (
      <div className={style$.root}>
        <NavBar
          mode="dark"
          className={style$.nav}
          onLeftClick={() => this.changeVisible()}
          rightContent={<span onClick={() => this.changeValue()}>保存</span>}>
          {this.props.title || this.props.children.props.children}
        </NavBar>
        <div className={style$.wrap}>
          <div className={style$.all}>
            <Flex direction="row">
              <Flex.Item>
                <PickerView
                  onChange={this.handleValueChange}
                  value={this.state.value}
                  data={this.props.auto ? [s1, s2, s3] : [s1, s2]}
                  cascade={false}
                />
              </Flex.Item>
              {!this.props.auto && (
                <div className={style.input}>
                  <input value={this.state.value[2]} onChange={ev => this.handleValueChangeByNumber(ev.target.value)} />
                </div>
              )}
            </Flex>
          </div>
        </div>
      </div>
    )
  }
}

@connect(state => {
  return {
    options: state.option.opts_salary.salary_scope,
    optIndex: state.option.opts_salary.salary_scope_index,
  }
})
class SalaryScope extends ComplexSelView {
  allView(sublist) {
    return (
      <List className={style$.allView}>
        {this.listView(sublist.filter(item => item.mode === Number(this.props.mode || 1)))}
      </List>
    )
  }
}

Salary.Scope = SalaryScope

export default Salary
