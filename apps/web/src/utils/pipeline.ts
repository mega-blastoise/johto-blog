type PipelineTransform = (value: never) => unknown;

export const pipeline =
  (...transforms: PipelineTransform[]) =>
  <Value>(value: Value): Value =>
    transforms.reduce<unknown>(
      (current, transform) => transform(current as never),
      value,
    ) as Value;
