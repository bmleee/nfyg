/**
 * [UnauthorizedAccess description]
 * @param {[type]} message [description]
 * @param {[type]} user    [description]
 * @param {[type]} target  [description]
 */
export function UnauthorizedAccess(message, user, target) {
  this.name = "UnauthorizedAccess"
  this.message = message || this.name
  this.user = user
  this.target = target
}
UnauthorizedAccess.prototype.handle = function () {

}


/**
 * [ResourceNotFound description]
 * @param {[type]} message [description]
 * @param {[type]} user    [description]
 * @param {[type]} type    [description]
 * @param {[type]} param   [description]
 */
export function ResourceNotFound(message, user, type, param) {
  this.name = "ResourceNotFound"
  this.message = message || this.name
  this.user = user
  this.type = type
  this.param = param
}
ResourceNotFound.prototype.handle = function () {

}

export function functionName() {

}


class ErrorHandler {
  handle(e) {
    if (e instanceof UnauthorizedAccess
      || e instanceof ResourceNotFound) {
      return e.handle()
    }

    
  }
}


export default new ErrorHandler()
