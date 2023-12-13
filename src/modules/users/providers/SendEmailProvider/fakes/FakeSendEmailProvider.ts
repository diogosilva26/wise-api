import { ISendEmailProvider, ISendMail } from "../models/ISendEmailProvider";

class FakeSendEmailProvider implements ISendEmailProvider
{
    public async sendMail(data: ISendMail): Promise<void> 
    {
        
    }
}

export default FakeSendEmailProvider;