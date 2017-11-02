import { connect } from 'react-redux'
import TodoList from './Testen'


const jaja = dispatch => {
  return {
    onTodoClick: () => {
     
    }
  }
}

const tete = state => {
  return {
    data: state.tweet.data[state.tweet.data.length-1]
  }
}

const Vtdlist = connect(
  tete,
  jaja
)(TodoList)

export default Vtdlist;