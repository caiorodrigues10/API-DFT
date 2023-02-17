interface IAppResponse {
  result: "error" | "success";
  message: string;
  status: number;
  data?: any;
}

class AppResponse {
  public readonly message: string;
  public readonly result: "error" | "success";
  public readonly status: number;
  public readonly data: any | undefined;

  constructor({ message, result, status, data }: IAppResponse) {
    this.data = data;
    this.message = message;
    this.status = status;
    this.result = result;
  }
}

export { AppResponse };
