import React from 'react'
import { List } from 'antd-mobile'
import { connect } from 'react-redux'
import ComplexSelView, { style as viewStyle } from '../../components/Complex/ComplexSelView'
import style from './style.less'
import okIcon from '@static/ok@3x.png'
import unsetIcon from '@static/unset@3x.png'
import areaIcon from '@static/area@3x.png'


@connect(state => {
  return {
    options: state.option.areas,
    optIndex: state.option.areas_index,
    hot: state.option.opts_hot_area,
    coord: state.supers.location,
  }
})
class Area extends ComplexSelView {
  filter = (code) => {
    const value = this.state.value
    const sort = value.map(code => code.match(/\d{2}/)[0] + '0000')
    return sort.indexOf(code) >= 0
  }

  allView(sublist) {
    if (this.props.coord && this.props.coord.address) {
      Object.keys(this.props.optIndex || {}).forEach(key => {
        if (new RegExp(this.props.optIndex[key]).test(this.props.coord.address.city)) {
          this.myCity = key
        }
      })
    }
    return (
      <div className={viewStyle.allView}>
        {this.myCity &&
          <List.Item
            className={style.myCity}
            onClick={() => this.selectValue(this.myCity)}>
            <img src={this.state.value.indexOf(this.myCity) >= 0 ? okIcon : unsetIcon} />
            <span className={style.city}>{this.props.optIndex[this.myCity]}</span>
            <span>当前定位城市</span>
            <img className={style.dds} src={areaIcon} />
          </List.Item>}
        <div className={style.title}>热门城市</div>
        {this.listView(this.props.hot)}
        <div className={style.title}>按省份选择城市</div>
        <List>
          {this.listView(sublist)}
        </List>
      </div>
    )
  }
}

export default Area
