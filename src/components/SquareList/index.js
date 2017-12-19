import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid } from 'antd-mobile'
import style from './style.less'
// import { standard as bannerStandard } from '../../actions/banner'

@connect(state => {
  return {
    banner: state.banner,
  }
})
class SquareList extends Component {
  static propTypes = {
    classback: PropTypes.func,
  }
  showItem = data => (
    <div onClick={() => this.props.classback(data.querystr_map)} className="am-grid-item-inner-content column-num-4">
      <img className={style.img} src={data.image} />
      <div className={style.title}>{data.name}</div>
    </div>
  )
  componentDidMount() {
  }
  render() {
    let {navigation = []} = this.props.banner
    // console.log(this.props)
    // console.log(navigation > 8)
    return (
      <div className={style.SquareListWrap}>
        <Grid
          className={style.main}
          isCarousel={navigation.length > 8}
          data={navigation}
          hasLine={false}
          renderItem={data => this.showItem(data)}
        />
      </div>
    )
  }
}

export default SquareList
