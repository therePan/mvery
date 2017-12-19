import React from 'react'
import { Carousel } from 'antd-mobile'
import PropTypes from 'prop-types'
import style from './style.less'
import { connect } from 'react-redux'
import { getBanner } from '../../actions/banner'

@connect(state => {
  return {
    banner: state.banner,
  }
})
class Carousels extends React.Component {
  static propTypes = {
    banner: PropTypes.object,
  }
  state = {
    initialHeight: 176,
  }
  goPosition = (val) => {
    console.log(val)
    if(val.c_userid !== '0') {
      return this.props.history.push(`/companydetail/${val.c_userid}`)
    }
    if(val.job_id !== '0') {
      return  this.props.history.push(`/positiondetail/${val.job_id}`)
    }
    window.location.href = val.uri
  }
  componentWillMount() {
    this.props.dispatch(getBanner())
  }
  render() {
    let {ad = []} = this.props.banner
    const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
    return (
      <div style={hProp} className={style.CarouselsWrap}>
        <Carousel
          className={style.carousel}
          infinite
          autoplay
          selectedIndex={0}
          swipeSpeed={50}
          dotStyle={DOT.dotStyle}
          dotActiveStyle={DOT.dotActiveStyle}
        >
          {
            ad.map((val, i) => {
              return (<div key={i} className={style.aLink}>
                <img
                  onClick={() => {this.goPosition(val)}}
                  src={val.image}
                  alt="img"
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'))
                    this.setState({
                      initialHeight: null,
                    })
                  }}
                />
              </div>)
            })
          }
        </Carousel>
      </div>
    )
  }
}
const DOT = {
  dotStyle: {
    width: 0.16 + 'rem',
    height: 0.16 + 'rem',
    backgroundColor: '#fff',
    opacity: 0.5,
  },
  dotActiveStyle: {
    width: 0.34 + 'rem',
    height: 0.16 + 'rem',
    borderRadius: 0.08 + 'rem',
    backgroundColor: '#fff',
  },
}
// autoplay

export default Carousels

// {ad.map((val, i) => (
//   <div
//     key={i}
//     style={{background: `url(${val.image}) top/ contain no-repeat`}}
//     className={style.aLink}
//     onClick={() => {this.goPosition(val)}}
//   />
// ))}
