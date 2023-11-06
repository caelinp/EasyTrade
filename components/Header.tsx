// components/Header.tsx
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Home</Link>
      </div>
      <div className={styles.logo}>
        <Link href="/view-jobs">View Job Board</Link>
      </div>
      <div className={styles.logo}>
        <Link href="/post-a-job">Create a Job Posting</Link>
      </div>
    </header>
  );
};

export default Header;
