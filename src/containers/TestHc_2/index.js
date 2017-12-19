/**
 * Created by huangchao on 2017/9/25.
 */
import React, { Component } from 'react'
import LisetItem from '../../components/ListItem'
import ForMassageWrap from '../../components/ForMassage'
import Resume from '@static/resume@3x.png'
import company from '@static/attentioncompany@3x.png'

let contant = `您好，非常荣幸收到你的简历，经过审慎评估，我们认为你与该职位的条件不太匹配，无法进入面试
阶段。 相信更好的机会一定还在翘首期盼着你，赶快调整心态，做好充足的准备重新出发吧！相信更好的机会一定还在翘首期盼着你，赶
快调整心态，做好充足的准备重新出发吧！`
class TestHcTwo extends Component {
  render() {
    return (
      <div>
        <h3>职位介绍&公司简介</h3>
        <h3>职位详情bar</h3>
        <h3>企业介绍bar</h3>
        <h3>
          个人中心页item API
        </h3>
        <div>1：img 【string】左边图标 </div>
        <div>2：titleleft【string】左边的title，</div>
        <div>3：righttitle【string】右边的title，</div>
        <div>4：rightcontant【string】右边的内容</div>
        <div>5：underline 【string】 下划线 默认false，</div>
        <div>6：num【string】角标上的数字，</div>
        <div>7：rightangle[string] 右侧箭头 默认true</div>
        <LisetItem
          img={Resume}
          titleleft="我的简历"
          righttitle="完整度"
          rightcontant="80%"
          rightangle="false"
          underline="true" />
        <LisetItem img={company} titleleft="关注企业" />
        <h3>投递记录-企业来信</h3>
        <ForMassageWrap company="杭州香格里拉大酒店人事部" type="不合适" data="2017年9月4日" contant={contant} />
      </div>
    )
  }
}

export default TestHcTwo
