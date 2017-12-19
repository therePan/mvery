/**
 * Created by huangchao on 2017/9/26.
 */
import React from 'react'
import style from './style.less'
import PropTypes from 'prop-types'
import deleteimg from '@static/delete@3x.png'

const ShowItem = (props) => {
  let {comtant, callback, id} = props
  return (
    <div className={style.ShowItemWrap} onClick={() => { callback(id) }}>
      <div>
        <span>{comtant}</span>
        <span className={style.delete}>
          <img src={deleteimg} alt="删除"/>
        </span>
      </div>
    </div>
  )
}

ShowItem.propTypes = {
  comtant: PropTypes.string,
  callback: PropTypes.func,
  id: PropTypes.string,
}

export default ShowItem

// class ShowItem extends Component {
//   static propTypes = {
//     comtant: PropTypes.string,
//     callback: PropTypes.func,
//     id: PropTypes.number,
//   }
//   render() {
//     let {comtant, callback, id} = this.props
//     return (
//       <div className={style.ShowItemWrap} onClick={() => { callback(id) }}>
//         <div>
//           <span>{comtant}</span>
//           <span className={style.delete}>X</span>
//         </div>
//       </div>
//     )
//   }
// }
