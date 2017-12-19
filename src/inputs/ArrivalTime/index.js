import { connect } from 'react-redux'
import ComplexSelView from '../../components/Complex/ComplexSelView'

@connect(state => {
  return {
    options: state.option.opts_arrival_time,
    optIndex: state.option.opts_arrival_time_index,
  }
})
class ArrivalTime extends ComplexSelView {}

export default ArrivalTime
