import React, { useState } from 'react';
import styles from './ViewJobs.module.css';

interface Job {
  id: number;
  title: string;
  city: string;
  description: string;
  datePosted: string;
  posterFirstName: string;
  skills: string[];
}

const PROFESSIONS: string[] = [
  'Electrician', 'Carpenter', 'Locksmith', 'Plumber', 'Landscaper', 
  'Tiler', 'HVAC Technician', 'Painter', 'Flooring Specialist', 'Roofer'
];

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
]

const dateFilterOptions: { [key: string]: number | null } = {
  'lastDay': 1,
  'lastWeek': 7,
  'lastTwoWeeks': 14,
  'lastMonth': 30,
  'lastTwoMonths': 60,
  'lastThreeMonths': 90,
  'lastSixMonths': 180,
  'lastYear': 365,
  'allTime': null
};

const ViewJobs: React.FC = () => {
  const [cityFilter, setCityFilter] = useState<string>('');
  const [skillFilter, setSkillFilter] = useState<string[]>([]);
  const [keywordFilter, setKeywordFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('allTime');

  const isJobWithinDateRange = (job: Job, range: string): boolean => {
    const rangeValue = dateFilterOptions[range];
    if (rangeValue === null) return true;

    const jobDate = new Date(job.datePosted);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - jobDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= rangeValue;
  };

  const handleSkillSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const skill = event.target.value;
    if (skill === "All") {
      setSkillFilter([]);
    } else if (skill && !skillFilter.includes(skill)) {
      setSkillFilter(prev => [...prev, skill]);
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setSkillFilter(prev => prev.filter(skill => skill !== skillToRemove));
  };

  const filteredJobs: Job[] = FAKE_JOBS.filter((job: Job) => {
    return (
      job.city.toLowerCase().includes(cityFilter.toLowerCase()) &&
      (skillFilter.length === 0 || job.skills.some(skill => skillFilter.includes(skill))) &&
      (job.title.toLowerCase().includes(keywordFilter.toLowerCase()) || job.description.toLowerCase().includes(keywordFilter.toLowerCase())) &&
      isJobWithinDateRange(job, dateFilter)
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        {/* City Filter */}
        <div className={styles.filter}>
          <label>Filter by city:</label>
          <input
            type="text"
            placeholder="Search by City"
            value={cityFilter}
            onChange={e => setCityFilter(e.target.value)}
          />
        </div>

        {/* Keywords Filter */}
        <div className={styles.filter}>
          <label>Filter by keywords:</label>
          <input
            type="text"
            placeholder="Search by keywords"
            value={keywordFilter}
            onChange={e => setKeywordFilter(e.target.value)}
          />
        </div>

        {/* Date Posted Filter */}
        <div className={styles.filter}>
          <label>Filter by date posted:</label>
          <select className={styles.dateSelect} value={dateFilter} onChange={e => setDateFilter(e.target.value)}>
            {Object.keys(dateFilterOptions).map(option => (
              <option key={option} value={option}>
                {option.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.filter}>
        <label>Filter by skills needed:</label>
        <select className={styles.skillSelect} onChange={handleSkillSelect} value="">
            <option value="" disabled>Select a profession</option>
            <option key={"All"} value="All">All</option>
            {PROFESSIONS.map(profession => (
            <option key={profession} value={profession}>
                {profession}
            </option>
            ))}
        </select>
        </div>

        <div className={styles.selectedSkills}>
        {skillFilter.map(skill => (
            <div key={skill} className={styles.skillItem}>
            {skill}
            <span className={styles.removeSkill} onClick={() => handleSkillRemove(skill)}>X</span>
            </div>
        ))}
        </div>

      {/* Job Cards */}
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
