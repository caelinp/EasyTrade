// components/Header.tsx
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.home}>
        <Link href="/">Home</Link>
      </div>
      <div className={styles.logo}>
        <Link href="/view-jobs">View Job Board</Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/signup">Sign Up</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
