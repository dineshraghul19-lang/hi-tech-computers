import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  as?: React.ElementType | string;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  className = '',
  as: Component = 'button',
  to,
  href,
  target,
  rel,
  ...props
}) => {
  const baseClasses = 'btn';
  const variantClasses = `btn-${variant}`;
  const sizeClasses = `btn-${size}`;
  const widthClass = fullWidth ? 'btn-full' : '';
  
  const combinedClasses = [baseClasses, variantClasses, sizeClasses, widthClass, className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </>
  );

  if (Component === 'button') {
    return (
      <button className={combinedClasses} {...props as any}>
        {content}
      </button>
    );
  }

  return (
    <Component href={href} to={to} target={target} rel={rel} className={combinedClasses} {...props as any}>
      {content}
    </Component>
  );
};
