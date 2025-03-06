import { get } from "lodash";

export function isConstraintError(error: unknown, constraintName: string) {
  if (!(error instanceof Error)) {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  const value = get(error, "original.message") as unknown;

  if (typeof value !== "string") {
    return false;
  }

  return value.includes(constraintName);
}
