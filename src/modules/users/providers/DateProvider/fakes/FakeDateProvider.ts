import { IDateProvider } from "../models/IDateProvider";

class FakeDateProvider implements IDateProvider
{
    public addHours(date: Date, amount: number): Date 
    {
        return new Date(date.setHours(date.getHours() + amount));
    }

    public isAfter(date: Date, dateToCompare: Date): Boolean 
    {
        return new Date(date).getTime() >= dateToCompare.getTime();
    }
}

export default FakeDateProvider;