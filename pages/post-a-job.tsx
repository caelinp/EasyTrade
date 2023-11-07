// pages/PostAJob.tsx
import { useState } from 'react';
import styles from './PostAJob.module.css';

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
    streetAddress: string;
    city: string;
    country: string;
    postalCode: string;
    phoneNumber: string;
    jobTitle: string;
    jobDescription: string;
    professionalSkills: string[];
    estimatedDuration: string;
  }
  

const PostAJob = () => {
  const [formData, setFormData] = useState<FormData>({
      firstName: '',
      lastName: '',
      email: '',
      streetAddress: '',
      city: '',
      country: '',
      postalCode: '',
      phoneNumber: '',
      jobTitle: '',
      jobDescription: '',
      professionalSkills: [],
      estimatedDuration:''
    });

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
        professionalSkills: [...prev.professionalSkills, skill]
      }));
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setSelectedSkills(prev => prev.filter(skill => skill !== skillToRemove));
    setFormData(prev => ({
      ...prev,
      professionalSkills: prev.professionalSkills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  const isFormComplete = Object.values(formData).every(value => value !== '') && formData.professionalSkills.length > 0;

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
          <input className={styles.input} type="text" name="streetAddress" value={formData.streetAddress} onChange={handleInputChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>City:</label>
          <input className={styles.input} type="text" name="city" value={formData.city} onChange={handleInputChange} required />
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
          <input className={styles.input} type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Job Description:</label>
          <textarea className={styles.textarea} name="jobDescription" value={formData.jobDescription} onChange={handleInputChange} required></textarea>
        </div>

        <div className={styles.formGroup}>
          <label>Estimated Duration:</label>
          <select 
              className={styles.select} 
              name="estimatedDuration"
              value={formData.estimatedDuration} 
              onChange={handleSelectChange}
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
