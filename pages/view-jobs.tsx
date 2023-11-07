import React, { useState, useEffect } from 'react';
import styles from './ViewJobs.module.css';

interface Job {
  id: number;
  title: string;
  city: string;
  description: string;
  datePosted: string;
  posterFirstName: string;
  skills: string[];
  estimatedDuration: string;
}

const PROFESSIONS: string[] = [
  'Electrician', 'Carpenter', 'Locksmith', 'Plumber', 'Landscaper', 
  'Tiler', 'HVAC Technician', 'Painter', 'Flooring Specialist', 'Roofer'
];

const ESTIMATED_DURATIONS: string[] = [
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

const FAKE_JOBS: Job[] = [
  { 
    id: 1, 
    title: 'Electrician needed', 
    city: 'Los Angeles', 
    description: 'Fix some wires', 
    datePosted: '2023-10-30', 
    posterFirstName: 'John', 
    skills: ['Electrician'],
    estimatedDuration: '2-3 days'
  },
  { 
    id: 2, 
    title: 'Carpenter for furniture', 
    city: 'New York', 
    description: 'Build a table and chairs', 
    datePosted: '2023-10-29', 
    posterFirstName: 'Jane', 
    skills: ['Carpenter'],
    estimatedDuration: '1-2 weeks'
  },
  { 
    id: 3, 
    title: 'Locksmith assistance', 
    city: 'San Francisco', 
    description: 'Change home locks', 
    datePosted: '2023-10-28', 
    posterFirstName: 'Alex', 
    skills: ['Locksmith'],
    estimatedDuration: '1 day'
  },
  { 
    id: 4, 
    title: 'Urgent plumbing work', 
    city: 'Chicago', 
    description: 'Fix a leaky faucet', 
    datePosted: '2023-10-25', 
    posterFirstName: 'Marie', 
    skills: ['Plumber'],
    estimatedDuration: '3-4 days'
  },
  { 
    id: 5, 
    title: 'Landscaping the garden', 
    city: 'Los Angeles', 
    description: 'Design a garden landscape', 
    datePosted: '2023-10-22', 
    posterFirstName: 'Luke', 
    skills: ['Landscaper'],
    estimatedDuration: 'less than 1 month'
  },
  { 
    id: 6, 
    title: 'Tiling the bathroom', 
    city: 'San Diego', 
    description: 'Tile walls and floor', 
    datePosted: '2023-10-20', 
    posterFirstName: 'Eva', 
    skills: ['Tiler'],
    estimatedDuration: '2-3 weeks'
  },
  { 
    id: 7, 
    title: 'HVAC maintenance', 
    city: 'Houston', 
    description: 'Check and maintain HVAC system', 
    datePosted: '2023-10-18', 
    posterFirstName: 'Sarah', 
    skills: ['HVAC Technician'],
    estimatedDuration: 'less than 1 week'
  },
  { 
    id: 8, 
    title: 'Home painting', 
    city: 'Seattle', 
    description: 'Paint interior walls', 
    datePosted: '2023-10-15', 
    posterFirstName: 'Jake', 
    skills: ['Painter'],
    estimatedDuration: '1-2 months'
  },
  { 
    id: 9, 
    title: 'Flooring work', 
    city: 'Dallas', 
    description: 'Install wooden floors', 
    datePosted: '2023-10-10', 
    posterFirstName: 'Alice', 
    skills: ['Flooring Specialist'],
    estimatedDuration: '2+ months'
  },
  { 
    id: 10, 
    title: 'Roofing repair', 
    city: 'Denver', 
    description: 'Fix a leak in the roof', 
    datePosted: '2023-10-05', 
    posterFirstName: 'Tom', 
    skills: ['Roofer'],
    estimatedDuration: '2-3 days'
  }
];

const durationToDays = (duration: string) => {
  switch (duration) {
    case '1 day': return 1;
    case '2-3 days': return 2;
    case '3-4 days': return 3;
    case 'less than 1 week': return 5;
    case '1-2 weeks': return 7;
    case '2-3 weeks': return 14;
    case 'less than 1 month': return 21;
    case '1-2 months': return 30;
    case '2+ months': return 60;
    default: return 1000;
  }
};

const isDurationInRange = (jobDuration: string, minDuration: string, maxDuration: string) => {
  const jobDays = durationToDays(jobDuration);
  const minDays = durationToDays(minDuration);
  const maxDays = durationToDays(maxDuration);

  return (minDays === null || jobDays >= minDays) && (maxDays === null || jobDays <= maxDays);
};


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
  const [minDuration, setMinDuration] = useState<string>('Any');
  const [maxDuration, setMaxDuration] = useState<string>('Any');
  
  const [minDurationOptions, setMinDurationOptions] = useState<string[]>(['Any', ...ESTIMATED_DURATIONS]);
  const [maxDurationOptions, setMaxDurationOptions] = useState<string[]>(['Any', ...ESTIMATED_DURATIONS]);

  useEffect(() => {
    if (minDuration !== 'Any') {
      const minDays = durationToDays(minDuration);
      setMaxDurationOptions(['Any', ...ESTIMATED_DURATIONS.filter(duration => {
        const days = durationToDays(duration);
        return days === null || days > minDays;
      })]);
    } else {
      setMaxDurationOptions(['Any', ...ESTIMATED_DURATIONS]);
    }
  }, [minDuration]);

  useEffect(() => {
    if (maxDuration !== 'Any') {
      const maxDays = durationToDays(maxDuration);
      setMinDurationOptions(['Any', ...ESTIMATED_DURATIONS.filter(duration => {
        const days = durationToDays(duration);
        return days === null || days < maxDays;
      })]);
    } else {
      setMinDurationOptions(['Any', ...ESTIMATED_DURATIONS]);
    }
  }, [maxDuration]);

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
      isJobWithinDateRange(job, dateFilter)&&
      isDurationInRange(job.estimatedDuration, minDuration, maxDuration)
    );
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.jobBoardHeader}>Job Board</h1>

      <div className={styles.filters}>

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
        
        {/* Filter by Minimum Estimated Duration */}
        <label>Filter by estimated duration:</label>
        <div className={styles.durationFilter}>
          <div className={styles.filter}>
            <label>From:</label>
            <select className={styles.durationSelect} value={minDuration} onChange={e => setMinDuration(e.target.value)}>
              {minDurationOptions.map(duration => (
                <option key={duration} value={duration}>{duration}</option>
              ))}
            </select>
          </div>

          {/* Filter by Maximum Estimated Duration */}
          <div className={styles.filter}>
            <label>To:</label>
            <select className={styles.durationSelect} value={maxDuration} onChange={e => setMaxDuration(e.target.value)}>
              {maxDurationOptions.map(duration => (
                <option key={duration} value={duration}>{duration}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Job Cards */}
        <h1>Filtered Jobs:</h1>
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
              <p className={styles.jobDuration}>Estimated Duration: {job.estimatedDuration}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewJobs;
