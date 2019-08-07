
import nodemailer from 'nodemailer';
import { EmailTemplate } from 'email-templates';
import path from 'path';

const transporter = nodemailer.createTransport('smtps://sevenpictures.mailing%40gmail.com:thflatk4601@@smtp.gmail.com')
// const transporter = nodemailer.createTransport('smtps://dkdkajej%40gmail.com:Iw2hGF,wcum&slm.@smtp.gmail.com')

const purchaseSuccessTemplate = path.join(__dirname, '../src/express/templates/email/purchaseSuccess')
const purchaseSuccessEmail = new EmailTemplate(purchaseSuccessTemplate)

const purchaseFailureTemplate = path.join(__dirname, '../src/express/templates/email/purchaseFailure')
const purchaseFailureEmail = new EmailTemplate(purchaseFailureTemplate)

const purchaseResultTemplate = path.join(__dirname, '../src/express/templates/email/purchaseResult')
const purchaseResultEmail = new EmailTemplate(purchaseResultTemplate)

const purchaseFailedTemplate = path.join(__dirname, '../src/express/templates/email/purchaseFailed')
const purchaseFailedEmail = new EmailTemplate(purchaseFailedTemplate)

const newPostInfoTemplate = path.join(__dirname, '../src/express/templates/email/newPostInfo')
const newPostInfoEmail = new EmailTemplate(newPostInfoTemplate)

const newQnAInfoTemplate = path.join(__dirname, '../src/express/templates/email/newQnAInfo')
const newQnAInfoEmail = new EmailTemplate(newQnAInfoTemplate)

const addressChangeInfoTemplate = path.join(__dirname, '../src/express/templates/email/addressChange')
const addressChangeInfoEmail = new EmailTemplate(addressChangeInfoTemplate)

const StorePurchaseTemplate = path.join(__dirname, '../src/express/templates/email/StorePurchase')
const StorePurchaseSuccessEmail = new EmailTemplate(StorePurchaseTemplate)

const StorePurchaseCancelTemplate = path.join(__dirname, '../src/express/templates/email/StorePurchaseCancel')
const StorePurchaseCancelEmail = new EmailTemplate(StorePurchaseCancelTemplate)

const newCheckTemplate = path.join(__dirname, '../src/express/templates/email/checkEmail')
const newCheckEmail = new EmailTemplate(newCheckTemplate)

const newConfirmTemplate = path.join(__dirname, '../src/express/templates/email/confirmEmail')
const newConfirmEmail = new EmailTemplate(newConfirmTemplate)

const newInvoiceTemplate = path.join(__dirname, '../src/express/templates/email/invoiceEmail')
const newInvoiceEmail = new EmailTemplate(newInvoiceTemplate)

const newMakeTemplate = path.join(__dirname, '../src/express/templates/email/makeEmail')
const newMakeEmail = new EmailTemplate(newMakeTemplate)

const getOptions = ({
	from = '"7Pictures" <bmlee@7pictures.co.kr>',
// 	to = 'dkdkajej@gmail.com, pjh@7pictures.co.kr, bmlee@7pictures.co.kr, hjjeon@7pictures.co.kr',
	to, // = 'dkdkajej@gmail.com, pjh@7pictures.co.kr', // to test
	subject = 'Test email',
	text,
	html,
	...others
}) => ({
	from,
	to,
	subject,
	text,
	html,
	...others,
})

class Mailer {
  async sendPurchaseSuccessMail(purchase, url) {
    const {
      user,
      project = null,
      product = null,
      address,
      payment,
      reward,
      purchaseAmount,
      shippingFee,
      result_description,
      purchase_info: {
        amount
      },
    } = purchase
    
    let creatorEmail = project ? project.creator.creatorEmail : product.creator.creatorEmail
    
    let Dday = project ? project.funding.dateTo : product.funding.dateTo
    let shippingDay = project ? project.funding.rewards[0].shippingDay : product.funding.rewards[0].shippingDay
    shippingDay = shippingDay == "" || " " ? "3주 이내" : shippingDay
    let pTitle = project ? project.abstract.shortTitle : product.abstract.shortTitle
    let pName = project ? project.abstract.projectName : product.abstract.productName
    let pNameLink = project ? `https://netflix-salon.co.kr/projects/${pName}` : `https://netflix-salon.co.kr/products/${pName}`

    purchaseSuccessEmail.render({
      user, pTitle, pName, pNameLink, address, reward, purchaseAmount, shippingFee, amount, url, Dday, shippingDay, result_description
    }, 'ejs', function (e, result) {
  		if (e) {
  			// console.log('e.message', e.message)
  		}

  		let { html, text } = result

  		transporter.sendMail(getOptions({
        ...result,
        to: ['bmlee@7pictures.co.kr'], // to test...
        bcc: [user.local_email, user.fb_email].join(', '),
        subject: `[7Pictures] 결제 완료 - ${pTitle} : ${result_description}`,
      }), function (err, info) {
  			if (err) {
  				// console.log('e.message', e.message)
  			}

  			return info
  		})
  	})
  }

