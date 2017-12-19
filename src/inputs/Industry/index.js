import { connect } from 'react-redux'
import ComplexSelView from '../../components/Complex/ComplexSelView'

@connect(state => {
  return {
    options: state.option.opts_industry,
    optIndex: state.option.opts_industry_index,
  }
})
class Industry extends ComplexSelView {}

export default Industry
