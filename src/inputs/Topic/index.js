import { connect } from 'react-redux'
import ComplexSelView from '../../components/Complex/ComplexSelView'

@connect(state => {
  return {
    options: state.option.opts_topic,
    optIndex: state.option.opts_topic_index,
  }
})
class Topic extends ComplexSelView {}

export default Topic
