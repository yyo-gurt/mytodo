import styles from './header.module.scss'

const Header = () => {
  return (
    <header id={styles.header}>
      <div className="container">
        헤더
      </div>
    </header>
  );
}

export default Header;