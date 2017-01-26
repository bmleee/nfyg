
import nodemailer from 'nodemailer';
import { EmailTemplate } from 'email-templates';
import path from 'path';

const transporter = nodemailer.createTransport('smtps://dkdkajej%40gmail.com:Iw2hGF,wcum&slm.@smtp.gmail.com')

const purchaseSuccessTemplate = path.join(__dirname, '../src/express/templates/email/purchaseSuccess')
const purchaseSuccessEmail = new EmailTemplate(purchaseSuccessTemplate)

const purchaseFailureTemplate = path.join(__dirname, '../src/express/templates/email/purchaseFailure')
const purchaseFailureEmail = new EmailTemplate(purchaseFailureTemplate)

const getOptions = ({
	from = '"7Pictures" <bmlee@7pictures.co.kr>',
// 	to = 'dkdkajej@gmail.com, pjh@7pictures.co.kr, bmlee@7pictures.co.kr, hjjeon@7pictures.co.kr',
	to = 'dkdkajej@gmail.com, pjh@7pictures.co.kr', // to test
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

      purchase_info: {
        amount
      },
    } = purchase

    let pName = project ? project.abstract.projectName : product.abstract.productName

    purchaseSuccessEmail.render({
      user, pName, address, reward, purchaseAmount, shippingFee, amount, url,
    }, 'ejs', function (e, result) {
  		if (e) {
  			throw e
  		}

  		let { html, text } = result

  		transporter.sendMail(getOptions({
        ...result,
        to: [user.local_email, user.fb_email].join(', '),
        subject: '주문 성공',
      }), function (err, info) {
  			if (err) {
  				throw e
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

      purchase_info: {
        amount
      },
    } = purchase

    let pName = project ? project.abstract.projectName : product.abstract.productName

    purchaseFailureEmail.render({
      user, pName, address, reward, purchaseAmount, shippingFee, amount,
    }, 'ejs', function (e, result) {
  		if (e) {
  			throw e
  		}

  		let { html, text } = result

  		transporter.sendMail(getOptions({
        ...result,
        // to: [user.local_email, user.fb_email].join(', '), // to test...
        subject: '주문 취소',
      }), function (err, info) {
  			if (err) {
  				throw e
  			}

  			return info
  		})
  	})
  }

}

export default new Mailer()