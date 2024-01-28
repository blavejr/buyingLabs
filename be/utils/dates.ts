import moment from "moment";

export function isValidDateRange(start: string, end: string): boolean {
    const startDate = moment(start);
    const endDate = moment(end);
    return (
      startDate.isValid() && endDate.isValid() && startDate.isBefore(endDate)
    );
  }