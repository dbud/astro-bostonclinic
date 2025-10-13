import { isValidElement, cloneElement, Fragment, type ReactNode } from "react";

interface JoinProps {
  items: ReactNode[];
  separator: ReactNode;
}

export const Join = ({ items, separator }: JoinProps) => {
  if (!items.length) return null;

  return items.flatMap((item, index) => {
    if (index === 0)
      return [
        isValidElement(item) ? (
          cloneElement(item, { key: `item-${index}` })
        ) : (
          <Fragment key={`item-${index}`}>{item}</Fragment>
        ),
      ];

    const sep = isValidElement(separator) ? (
      cloneElement(separator, { key: `sep-${index}` })
    ) : (
      <Fragment key={`sep-${index}`}>{separator}</Fragment>
    );

    const currentItem = isValidElement(item) ? (
      cloneElement(item, { key: `item-${index}` })
    ) : (
      <Fragment key={`item-${index}`}>{item}</Fragment>
    );

    return [sep, currentItem];
  });
};
