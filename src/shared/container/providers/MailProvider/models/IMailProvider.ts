import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailPovider {
  sendMail(date: ISendMailDTO): Promise<void>;
}
