import React from 'react'
import ComplexFormField from './ComplexFormField'
import { NavBar, Toast, Accordion, List } from 'antd-mobile'
import style from './style.less'
import xialaIcon from '@static/xiala@3x.png'
import okIcon from '@static/ok@3x.png'
import unsetIcon from '@static/unset@3x.png'
import rightIcon from '@static/right@3x.png'

export { style }

class ComplexSelView extends ComplexFormField {
  static defaultProps = {
    value: [],
    maxLength: 1,
    root: true,
  }

  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
    }
    this.init()
  }

  init() {}

  format(value) {
    return value.map((code) => this.props.optIndex[code]).join(',')
  }

  serialize(value) {
    let val = value instanceof Array ? [...value] : {...value}
    if (!val.hasOwnProperty('optIndex'))
      Object.defineProperty(val, 'optIndex', {
        get: () => this.props.optIndex,
      })
    return val
  }

  filter = (code) => {
    return this.getValue().indexOf(code) >= 0
  }

  selectValue = (code) => {
    if (this.props.maxLength > 1) {
      const { maxLength } = this.props
      let value = [...this.getValue()]
      let indexof = value.indexOf(code)
      if (indexof >= 0) {
        value.splice(indexof, 1)
      } else {
        if (maxLength <= 0 || value.length < maxLength) {
          value.push(code)
        } else {
          return Toast.info(`最多选择 ${maxLength} 个哦!`, .8)
        }
      }
      this.setState({ value })
    } else {
      this.setState({ value: [code] })
      setTimeout(() => this.changeValue())
    }
  }

  changeValue = () => {
    if (this.props.onChange) {
      this.props.onChange(this.serialize(this.getValue()))
      this.changeVisible(false, true)
    } else {
      this.changeVisible()
    }
  }

  handleVisible = (visible) => {
    if (!visible && this.props.root) {
      this.setState({ value: this.props.value })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.root && this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value })
    }
  }

  getValue() {
    return this.props.root ? this.state.value : this.props.value
  }

  optView() {
    const selected = this.getValue()
    return (
      <Accordion
        className={style.optView}
        defaultActiveKey={['opt']}>
        {/* 已经选中的项 */}
        <Accordion.Panel key={'opt'} header={
          <div className={style.arrow}>
            <div>{`最多可选 ${this.props.maxLength} 个`}</div>
            <div className={style.num}>
              <slot>{selected.length}</slot>/{this.props.maxLength}
            </div>
            <img src={xialaIcon} className="arrow-i" />
          </div>
        }>
          <div className={style.optList}>{selected.map(code => (
            <span key={code}>
              <slot>{this.props.optIndex[code]}</slot>
              <i onClick={() => (this.props.onSelect || this.selectValue)(code)} />
            </span>
          ))}</div>
        </Accordion.Panel>
      </Accordion>
    )
  }

  ItemView(item) {
    const selected = this.getValue()
    return item.sublist /* && item.sublist.length > 1 */ ?
      <ComplexSelView key={item.code}
        root={false}
        options={item.sublist}
        optIndex={this.props.optIndex}
        label={`${this.props.label || (this._complex && this._complex()._sign)}-${item.code}`}
        title={item.value}
        value={selected}
        maxLength={this.props.maxLength}
        onSelect={this.selectValue}>
        {() => (
          <List.Item className={style.listItem}>
            <img src={this.filter(item.code) ? okIcon : unsetIcon} />
            <span>{item.value}</span>
            <img src={rightIcon} className="arrow-i" />
          </List.Item>
        )}
      </ComplexSelView> :
      <List.Item className={style.listItem} key={item.code}
        onClick={() => (this.props.onSelect || this.selectValue)(item.code)}>
        <img src={selected.indexOf(item.code) >= 0 ? okIcon : unsetIcon} />
        <span>{item.value}</span>
      </List.Item>
  }

  listView(sublist) {
    return sublist.map(item => this.ItemView(item))
  }

  allView(sublist) {
    return (
      <List className={style.allView}>
        {this.listView(sublist)}
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

export default ComplexSelView
