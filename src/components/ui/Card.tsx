import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  title?: string;
  footer?: ReactNode;
}

export default function Card({
  children,
  title,
  footer,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow overflow-hidden ${className}`}
      {...props}
    >
      {title && (
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
      )}

      <div className="p-6">{children}</div>

      {footer && <div className="px-6 py-4 bg-gray-50 border-t">{footer}</div>}
    </div>
  );
}
