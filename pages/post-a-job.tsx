// pages/PostAJob.tsx
import { useState } from 'react';
import styles from './PostAJob.module.css';
import { useRouter } from 'next/router';  // Import useRouter

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  provinceState: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  title: string;
  description: string;
  duration: string;
  budget: string;
  currency: string;
  skills: string[];
}

const PROFESSIONS = [
  'Electrician',
  'Carpenter',
  'Locksmith',
  'Plumber',
  'Landscaper',
  'Tiler',
  'Painter',
  'Decorator',
  'Roofer',
  'Mason',
  'Bricklayer',
  'Joiner',
  'Glazier',
  'Welder',
  'Plasterer',
  'Floorer',
  'Insulation Installer',
  'Fencer',
  'General Contractor',
  'HVAC Technician'
];

const DURATIONS = [
  '1 day',
  '2-3 days',
  '3-4 days',
  'less than 1 week',
  '1-2 weeks',
  '2-3 weeks',
  'less than 1 month',
  '1-2 months',
  '2+ months',
];

const ESTIMATED_BUDGETS: string[] = [
  'Less than 200',
  '200 - 500',
  '500 - 1,000',
  '1,000 - 2,500',
  '2,500 - 5,000',
  '5,000 - 10,000',
  '10,000 - 20,000',
  'More than 20,000'
]

const CURRENCY_OPTIONS: string[] = [
  'CAD $',
  'USD $'
]

const budgetRangeToInt: { [key: string]: number } = {
  'Less than 200': 199,
  '200 - 500': 500,
  '500 - 1,000': 1000,
  '1,000 - 2,500': 2500,
  '2,500 - 5,000': 5000,
  '5,000 - 10,000': 10000,
  '10,000 - 20,000': 20000,
  'Greater than 20,000': 20001
};

const intToBudgetRange: { [key: string]: string } = {
  '199': 'Less than 200',
  '500': '200 - 500',
  '1000': '500 - 1,000',
  '2500': '1,000 - 2,500',
  '5000': '2,500 - 5,000',
  '10000': '5,000 - 10,000',
  '20000': '10,000 - 20,000',
  '20001': 'Greater than 20,000'
};

const durationToDays: { [key: string]: number } = {
  '1 day': 1,
  '2-3 days': 3,
  '3-4 days': 4,
  'less than 1 week': 6,
  '1-2 weeks': 14,
  '2-3 weeks': 21,
  'less than 1 month': 29,
  '1-2 months': 60,
  '2+ months': 61
};

const daysToDuration: { [key: string]: string } = {
  '1': '1 day',
  '3': '2-3 days',
  '4': '3-4 days',
  '6': 'less than 1 week',
  '14': '1-2 weeks',
  '21': '2-3 weeks',
  '29': 'less than 1 month',
  '60': '1-2 months',
  '61': '2+ months'
};

const PostAJob = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    provinceState: '',
    country: '',
    postalCode: '',
    phoneNumber: '',
    title: '',
    description: '',
    duration: '1',
    budget: '',
    currency: '',
    skills: [],
  });

  function trimFormData(data: FormData): FormData {
    return {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      address: data.address.trim(),
      city: data.city.trim(),
      provinceState: data.provinceState.trim(),
      country: data.country.trim(),
      postalCode: data.postalCode.trim(),
      phoneNumber: data.phoneNumber.trim(),
      title: data.title.trim(),
      description: data.description.trim(),
      duration: data.duration,
      budget: data.budget,
      currency: data.currency,
      skills: data.skills,
    };
  }


  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: durationToDays[value]
    }));
  };

  const handleBudgetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: budgetRangeToInt[value]
    }));
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const skill = event.target.value;
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills(prev => [...prev, skill]);
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setSelectedSkills(prev => prev.filter(skill => skill !== skillToRemove));
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async () => {
    let trimmedFormData = trimFormData(formData)
    try {
      const response = await fetch('https://us-central1-easytrade-bdab6.cloudfunctions.net/api/addJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trimmedFormData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error adding job:", error);
    }
    router.push('/view-jobs')
  };

  const isFormComplete = Object.values(formData).every(value => value !== '') && formData.skills.length > 0;

  return (
    <div className={styles.container}>
      <h1 className={styles.createJobHeader}>Create a New Job</h1>
      <div className={styles.formGroup}>
        <label htmlFor={styles.firstName}>First Name:</label>
        <input className={styles.input} id={styles.firstName} type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor={styles.lastName}>Last Name:</label>
        <input className={styles.input} id={styles.lastName} type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor={styles.email}>Email:</label>
        <input className={styles.input} id={styles.email} type="email" name="email" value={formData.email} onChange={handleInputChange} required autoComplete="email" />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor={styles.address}>Street Address:</label>
        <input className={styles.input} id={styles.address} type="text" name="address" value={formData.address} onChange={handleInputChange} required autoComplete="street-address" />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor={styles.city}>City:</label>
        <input className={styles.input} id={styles.city} type="text" name="city" value={formData.city} onChange={handleInputChange} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor={styles.provinceState}>Province/State:</label>
        <input className={styles.input} id={styles.provinceState} type="text" name="provinceState" value={formData.provinceState} onChange={handleInputChange} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor={styles.country}>Country:</label>
        <input className={styles.input} id={styles.country} type="text" name="country" value={formData.country} onChange={handleInputChange} required autoComplete="country-name" />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor={styles.postalCode}>Postal Code:</label>
        <input className={styles.input} id={styles.postalCode} type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor={styles.phoneNumber}>Phone Number:</label>
        <input className={styles.input} id={styles.phoneNumber} type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor={styles.title}>Job Title:</label>
        <input className={styles.input} id={styles.title} type="text" name="title" value={formData.title} onChange={handleInputChange} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor={styles.description}>Job Description:</label>
        <textarea className={styles.textarea} id={styles.description} name="description" value={formData.description} onChange={handleInputChange} required></textarea>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor={styles.duration}>Estimated Duration:</label>
        <select
          className={styles.select}
          id={styles.duration}
          name="duration"
          value={daysToDuration[formData.duration]}
          onChange={handleDurationChange}
          required
        >
          <option value="" disabled>Select duration</option>
          {DURATIONS.map(duration => (
            <option key={duration} value={duration}>
              {duration}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup} >
        <label htmlFor={styles.budgetSelect}>Budget:</label>
        <div className={styles.budgetRow}>
          <select
            name="budget"
            id={styles.budgetSelect}
            className={styles.select}
            value={intToBudgetRange[formData.budget]}
            onChange={handleBudgetChange}
          >
            {ESTIMATED_BUDGETS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <select
            name="currency"
            className={styles.select}
            id={styles.currencySelect}
            value={formData.currency}
            onChange={handleCurrencyChange}
          >
            {CURRENCY_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>


      <div className={styles.formGroup}>
        <label htmlFor={styles.skills}>Professional Skills Needed:</label>
        <select className={styles.select} id={styles.skills} onChange={handleSkillSelect} value="">
          <option value="" disabled>Select a profession</option>
          {PROFESSIONS.map(profession => (
            <option key={profession} value={profession}>
              {profession}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <div className={styles.selectedSkills}>
          {selectedSkills.map(skill => (
            <div key={skill} className={styles.skillItem}>
              {skill}
              <span className={styles.removeSkill} onClick={() => handleSkillRemove(skill)}>X</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.formGroup}>
        <button
          className={styles.submitButton}
          disabled={!isFormComplete}
          onClick={handleSubmit}
        >
          Create Posting
        </button>
      </div>
    </div>
  );
};


export default PostAJob;
