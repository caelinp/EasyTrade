// pages/PostAJob.tsx
import { useState } from 'react';
import styles from './PostAJob.module.css';
import { useRouter } from 'next/router';  // Import useRouter

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
  skills: string[];

}

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
      duration: data.duration.trim(),
      budget: data.budget.trim(),
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
        body: JSON.stringify(formData),
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
        <label>First Name:</label>
        <input className={styles.input} type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
      </div>

      <div className={styles.formGroup}>
        <label>Last Name:</label>
        <input className={styles.input} type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
      </div>

      <div className={styles.formGroup}>
        <label>Email:</label>
        <input className={styles.input} type="email" name="email" value={formData.email} onChange={handleInputChange} required />
      </div>

      <div className={styles.formGroup}>
        <label>Street Address:</label>
        <input className={styles.input} type="text" name="address" value={formData.address} onChange={handleInputChange} required />
      </div>

      <div className={styles.formGroup}>
        <label>City:</label>
        <input className={styles.input} type="text" name="city" value={formData.city} onChange={handleInputChange} required />
      </div>

      <div className={styles.formGroup}>
        <label>Province/State:</label>
        <input className={styles.input} type="text" name="provinceState" value={formData.provinceState} onChange={handleInputChange} required />
      </div>

      <div className={styles.formGroup}>
        <label>Country:</label>
        <input className={styles.input} type="text" name="country" value={formData.country} onChange={handleInputChange} required />
      </div>

      <div className={styles.formGroup}>
        <label>Postal Code:</label>
        <input className={styles.input} type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required />
      </div>

      <div className={styles.formGroup}>
        <label>Phone Number:</label>
        <input className={styles.input} type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
      </div>

      <div className={styles.formGroup}>
        <label>Job Title:</label>
        <input className={styles.input} type="text" name="title" value={formData.title} onChange={handleInputChange} required />
      </div>

      <div className={styles.formGroup}>
        <label>Job Description:</label>
        <textarea className={styles.textarea} name="description" value={formData.description} onChange={handleInputChange} required></textarea>
      </div>

      <div className={styles.formGroup}>
        <label>Estimated Duration:</label>
        <select
          className={styles.select}
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
      <div className={styles.formGroup}>
        <label>Estimated Budget:</label>
        <input className={styles.input} name="budget" type="number" value={formData.budget} onChange={handleInputChange} required></input>
      </div>

      <div className={styles.formGroup}>
        <label>Professional Skills Needed:</label>
        <select className={styles.select} onChange={handleSkillSelect} value="">
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
