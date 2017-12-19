import React from 'react'
import style from './style.less'
import PropTypes from 'prop-types'

class SendMessage extends React.Component {
  static propTypes = {
    send: PropTypes.func,
    scrollBto: PropTypes.func,
  }
  getPerHeight = (e) => {
    this.pre.textContent = e.target.value;
    e.target.style.height = this.pre.offsetHeight+'px';
  }
  sendClick = () => {
    this.otext.focus();
    const inf = this.otext.value;
    if (!/^\s*$/.test(inf)) {
      this.otext.value = '';
      this.otext.style.height = '0.72rem'
    }
    this.props.send(inf)
  }
  scrollBto = () => {
    // alert(document.body.scrollTop)
    setTimeout(function(){
      document.body.scrollTop = document.body.scrollHeight
    },300)
    // alert(document.body.scrollHeight);
    this.props.scrollBto()
  }
  render() {
    return (
      <div className={style.content}>
        <div className={style.inputCon}>
          <pre className={style.input} ref={(e)=>{ this.pre = e}} ></pre>
          <textarea 
            className={style.input} 
            placeholder="说点什么吧..." 
            onInput={(e) => {this.getPerHeight(e)}} 
            ref={(e)=>{ this.otext = e}} 
            onFocus={() => {this.scrollBto()}}
          />
        </div>
        <div className={style.sendCon}>
          <span onClick={() => {this.sendClick()}}>发送</span>
        </div>
      </div>
    )
  }
}

export default SendMessage
