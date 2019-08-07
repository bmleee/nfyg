import express from 'express'

import UserModel from '../models/user'
import PurchaseModel from '../models/purchase'

import Mailer from '../lib/Mailer'

const router = express.Router()

router.post('/', async (req, res) => {
  console.log('iamport.post.body', req.body);
  
  try {
    // https://github.com/iamport/iamport-manual/tree/master/%EC%9D%B8%EC%A6%9D%EA%B2%B0%EC%A0%9C
    const {
      success = false, // 결제 성공 여부
      error_code = '', // Iamport 서버에서 구현 안됨
      error_msg = '', // 거래 처리 실패 시 메시지
      imp_uid, // iamport 에서 부여한 거래 id
      merchant_uid,
      status, // ready, paid, cancelled, failed
      pay_method = '', // card, trans, vbank, phone
      paid_amount = 0, // 실제 결제 금액 혹은 가상계좌 입금 예정액
      buyer_name = '',
      buyer_email = '',
      buyer_tel = '',
      buyer_addr = '',
      buyer_postcode = '',
      paid_at = '',
      receipt_url = '', // 매출전표
      apply_num = '', // 카드사 승인번호, 신용카드결제에 한함
      vbank_num = '', // 가상계좌 입금 계좌번호
      vbank_name = '', // 가상계좌 은행명
      vbank_holder = '', // 가상계좌 예금주
      vbank_date = '', // 가상계좌 입금기한, UNIX timestamp
    } = req.body
    
    console.log('POST /api/iamport req.body', req.body)

    if (!merchant_uid) {
      console.error(`merchant_uid is not specified`)
    }
    
    if (status === 'failed') {
      let purchase = await PurchaseModel.findOneByMerchantId(merchant_uid)
        .populate('user project product')
      let r = await purchase.cancelByApi(error_msg)
      await Mailer.sendPurchaseFailureMail(purchase, error_msg)
    } else if (status === 'paid') {
      let purchase = await PurchaseModel.findOneByMerchantId(merchant_uid)
        .populate('user project product')
      let r = await purchase.cancelByApi(error_msg)
      await Mailer.sendPurchaseSuccessMail(purchase, '7pictures.co.kr')
    }

    res.json({})
  } catch (e) {
    console.error(e);
    res.status(500).json({})
  }

})
export default router
