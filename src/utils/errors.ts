export class InvalidPropError extends TypeError {
  constructor(
    readonly propName: string,
    readonly expectedType: string,
    readonly actualType: string,
  ) {
    super()
  }

  override get message() {
    return `invalid '${this.propName}' prop (type '${this.actualType}' is not assignable to '${this.expectedType}')`
  }
}
