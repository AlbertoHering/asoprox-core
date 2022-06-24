class WrapperResult {
  constructor() {
    this.success = false;
    this.data = undefined;
    this.message = '';
    this.statusCode = 500;
  }
}

exports.funcWrapper = {
  throwError: (message, statusCode) => {
    const e = new Error(message);
    e.name = 'CustomError';
    e.data = [];
    e.statusCode = statusCode | 500;
    throw e;
  },
  ExecFnAsync: async (fn, successMessage, statusCode) => {
    const r = new WrapperResult();
    try {
      let tempResult = await fn();
      r.success = true;
      r.data = tempResult;
      r.message = successMessage || '';
      r.statusCode = statusCode;
      return r;
    } catch (error) {
      r.success = false;
      r.data = [];
      r.message = error.name === 'CustomError' ? error.message : 'Unexpected Error';
      r.statusCode = error.name === 'CustomError' ? error.statusCode : 500;
      return r;
    }
  },
};
