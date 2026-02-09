import styles from './NeumorphicContainer.module.css';

const NeumorphicContainer = ({ 
  children, 
  width = '100%', 
  maxWidth = 'none', 
  className = '', 
  style = {},
  flat = false, // Si es true, no se aplican sombras para un efecto más plano
}) => {
  return (
    <div 
      className={`
      ${flat ? styles.neumorphicSoft : styles.neumorphicBase}
      
      ${className}`} 
      style={{ 
        width: width, 
        maxWidth: maxWidth, 
        ...style 
      }}
    >
      {children}
    </div>
  );
};

export default NeumorphicContainer;