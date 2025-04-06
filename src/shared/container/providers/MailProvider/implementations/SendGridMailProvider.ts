import { inject, injectable } from "tsyringe";
import mailConfig from "@config/mail";
import * as sgMail from "@sendgrid/mail";
import IMailProvider from "../models/IMailProvider";
import ISendMailDTO from "../dtos/ISendMailDTO";
import IMailTemplateProvider from "@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider";

@injectable()
class SendGridMailProvider implements IMailProvider {
  constructor(
    @inject("MailTemplateProvider")
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    sgMail.setApiKey(mailConfig.driver);
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    const msg = {
      to: {
        name: to.name,
        email: to.email
      },
      from: {
        name: from?.name || name,
        email: from?.email || email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    };

    try {
      await sgMail.send(msg as any);
      console.log(`E-mail enviado para ${to.email}`);
    } catch (error) {
      console.error(
        "Erro ao enviar e-mail:",
        error.response?.body || error.message
      );
      throw new Error("Erro ao enviar e-mail");
    }
  }
}

export default SendGridMailProvider;
