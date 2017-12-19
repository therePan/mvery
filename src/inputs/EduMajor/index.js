import { connect } from 'react-redux'
import ComplexSelView from '../../components/Complex/ComplexSelView'

@connect(state => {
  return {
    options: state.option.opts_edu_major,
    optIndex: state.option.opts_edu_major_index,
  }
})
class EduMajor extends ComplexSelView {}

export default EduMajor
