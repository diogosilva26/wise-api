export interface IUser 
{
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    is_verify: boolean;
    avatar: string;
    created_at: Date;
    updated_at: Date;
}