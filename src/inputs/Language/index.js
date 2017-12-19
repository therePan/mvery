import { connect } from 'react-redux'
import ComplexSelView from '../../components/Complex/ComplexSelView'

@connect(state => {
  return {
    options: state.option.opts_language,
    optIndex: state.option.opts_language_index,
  }
})
class Language extends ComplexSelView {}

export default Language
