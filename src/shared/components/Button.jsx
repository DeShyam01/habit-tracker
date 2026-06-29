import './Button.css';

const Button = ({ children, width, height, className = '', onClick, ...props }) => {
  return (
    <button
      className={`button ${className}`.trim()}
      style={{ width, height }}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
