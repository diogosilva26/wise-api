import EtherealMail from "@config/mail/EtherealMail";
import { ISendEmailProvider, ISendMail } from "../models/ISendEmailProvider";

class EtherealMailSendEmailProvider implements ISendEmailProvider
{
    public async sendMail(data: ISendMail): Promise<void> 
    {
        return await EtherealMail.sendMail(data);    
    }
}

export default EtherealMailSendEmailProvider;