  async sendPurchaseFailureMail(purchase, error_msg) {
    const {
      user,
      project = null,
      product = null,
      address,
      payment,
      reward,
      purchaseAmount,
      shippingFee,
      result_description,
      purchase_info: {
        amount
      },
    } = purchase
    
    let Dday = project ? project.funding.dateTo : product.funding.dateTo
    let pTitle = project ? project.abstract.shortTitle : product.abstract.shortTitle
    let pName = project ? project.abstract.projectName : product.abstract.productName
    let pNameLink = project ? `https://netflix-salon.co.kr/projects/${pName}` : `https://netflix-salon.co.kr/products/${pName}`

    purchaseFailureEmail.render({
      user, pTitle, pName, pNameLink, address, reward, purchaseAmount, shippingFee, amount, Dday, result_description
    }, 'ejs', function (e, result) {
  		if (e) {
  			// console.log('e.message', e.message)
  		}

  		let { html, text } = result

  		transporter.sendMail(getOptions({
        ...result,
        to: ['bmlee@7pictures.co.kr'], // to test...
        bcc: [user.local_email, user.fb_email].join(', '),
        subject: `[7Pictures] 결제 예약 취소 - ${result_description}`,
      }), function (err, info) {
  			if (err) {
  				// console.log('e.message', e.message)
  			}

  			return info
  		})
  	})
  }

	async sendPurchaseResultMail(purchase) {
		const {
      user,
      project = null,
      product = null,
      address,
      payment,
      reward,
      purchaseAmount,
      shippingFee,
      result_description,
      purchase_info: {
        amount
      },
    } = purchase
    
    let creatorEmail = project ? project.creator.creatorEmail : product.creator.creatorEmail
    
    
    let Dday = project ? project.funding.dateTo : product.funding.dateTo
    var yy = parseInt(Dday.substr(0, 4), 10);
    var mm = parseInt(Dday.substr(5, 2), 10);
    var dd = parseInt(Dday.substr(8), 10);
 
    var d = new Date(yy, mm - 1, dd + 1);
 
    yy = d.getFullYear();
    mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
    dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;
    
    let new_Dday = '' + yy + '-' +  mm  + '-' + dd;
    
    let pTitle = project ? project.abstract.shortTitle : product.abstract.shortTitle
    let pName = project ? project.abstract.projectName : product.abstract.productName
    let pNameLink = project ? `https://netflix-salon.co.kr/projects/${pName}` : `https://netflix-salon.co.kr/products/${pName}`

		purchaseResultEmail.render({
      user, pTitle, pName, pNameLink, address, reward, purchaseAmount, shippingFee, amount, Dday, new_Dday, result_description
    }, 'ejs', function (e, result) {
  		if (e) {
  			// console.log('e.message', e.message)
  		}

  		let { html, text } = result

  		transporter.sendMail(getOptions({
        ...result,
        to: ['bmlee@7pictures.co.kr', creatorEmail], // to test...
        bcc: [user.local_email, user.fb_email].join(', '),
        subject: `[7Pictures] 결제 예약 내역 - ${result_description}`,
      }), function (err, info) {
  			if (err) {
  				// console.log('e.message', e.message)
  			}

  			return info
  		})
  	})
	}
	
