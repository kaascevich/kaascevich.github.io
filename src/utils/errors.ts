export class InvalidPropError<
  PropName extends string,
  ExpectedType extends string,
  ActualType extends string
> extends TypeError {
  constructor(
    readonly propName: PropName,
    readonly expectedType: ExpectedType,
    readonly actualType: ActualType,
  ) {
    super()
  }

  override get message() {
    return `\
invalid '${this.propName}' prop (type '${this.actualType}' \
is not assignable to '${this.expectedType}')\
` as const
  }
}
