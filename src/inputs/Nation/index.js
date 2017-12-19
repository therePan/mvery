import { connect } from 'react-redux'
import ComplexSelView from '../../components/Complex/ComplexSelView'

@connect(state => {
  return {
    options: state.option.opts_nation.filter(item => item.code !== 0),
    optIndex: state.option.opts_nation_index,
  }
})
class Nation extends ComplexSelView {}

export default Nation
