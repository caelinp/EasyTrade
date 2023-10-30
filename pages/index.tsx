// pages/index.tsx
import { useRouter } from 'next/router';  // Import useRouter
import styles from './index.module.css';

const HomePage = () => {
    const router = useRouter();
    return (
        <div>
        <main>
        <div className={styles.container}>
                {/* Main header */}
                <h1 className={styles.mainHeader}>Welcome to EasyTrade!</h1>

                {/* Smaller header */}
                <h2 className={styles.subHeader}>Connecting homes and hands</h2>

                {/* Description */}
                <p className={styles.description}>EasyTrade seamlessly connects homeowners with trades professionals, making project matchmaking swift and simple</p>

                {/* Buttons */}
            <div className={styles.buttons}>

                <div className='create-job-container'>
                <div className={styles.buttonLabel}>Are you a homeowner with a project?</div>
                <button 
                    className={styles.button}
                    onClick={() => router.push('/post-a-job')}>  {/* Add onClick handler */}
                    Create a job posting
                </button>
                </div>

                <div className='view-jobs-container'>
                <div className={styles.buttonLabel}>Are you a professional seeking work?</div>
                <button 
                    className={styles.button} 
                    onClick={() => router.push('/view-jobs')}>  {/* Add onClick handler */}
                    View jobs
                </button>
                </div>
            </div>
            </div>
        </main>
        </div>
    );
};

export default HomePage;
