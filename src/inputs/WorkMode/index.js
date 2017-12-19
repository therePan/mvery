import { connect } from 'react-redux'
import ComplexSelView from '../../components/Complex/ComplexSelView'

@connect(state => {
  return {
    options: state.option.opts_work_mode,
    optIndex: state.option.opts_work_mode_index,
  }
})
class WrokMode extends ComplexSelView {}

export default WrokMode
