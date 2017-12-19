import { connect } from 'react-redux'
import ComplexSelView from '../../components/Complex/ComplexSelView'

@connect(state => {
  return {
    options: state.option.positions,
    optIndex: state.option.positions_index,
  }
})
class Post extends ComplexSelView {
  filter = (code) => {
    const value = this.state.value
    const sort = value.map(code => code.match(/\d{2}/)[0] + '00')
    return sort.indexOf(code) >= 0
  }
}

export default Post
