import { Injectable } from '@nestjs/common';

@Injectable()
export class DateUtils {
  async isValidDate(reqDate: string) {
    // Validate dates and replace only the second space with '+'
    let responseDate: Date;

    const dateParts = reqDate.split(' ');

    if (dateParts.length > 2) {
      const date = dateParts[0] + ' ' + dateParts[1] + '+' + dateParts[2];
      console.log('date', date);

      responseDate = new Date(date);
    } else {
      responseDate = new Date(reqDate);
    }

    if (!isNaN(responseDate.getTime())) {
      return responseDate;
    } else {
      throw new Error('Inserted date is invalid');
    }
  }
}
