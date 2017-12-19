import { connect } from 'react-redux'
import ComplexSelView from '../../components/Complex/ComplexSelView'

@connect(state => {
  return {
    options: state.option.opts_master_degree,
    optIndex: state.option.opts_master_degree_index,
  }
})
class MasterDegree extends ComplexSelView {}

export default MasterDegree
