import { connect } from 'react-redux'
import ComplexSelView from '../../components/Complex/ComplexSelView'

@connect(state => {
  return {
    options: state.option.opts_star_level,
    optIndex: state.option.opts_star_level_index,
  }
})
class StarLevel extends ComplexSelView {}

export default StarLevel
