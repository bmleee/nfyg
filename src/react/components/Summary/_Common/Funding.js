import React, { Component } from 'react'
import { Link } from 'react-router'

import renderStat from './lib/renderStat'

export default class Funding extends Component {
  render() {
    const {
      funding: {
        currentMoney,
        dateFrom,
        dateTo,
        rewards,
        shippingFee,
        targetMoney,

        // product part
        minPurchaseVolume,
        maxPurchaseVolume,
      },
      // product part
      stat
    } = this.props

    return (
      <div>
        <span>시작일: {dateFrom}</span>
        <span>종료일: {dateTo}</span>
        <span>현재 모급액: {currentMoney}</span>
        <span>목표 모급액: {targetMoney}</span>
        <span>배송비: {shippingFee}</span>

        { minPurchaseVolume && <span>최소 주문 수량: {minPurchaseVolume}</span> }
        { maxPurchaseVolume && <span>최대 주문 수량: {maxPurchaseVolume}</span> }
        { stat && renderStat(stat) }
        <div>
          {
            rewards.map(({
              title,
              description,
              isDirectSupport,
              thresholdMoney,
              imgSrc,
            }, index) => (
              <div key={index}>
                <img src={imgSrc} alt=""/>
                <span>리워드 이름: {title}</span>
                <span>리워드 설명: {description}</span>
                <span>금액: {thresholdMoney}</span>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
