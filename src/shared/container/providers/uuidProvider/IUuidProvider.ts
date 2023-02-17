interface IUuidProvider {
  create(): string;
  validate(value: string): boolean;
}

export { IUuidProvider };
