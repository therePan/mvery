import { connect } from 'react-redux'
import ComplexSelView from '../../components/Complex/ComplexSelView'

@connect(state => {
  return {
    options: state.option.opts_room_board,
    optIndex: state.option.opts_room_board_index,
  }
})
class RoomBoard extends ComplexSelView {}

export default RoomBoard
