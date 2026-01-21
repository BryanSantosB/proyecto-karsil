import styles from './NeumorphicContainer.module.css';

const NeumorphicContainer = ({ 
  children, 
  width = '100%', 
  maxWidth = 'none', 
  className = '', 
  style = {} 
}) => {
  return (
    <div 
      className={`${styles.neumorphicBase} ${className}`} 
      style={{ 
        width: width, 
        maxWidth: maxWidth, 
        ...style // Permite pasar estilos extra si es necesario
      }}
    >
      {children}
    </div>
  );
};

export default NeumorphicContainer;