	async sendPurchaseFailedMail(purchase, fail_reason) {
    const {
      user,
      project = null,
      product = null,
      address,
      payment,
      reward,
      purchaseAmount,
      shippingFee,
      result_description,
      purchase_info: {
        amount
      },
    } = purchase
    
    let Dday = project ? project.funding.dateTo : product.funding.dateTo
    let pTitle = project ? project.abstract.shortTitle : product.abstract.shortTitle
    let pName = project ? project.abstract.projectName : product.abstract.productName
    let pNameLink = project ? `https://netflix-salon.co.kr/projects/${pName}` : `https://netflix-salon.co.kr/products/${pName}`

    purchaseFailedEmail.render({
      user, pTitle, pName, pNameLink, reward, purchaseAmount, shippingFee, amount, Dday, fail_reason, result_description
    }, 'ejs', function (e, result) {
  		if (e) {
  			// console.log('e.message', e.message)
  		}

  		let { html, text } = result

  		transporter.sendMail(getOptions({
        ...result,
        to: ['bmlee@7pictures.co.kr'], // to test...
        bcc: [user.local_email, user.fb_email].join(', '),
        subject: `[7Pictures] 결제 실패 - ${pTitle} : ${fail_reason}`,
      }), function (err, info) {
  			if (err) {
  				// console.log('e.message', e.message)
  			}

  			return info
  		})
  	})
  }
	
  // Send Post Mail to users...
  async sendPostMail(p_alter, projectName, shortTitle, postTitle, mails) {
    console.log('target mails', mails)
    newPostInfoEmail.render({
      p_alter, projectName, shortTitle, postTitle
    }, 'ejs', function (e, result) {
  		if (e) {
  			// console.log('e.message', e.message)
  		}

  		let { html, text } = result

  		transporter.sendMail(getOptions({
        ...result,
        // to: mails.join(', '),
        to: ['bmlee@7pictures.co.kr', 'mjlee@7pictures.co.kr', 'hjjeon@7pictures.co.kr', 'makim@7pictures.co.kr'].join(', '),
        bcc: [mails].join(', '),
        subject: `[7Pictures] 새로운 소식 - ${shortTitle}`,
      }), function (err, info) {
  			if (err) {
  				// console.log('e.message', e.message)
  			}

  			return info
  		})
  	})
  }
  
  async sendQnAMail(shortTitle, QnAText, mails) {
    console.log('target QnA mails', mails)
    newQnAInfoEmail.render({
      shortTitle, QnAText
    }, 'ejs', function (e, result) {
  		if (e) {
  			// console.log('e.message', e.message)
  		}

  		let { html, text } = result

  		transporter.sendMail(getOptions({
        ...result,
        to: ['bmlee@7pictures.co.kr', 'mjlee@7pictures.co.kr', 'hjjeon@7pictures.co.kr', 'makim@7pictures.co.kr'].join(', '),
        bcc: [mails].join(', '),
        subject: `[7Pictures] 새로운 댓글 - ${shortTitle}`,
      }), function (err, info) {
  			if (err) {
  				// console.log('e.message', e.message)
  			}

  			return info
  		})
  	})
  }
  
  async sendAddressChangeMail(shortTitle, name, reward) {
    addressChangeInfoEmail.render({
      shortTitle, name, reward
    }, 'ejs', function (e, result) {
  		if (e) {
  			// console.log('e.message', e.message)
  		}

  		let { html, text } = result

  		transporter.sendMail(getOptions({
        ...result,
        to: ['help@7pictures.co.kr', 'bmlee@7pictures.co.kr'].join(', '),
        subject: `[7Pictures 배송지변경] ${shortTitle}-${name}`,
      }), function (err, info) {
  			if (err) {
  				// console.log('e.message', e.message)
  			}

  			return info
  		})
  	})
  }
  
  async sendStorePurchaseMail(purchase) {
    const {
      user,
      store = null,
      address,
      purchase_info: {
        amount
      },
      result_description
    } = purchase
    
    let storeEmail = store.storeInfo.storeEmail
    let orderEnd = store.storeShippingCycle.orderEnd
    let shippingStart = store.storeShippingCycle.shippingStart
    let shippingArray = store.storeShippingCycle.shipping_array.toString()
    let Title = store.abstract.title
    let Link = `https://netflix-salon.co.kr/store/${store.abstract.storeLink}`
    
    let purchase_email = !address.real_email ? user.local_email : address.real_email

    StorePurchaseSuccessEmail.render({
      user, Title, Link, address, amount, result_description, orderEnd, shippingStart, shippingArray
    }, 'ejs', function (e, result) {
  		if (e) {
  			// console.log('e.message', e.message)
  		}

  		let { html, text } = result

  		transporter.sendMail(getOptions({
        ...result,
        to: purchase_email,
        bcc: [storeEmail, 'bmlee@7pictures.co.kr', 'mjlee@7pictures.co.kr', 'sjcho@7pictures.co.kr', 'hjjeon@7pictures.co.kr'].join(', '),
        subject: `[7Pictures] 구매 완료 - ${Title} : ${result_description}`,
      }), function (err, info) {
  			if (err) {
  				// console.log('e.message', e.message)
  			}

  			return info
  		})
  	})
  }
  
