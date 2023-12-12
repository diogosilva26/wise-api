import { addHours, isAfter } from "date-fns";
import { IDateProvider } from "../models/IDateProvider";

class DateFnsDateProvider implements IDateProvider
{
    addHours(date: Date, amount: number): Date 
    {
        return addHours(date, amount);
    }

    isAfter(date: Date, dateToCompare: Date): Boolean 
    {
        return isAfter(date, dateToCompare);
    }
}

export default DateFnsDateProvider;