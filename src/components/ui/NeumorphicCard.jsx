import styles from './NeumorphicCard.module.css';

const NeumorphicCard = ({ children, title, className = '', ...props }) => {
  return (
    <div className={`${styles.card} ${className}`} {...props}>
      {title && <h2 className={styles.header}>{title}</h2>}
      {children}
    </div>
  );
};

export default NeumorphicCard;