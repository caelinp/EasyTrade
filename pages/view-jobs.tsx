// pages/view-jobs.tsx
import React, { useState, useEffect } from 'react';
import styles from './view-jobs.module.css';


const PROFESSIONS = ['Electrician', 'Carpenter', 'Locksmith', 'Plumber', 'Landscaper', 'Tiler', 'HVAC Technician', 'Painter', 'Flooring Specialist', 'Roofer'];

const FAKE_JOBS = [
  { id: 1, title: 'Electrician needed', city: 'Los Angeles', description: 'Fix some wires', datePosted: '2023-10-30', posterFirstName: 'John', skills: ['Electrician'] },
  { id: 2, title: 'Carpenter for furniture', city: 'New York', description: 'Build a table and chairs', datePosted: '2023-10-29', posterFirstName: 'Jane', skills: ['Carpenter'] },
  { id: 3, title: 'Locksmith assistance', city: 'San Francisco', description: 'Change home locks', datePosted: '2023-10-28', posterFirstName: 'Alex', skills: ['Locksmith'] },
  { id: 4, title: 'Urgent plumbing work', city: 'Chicago', description: 'Fix a leaky faucet', datePosted: '2023-10-25', posterFirstName: 'Marie', skills: ['Plumber'] },
  { id: 5, title: 'Landscaping the garden', city: 'Los Angeles', description: 'Design a garden landscape', datePosted: '2023-10-22', posterFirstName: 'Luke', skills: ['Landscaper'] },
  { id: 6, title: 'Tiling the bathroom', city: 'San Diego', description: 'Tile walls and floor', datePosted: '2023-10-20', posterFirstName: 'Eva', skills: ['Tiler'] },
  { id: 7, title: 'HVAC maintenance', city: 'Houston', description: 'Check and maintain HVAC system', datePosted: '2023-10-18', posterFirstName: 'Sarah', skills: ['HVAC Technician'] },
  { id: 8, title: 'Home painting', city: 'Seattle', description: 'Paint interior walls', datePosted: '2023-10-15', posterFirstName: 'Jake', skills: ['Painter'] },
  { id: 9, title: 'Flooring work', city: 'Dallas', description: 'Install wooden floors', datePosted: '2023-10-10', posterFirstName: 'Alice', skills: ['Flooring Specialist'] },
  { id: 10, title: 'Roofing repair', city: 'Denver', description: 'Fix a leak in the roof', datePosted: '2023-10-05', posterFirstName: 'Tom', skills: ['Roofer'] }
];

const ViewJobs = () => {
  const [cityFilter, setCityFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState([]);
  const [keywordFilter, setKeywordFilter] = useState('');

  const filteredJobs = FAKE_JOBS.filter(job => {
    return (
      job.city.includes(cityFilter) &&
      skillFilter.every(skill => job.skills.includes(skill)) &&
      (job.title.includes(keywordFilter) || job.description.includes(keywordFilter))
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <div className={styles.filter}>
          <input 
            type="text" 
            placeholder="City" 
            value={cityFilter} 
            onChange={e => setCityFilter(e.target.value)} 
          />
        </div>
        <div className={styles.filter}>
          <select multiple value={skillFilter} onChange={e => setSkillFilter([...e.target.options].filter(o => o.selected).map(o => o.value))}>
            {PROFESSIONS.map(skill => <option key={skill} value={skill}>{skill}</option>)}
          </select>
        </div>
        <div className={styles.filter}>
          <input 
            type="text" 
            placeholder="Keywords" 
            value={keywordFilter} 
            onChange={e => setKeywordFilter(e.target.value)} 
          />
        </div>
      </div>
      <div className={styles.jobs}>
        {filteredJobs.map(job => (
          <div key={job.id} className={styles.jobCard}>
            <h3 className={styles.jobTitle}>{job.title}</h3>
            <p className={styles.jobCity}>City: {job.city}</p>
            <p className={styles.jobDescription}>{job.description}</p>
            <p className={styles.jobDate}>Date posted: {job.datePosted}</p>
            <p className={styles.jobPoster}>Posted by: {job.posterFirstName}</p>
            <div className={styles.jobSkills}>
              {job.skills.map(skill => (
                <span key={skill} className={styles.skillItem}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewJobs;
