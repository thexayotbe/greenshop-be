interface Body {
  [key: string]: any;
}

interface BodyRequirerParams {
  body: Body;
  requiredValue: string[];
}

const bodyRequirer = async ({
  body,
  requiredValue,
}: BodyRequirerParams): Promise<void> => {
  const checkRequireValue = requiredValue?.filter((val) => !body[val]);

  if (checkRequireValue.length)
    throw new Error(`${checkRequireValue.join(", ")} required!`);
  else return undefined;
};

export { bodyRequirer };
