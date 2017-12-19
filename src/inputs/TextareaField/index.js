import React from 'react'
import ComplexFormField from '../../components/Complex/ComplexFormField'
import { NavBar, List, TextareaItem } from 'antd-mobile'
import style from './style.less'

class TextareaField extends ComplexFormField {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
    }
  }

  handleValueChange = (value) => {
    this.setState({ value })
  }

  changeValue() {
    this.props.onChange(this.state.value)
    this.changeVisible()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value })
    }
  }

  allView() {
    return (
      <List>
        <TextareaItem
          autoHeight rows={5}
          value={this.state.value}
          placeholder={this.props.placeholder}
          onChange={this.handleValueChange}
        ></TextareaItem>
      </List>
    )
  }

  wrapView(opt, main) {
    return (
      <div className={style.wrap}>
        <div className={style.opt}>{opt}</div>
        <div className={style.all}>{main}</div>
      </div>
    )
  }

  mainView() {
    return (
      <div className={style.root}>
        <NavBar
          mode="dark"
          className={style.nav}
          onLeftClick={() => this.changeVisible()}
          rightContent={<span onClick={() => this.changeValue()}>保存</span>}>
          {this.props.title || this.props.children.props.children}
        </NavBar>
        {this.wrapView(
          this.props.maxLength > 1 ?
            this.optView() : null,
          this.allView(this.props.options)
        )}
      </div>
    )
  }
}

export default TextareaField
