import { Injectable } from '@nestjs/common';
const Business = {
  SUCCESS: {
    code: 200,
    message: 'success',
  },
  ERROR: {
    code: 500,
    message: 'error',
  },
};
@Injectable()
export class ResponseService {
  success(data: any) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data,
      code: Business.SUCCESS.code,
      message: Business.SUCCESS.message,
    };
  }
  error(data = null, message: string, code: number = Business.ERROR.code) {
    return {
      data,
      code,
      message: message || Business.ERROR.message,
    };
  }
}