  async sendStorePurchaseCancelMail(purchase) {
    const {
      user,
      store = null,
      address,
      purchase_info: {
        amount
      },
      result_description
    } = purchase
    
    let storeEmail = store.storeInfo.storeEmail
    let Title = store.abstract.title
    let Link = `https://netflix-salon.co.kr/store/${store.abstract.storeLink}`
    
    let purchase_email = !address.real_email ? user.local_email : address.real_email

    StorePurchaseCancelEmail.render({
      user, Title, Link, address, amount, result_description
    }, 'ejs', function (e, result) {
  		if (e) {
  			// console.log('e.message', e.message)
  		}

  		let { html, text } = result

  		transporter.sendMail(getOptions({
        ...result,
        to: purchase_email,
        bcc: [storeEmail, 'bmlee@7pictures.co.kr', 'mjlee@7pictures.co.kr', 'sjcho@7pictures.co.kr', 'hjjeon@7pictures.co.kr'].join(', '),
        subject: `[7Pictures] 구매 취소 - ${Title} : ${result_description}`,
      }), function (err, info) {
  			if (err) {
  				// console.log('e.message', e.message)
  			}

  			return info
  		})
  	})
  }
  
  
  async sendCheckMail(checkNumber, mail) {
    newCheckEmail.render({
      checkNumber
    }, 'ejs', function (e, result) {
  		if (e) {
  			// console.log('e.message', e.message)
  		}

  		let { html, text } = result

  		transporter.sendMail(getOptions({
        ...result,
        to: mail,
        subject: `[7Pictures] 이메일인증`,
      }), function (err, info) {
  			if (err) {
  				// console.log('e.message', e.message)
  			}

  			return info
  		})
  	})
  }
  
  async sendConfirmMail(title, mail) {
    newConfirmEmail.render({
      title
    }, 'ejs', function (e, result) {
  		if (e) {
  			// console.log('e.message', e.message)
  		}

  		let { html, text } = result

  		transporter.sendMail(getOptions({
        ...result,
        to: mail,
        subject: `[7Pictures] ` + title + ` 프로젝트 검토완료`,
      }), function (err, info) {
  			if (err) {
  				// console.log('e.message', e.message)
  			}

  			return info
  		})
  	})
  }
  
  async sendInvoiceMail(title, items, mail, shippingCompany, shippingCompany_link, invoice_number, name) {
    newInvoiceEmail.render({
      title, items, shippingCompany, shippingCompany_link, invoice_number, name
    }, 'ejs', function (e, result) {
      if (e) {
  			// console.log('e.message', e.message)
  		}

  		let { html, text } = result

  		transporter.sendMail(getOptions({
        ...result,
        to: [mail, 'bmlee@7pictures.co.kr'].join(', '),
        subject: `[7Pictures] ` + items + ` 발송완료`,
      }), function (err, info) {
  			if (err) {
  				// console.log('e.message', e.message)
  			}

  			return info
  		})
  	})
  }
  
  async sendMakeMail(title, PorS, link) {
    newMakeEmail.render({
      title, PorS, link
    }, 'ejs', function (e, result) {
  		if (e) {
  			// console.log('e.message', e.message)
  		}

  		let { html, text } = result

  		transporter.sendMail(getOptions({
        ...result,
        to: ['help@7pictures.co.kr', 'hjjeon@7pictures.co.kr', 'mjlee@7pictures.co.kr', 'bmlee@7pictures.co.kr'].join(', '),
        subject: `[7Pictures] ` + title + ' ' + PorS +` 신청!`,
      }), function (err, info) {
  			if (err) {
  				// console.log('e.message', e.message)
  			}

  			return info
  		})
  	})
  }
  
}

export default new Mailer()
