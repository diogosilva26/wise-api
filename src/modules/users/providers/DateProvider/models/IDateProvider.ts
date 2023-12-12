export interface IDateProvider 
{
    addHours(date: Date | number, amount: number): Date;
    isAfter(date: Date | number, dateToCompare: Date): Boolean;
}