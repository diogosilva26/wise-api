import { IDateProvider } from "../models/IDateProvider";

class FakeDateProvider implements IDateProvider
{
    public addHours(date: number | Date, amount: number): Date 
    {
        return new Date(date);
    }

    public isAfter(date: number | Date, dateToCompare: Date): Boolean 
    {
        return new Date(date) === dateToCompare
    }
}

export default FakeDateProvider;