import React from 'react'
import style from './style.less'

class TipOffsType extends React.Component {
  state = {
    typeArr: [{
                name: '虚假招聘',
                choose: false,
              },{
                name: '冒用公司',
                choose: false,
              },{
                name: '分类错误',
                choose: false,
              },{
                name: '中介',
                choose: false,
              },{
                name: '其他',
                choose: false,
              }],

  }
  offType = []
  change = (key) => {
    this.offType = []
    // this.state.typeArr[key].choose = !this.state.typeArr[key].choose
    let list = this.state.typeArr;
    list[key].choose = !this.state.typeArr[key].choose
    this.setState({
      typeArr: list,
    })
    this.state.typeArr.forEach((item,index)=>{
      item.choose && this.offType.push(index+1)
    })
    const type = this.offType.join(',')
    this.props.onChange(type)
  }
  render() {
    return (
      <div className={style.content}>
        <div className={style.top}>举报类型</div>
        <ul className={style.bottom}>
          {
            this.state.typeArr.map((item,index) => (
              <li 
                key={index} 
                className={
                  item.choose ? style.choosed : ''
                }
                onClick={() => this.change(index)}
              >{item.name}</li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default TipOffsType
