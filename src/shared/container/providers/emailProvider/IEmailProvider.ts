interface IEmailProvider {
  sendConfirmAccount(email: string, code: number, title: string): Promise<void>;
}
export { IEmailProvider };
