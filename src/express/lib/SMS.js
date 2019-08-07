var accountSid = 'AC0b8aa949f7d2b6992a102756221c3d6c'; 
var authToken = 'e259580e0d49545c5073073adff88f23'; 
var client = require('twilio')(accountSid, authToken); 

class SMS {
  async sendPurchaseScheduleSms(purchase) {
    const {
      user,
      project = null,
      product = null,
      address,
      payment,
      reward,
      purchaseAmount,
      shippingFee,

      purchase_info: {
        amount
      },
    } = purchase
    
    let SMS_Target = address.addressee_number.replace(/\-/g,'')
    SMS_Target = SMS_Target.replace( "0", "+82");
    
    let Dday = project ? project.funding.dateTo : product.funding.dateTo
    Dday = Dday.replace(/-0|-/, "년 ");
    Dday = Dday.replace(/-0|-/, "월 ");
    Dday = Dday + "일"
    
    var yy = parseInt(Dday.substr(0, 4), 10);
    var mm = parseInt(Dday.substr(5, 2), 10);
    var dd = parseInt(Dday.substr(8), 10);
 
    var d = new Date(yy, mm - 1, dd + 1);
 
    yy = d.getFullYear();
    mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
    dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;
    
    let new_Dday = '' + yy + '-' +  mm  + '-' + dd;
    
    let pTitle = project ? project.abstract.shortTitle : product.abstract.shortTitle
    let pImgsrc = project ? project.abstract.imgSrc : product.abstract.imgSrc
    let pName = project ? project.abstract.projectName : product.abstract.productName
    let pNameLink = project ? `https://netflix-salon.co.kr/projects/${pName}` : `https://netflix-salon.co.kr/products/${pName}`
    
    let messagesbody = "[7Pictures] '" + pTitle + "' 후원예약완료! 펀딩 마감 후 결제"
    // console.log('pImgsrc', pImgsrc)
    
  	return client.api.messages
    .create({
      body: messagesbody,
      to: SMS_Target,
      from: "+15207779478",
    }).then(function(data) {
      console.log('Administrator notified');
    }).catch(function(err) {
      console.error('Could not notify administrator');
      console.error(err);
    });
  }
  
  async sendPurchaseSuccessSms(purchase) {
    const {
      user,
      project = null,
      product = null,
      address,
      payment,
      reward,
      purchaseAmount,
      shippingFee,

      purchase_info: {
        amount
      },
    } = purchase
    
    let SMS_Target = address.addressee_number.replace(/\-/g,'')
    SMS_Target = SMS_Target.replace( "0", "+82");
    
    let Dday = project ? project.funding.dateTo : product.funding.dateTo
    let shippingDay = project ? project.funding.rewards[0].shippingDay : product.funding.rewards[0].shippingDay
    shippingDay = shippingDay == "" || " " ? "3주 이내" : shippingDay
    let pTitle = project ? project.abstract.shortTitle : product.abstract.shortTitle
    let pName = project ? project.abstract.projectName : product.abstract.productName
    let pNameLink = project ? `https://netflix-salon.co.kr/projects/${pName}` : `https://netflix-salon.co.kr/products/${pName}`

  	return client.api.messages
    .create({
      body: "[7Pictures] '" + pTitle + "' 결제 성공! " + shippingDay + " 배송예정",
      to: SMS_Target,
      from: "+15207779478",
    }).then(function(data) {
      console.log('Administrator notified');
    }).catch(function(err) {
      console.error('Could not notify administrator');
      console.error(err);
    });
  }
  
  async sendPurchaseFailedSms(purchase, fail_reason) {
    const {
      user,
      project = null,
      product = null,
      address,
      payment,
      reward,
      purchaseAmount,
      shippingFee,

      purchase_info: {
        amount
      },
    } = purchase
    
    let SMS_Target = address.addressee_number.replace(/\-/g,'')
    SMS_Target = SMS_Target.replace( "0", "+82");
    
    let Dday = project ? project.funding.dateTo : product.funding.dateTo
    
    var yy = parseInt(Dday.substr(0, 4), 10);
    var mm = parseInt(Dday.substr(5, 2), 10);
    var dd = parseInt(Dday.substr(8), 10);
 
    var d = new Date(yy, mm - 1, dd + 5);
 
    yy = d.getFullYear();
    mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
    dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;
    
    let new_Dday = '' + yy + '-' +  mm  + '-' + dd;
    
    
    let pTitle = project ? project.abstract.shortTitle : product.abstract.shortTitle
    let pName = project ? project.abstract.projectName : product.abstract.productName
    let pNameLink = project ? `https://netflix-salon.co.kr/projects/${pName}` : `https://netflix-salon.co.kr/products/${pName}`

  	return client.api.messages
    .create({
      body: "[7Pictures] '" + pTitle + "' 결제실패! 실패 원인:" + fail_reason + "재결제 기간내에(5일) 확인해주세요!",
      to: SMS_Target,
      from: "+15207779478",
    }).then(function(data) {
      console.log('Administrator notified');
    }).catch(function(err) {
      console.error('Could not notify administrator');
      console.error(err);
    });
  }
  
