export interface ISendEmailProvider
{
    sendMail( data:ISendMail ): Promise<void>;
}

interface IMailContact
{
  name: string;
  email: string;
}

export interface ISendMail
{
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

interface ITemplateVariable
{
  [key: string]: string | number;
}

interface IParseMailTemplate
{
  file: string;
  variables: ITemplateVariable;
}