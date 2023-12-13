export interface IDateProvider 
{
    addHours(date: Date, amount: number): Date;
    isAfter(date: Date, dateToCompare: Date): Boolean;
}