  async sendPurchaseCancelledSms(purchase) {
    const {
      user,
      project = null,
      product = null,
      address,
      payment,
      reward,
      purchaseAmount,
      shippingFee,

      purchase_info: {
        amount
      },
    } = purchase
    
    let SMS_Target = address.addressee_number.replace(/\-/g,'')
    SMS_Target = SMS_Target.replace( "0", "+82");
    
    let Dday = project ? project.funding.dateTo : product.funding.dateTo
    let pTitle = project ? project.abstract.shortTitle : product.abstract.shortTitle
    let pName = project ? project.abstract.projectName : product.abstract.productName
    let pNameLink = project ? `https://netflix-salon.co.kr/projects/${pName}` : `https://netflix-salon.co.kr/products/${pName}`

  	return client.api.messages
    .create({
      body: "[7Pictures] '" + pTitle + "' 후원예약이 취소되었습니다.",
      to: SMS_Target,
      from: "+15207779478",
    }).then(function(data) {
      console.log('Administrator notified');
    }).catch(function(err) {
      console.error('Could not notify administrator');
      console.error(err);
    });
  }
  
  async sendStorePurchaseSMS(purchase) {
    const {
      user,
      store = null,
      address
    } = purchase
    
    let SMS_Target = address.addressee_number.replace(/\-/g,'')
    SMS_Target = SMS_Target.replace( "0", "+82");
    
    let shippingStart = store.storeShippingCycle.shipping_array.toString()
    let Title = store.abstract.title
    let Link = `https://netflix-salon.co.kr/store/${store.abstract.storeLink}`

  	return client.api.messages
    .create({
      body: "[7Pictures] '" + Title + "' 구매 완료! 배송은 " + shippingStart,
      to: SMS_Target,
      from: "+15207779478",
    }).then(function(data) {
      console.log('Administrator notified');
    }).catch(function(err) {
      console.error('Could not notify administrator');
      console.error(err);
    });
  }
  
  async sendCheckSMS(checkNumber, number) {
    
    let SMS_Target = number.replace(/\-/g,'')
    SMS_Target = SMS_Target.replace( "0", "+82");

  	return client.api.messages
    .create({
      body: "[7Pictures] 인증번호 [" + checkNumber + "]를 입력해주세요.",
      to: SMS_Target,
      from: "+15207779478",
    }).then(function(data) {
      console.log('Administrator notified');
    }).catch(function(err) {
      console.error('Could not notify administrator');
      console.error(err);
    });
  }
  
  
  async sendConfirmSMS(title, number) {
    
    let SMS_Target = number.replace(/\-/g,'')
    SMS_Target = SMS_Target.replace( "0", "+82");

  	return client.api.messages
    .create({
      body: "[7Pictures] " + title + " 프로젝트 검토완료",
      to: SMS_Target,
      from: "+15207779478",
    }).then(function(data) {
      console.log('Administrator notified');
    }).catch(function(err) {
      console.error('Could not notify administrator');
      console.error(err);
    });
  }
  
  async sendInvoiceSMS(items, number, shippingCompany, invoice_number) {
    
    let SMS_Target = number.replace(/\-/g,'')
    SMS_Target = SMS_Target.replace( "0", "+82");

  	return client.api.messages
    .create({
      body: "[7Pictures] " + items + " 발송완료 - " + shippingCompany + "(" + invoice_number + ")",
      to: SMS_Target,
      from: "+15207779478",
    }).then(function(data) {
      console.log('Administrator notified');
    }).catch(function(err) {
      console.error('Could not notify administrator');
      console.error(err);
    });
  }
  
  async sendMakeSMS(title, link) {
  	return client.api.messages
    .create({
      body: "[7Pictures] " + title + " 개설, 검토 바람! 링크 : " + link,
      to: "+821026199235",
      from: "+15207779478",
    }).then(function(data) {
      console.log('Administrator notified');
    }).catch(function(err) {
      console.error('Could not notify administrator');
      console.error(err);
    });
  }
  
}

export default new SMS()
