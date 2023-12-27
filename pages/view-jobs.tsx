import React, { useState, useEffect } from 'react';
import styles from './ViewJobs.module.css';

const DEFAULT_RESULT_LIMIT = 2;

interface Job {
  id: number;
  title: string;
  city: string;
  description: string;
  datePosted: Date;
  posterFirstName: string;
  skills: string[];
  estimatedDuration: string;
  estimatedBudget: string; 
  numLeadsTotal: string;
  numLeadsPurchased: string;
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
    datePosted: new Date('2023-10-30'),
    posterFirstName: 'John',
    skills: ['Electrician'],
    estimatedDuration: '2-3 days',
    estimatedBudget: '100',
    numLeadsTotal: "5",
    numLeadsPurchased: "4"
  },
  {
    id: 2,
    title: 'Carpenter for furniture',
    city: 'New York',
    description: 'Build a table and chairs',
    datePosted: new Date('2023-10-29'),
    posterFirstName: 'Jane',
    skills: ['Carpenter'],
    estimatedDuration: '1-2 weeks',
    estimatedBudget: '100',
    numLeadsTotal: "5",
    numLeadsPurchased: "4"
  },
  {
    id: 3,
    title: 'Locksmith assistance',
    city: 'San Francisco',
    description: 'Change home locks',
    datePosted: new Date('2023-10-28'),
    posterFirstName: 'Alex',
    skills: ['Locksmith'],
    estimatedDuration: '1 day',
    estimatedBudget: '100',
    numLeadsTotal: "5",
    numLeadsPurchased: "4"
  },
  {
    id: 4,
    title: 'Urgent plumbing work',
    city: 'Chicago',
    description: 'Fix a leaky faucet',
    datePosted: new Date('2023-10-25'),
    posterFirstName: 'Marie',
    skills: ['Plumber'],
    estimatedDuration: '3-4 days',
    estimatedBudget: '100',
    numLeadsTotal: "5",
    numLeadsPurchased: "4"
  },
  {
    id: 5,
    title: 'Landscaping the garden',
    city: 'Los Angeles',
    description: 'Design a garden landscape',
    datePosted: new Date('2023-10-22'),
    posterFirstName: 'Luke',
    skills: ['Landscaper'],
    estimatedDuration: 'less than 1 month',
    estimatedBudget: '100',
    numLeadsTotal: "5",
    numLeadsPurchased: "4"
  },
  {
    id: 6,
    title: 'Tiling the bathroom',
    city: 'San Diego',
    description: 'Tile walls and floor',
    datePosted: new Date('2023-10-20'),
    posterFirstName: 'Eva',
    skills: ['Tiler'],
    estimatedDuration: '2-3 weeks',
    estimatedBudget: '100',
    numLeadsTotal: "5",
    numLeadsPurchased: "4"
  },
  {
    id: 7,
    title: 'HVAC maintenance',
    city: 'Houston',
    description: 'Check and maintain HVAC system',
    datePosted: new Date('2023-10-18'),
    posterFirstName: 'Sarah',
    skills: ['HVAC Technician'],
    estimatedDuration: 'less than 1 week',
    estimatedBudget: '100',
    numLeadsTotal: "5",
    numLeadsPurchased: "4"
  },
  {
    id: 8,
    title: 'Home painting',
    city: 'Seattle',
    description: 'Paint interior walls',
    datePosted: new Date('2023-10-15'),
    posterFirstName: 'Jake',
    skills: ['Painter'],
    estimatedDuration: '1-2 months',
    estimatedBudget: '100',
    numLeadsTotal: "5",
    numLeadsPurchased: "4"
  },
  {
    id: 9,
    title: 'Flooring work',
    city: 'Dallas',
    description: 'Install wooden floors',
    datePosted: new Date('2023-10-10'),
    posterFirstName: 'Alice',
    skills: ['Flooring Specialist'],
    estimatedDuration: '2+ months',
    estimatedBudget: '100',
    numLeadsTotal: "5",
    numLeadsPurchased: "4"
  },
  {
    id: 10,
    title: 'Roofing repair',
    city: 'Denver',
    description: 'Fix a leak in the roof',
    datePosted: new Date('2023-10-05'),
    posterFirstName: 'Tom',
    skills: ['Roofer'],
    estimatedDuration: '2-3 days',
    estimatedBudget: '100',
    numLeadsTotal: "5",
    numLeadsPurchased: "4"
  }
];

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

const isDurationInRange = (jobDuration: string, minDuration: string, maxDuration: string) => {
  const jobDays = durationToDays[jobDuration];
  const minDays = durationToDays[minDuration];
  const maxDays = durationToDays[maxDuration];
  if (jobDays == null) {
    return false;
  }
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
  const [moreResultsVisible, setMoreResultsVisible] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null)
  const [resultsLimit, setResultsLimit] = useState(DEFAULT_RESULT_LIMIT)
  const [jobsShown, setJobsShown] = useState<Job[]>([])

  const populateJobBoard = (jobs: any, moreResults: boolean=false) => {
    if (jobs == null) {
      return;
    }
    let jobObjects: Job[]= []
    for (const job of jobs) {
      const jobObject: Job = 
      {
        id: job.id,
        title: job.title,
        city: job.city,
        description: job.description,
        datePosted: new Date(job.timestamp),
        posterFirstName: job.firstName,
        skills: job.skills,
        estimatedDuration: daysToDuration[job.duration],
        estimatedBudget: job.budget,
        numLeadsTotal: job.numLeadsTotal,
        numLeadsPurchased: job.numLeadsPurchased
      }
      jobObjects.push(jobObject)
    }
    if (moreResults) {
      setJobsShown(jobsShown.concat(jobObjects))
    } else {
      setJobsShown(jobObjects)
    }
    
  }

  const fetchJobs = async (moreResults: boolean=false) => {
    try {
      const url = new URL('https://us-central1-easytrade-bdab6.cloudfunctions.net/api/getJobs');
  
      // Add query parameters if they are provided
      if (nextPageToken && moreResults) {
        url.searchParams.append('startAfter', nextPageToken);
      }
      url.searchParams.append('limit', resultsLimit.toString());

      if (keywordFilter != "") {
        url.searchParams.append("keywords", keywordFilter);
      }

      if (cityFilter != "") {
        url.searchParams.append("city", cityFilter);
      }

      if (skillFilter.length != 0) {
        url.searchParams.append("skills", skillFilter.join(","));
      }

      if (dateFilter != "allTime") {
        url.searchParams.append("daysSincePosted", dateFilterOptions[dateFilter]!.toString());
      }

      if (minDuration != "Any") {
        url.searchParams.append("minDuration", durationToDays[minDuration]!.toString());
      }

      if (maxDuration != "Any") {
        url.searchParams.append("maxDuration", durationToDays[maxDuration]!.toString());
      }
      console.log(url)
      const response = await fetch(url);
  
      if (!response.ok) {
        if (response.status === 404) {
          console.log("No more results");
          setMoreResultsVisible(false);
          // if moreResults is false, then this was from a search button press. should clear filtered jobs if search gave no results
          if (!moreResults)
          {
            setJobsShown([])
          }
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
  
      const jobs = await response.json();
      console.log(jobs);
  
      if (jobs.nextPageToken != null) {
        setNextPageToken(jobs.nextPageToken);
        setMoreResultsVisible(true);
      } else {
        setMoreResultsVisible(false);
      }
  
      populateJobBoard(jobs.jobs, moreResults);
  
    } catch (error) {
      console.error("Error getting jobs:", error);
    }
  };
  

  useEffect(() => {
    fetchJobs();
  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    if (minDuration !== 'Any') {
      const minDays = durationToDays[minDuration];
      setMaxDurationOptions(['Any', ...ESTIMATED_DURATIONS.filter(duration => {
        const days = durationToDays[duration];
        return days === null || days > minDays!;
      })]);
    } else {
      setMaxDurationOptions(['Any', ...ESTIMATED_DURATIONS]);
    }
  }, [minDuration]);

  useEffect(() => {
    if (maxDuration !== 'Any') {
      const maxDays = durationToDays[maxDuration];
      setMinDurationOptions(['Any', ...ESTIMATED_DURATIONS.filter(duration => {
        const days = durationToDays[duration];
        return days === null || days < maxDays!;
      })]);
    } else {
      setMinDurationOptions(['Any', ...ESTIMATED_DURATIONS]);
    }
  }, [maxDuration]);

  const isJobWithinDateRange = (job: Job, range: string): boolean => {
    const rangeValue = dateFilterOptions[range];
    if (rangeValue === null) return true;

    const jobDate = job.datePosted;
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

  const handleSearch = async () => {
    setNextPageToken(null)
    fetchJobs()
  }

  const handleMoreResults = () => {
    fetchJobs(true)
  }

  const handleSkillRemove = (skillToRemove: string) => {
    setSkillFilter(prev => prev.filter(skill => skill !== skillToRemove));
  };

  const filteredJobs: Job[] = jobsShown.filter((job: Job) => {
    return (
      job.city.toLowerCase().includes(cityFilter.toLowerCase()) &&
      (skillFilter.length === 0 || job.skills.some(skill => skillFilter.includes(skill))) &&
      (job.title.toLowerCase().includes(keywordFilter.toLowerCase()) || job.description.toLowerCase().includes(keywordFilter.toLowerCase())) &&
      isJobWithinDateRange(job, dateFilter) &&
      isDurationInRange(job.estimatedDuration, minDuration, maxDuration)
    );
  });


  return (
    <div className={styles.container}>
      <h1 className={styles.jobBoardHeader}>Job Board</h1>

      <div className={styles.filtersPanel} id={styles.filtersFirstRow}>
        {/* Keywords Filter */}
        <div className={styles.filter}>
          <label>Search All Jobs:</label>
          <input
            type="text"
            placeholder="Search by keywords"
            value={keywordFilter}
            onChange={e => setKeywordFilter(e.target.value)}
          />
        </div>

        {/* City Filter */}
        <div className={styles.filter}>
          <label>Filter by City:</label>
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
      </div>
      <div className={styles.filtersPanel}>
        {/* Skills Filter */}
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
        <button className={styles.searchButton} onClick={handleSearch}>Search</button>
      </div>
      
      <div className={styles.filtersPanel}>
        <div className={styles.selectedSkills}>
          {skillFilter.map(skill => (
            <div key={skill} className={styles.skillItem}>
              {skill}
              <span className={styles.removeSkill} onClick={() => handleSkillRemove(skill)}>X</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.filtersPanel}>
        {/* Filter by Minimum Estimated Duration */}
        <div className={styles.durationFilters}>
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
        </div>
      </div>
      {/* Job Cards */}
      <h1>Filtered Jobs:</h1>
      <div className={styles.jobs}>
        {jobsShown.map(job => (
          <div key={job.id} className={styles.jobCard}>
            <h2 className={styles.jobTitle}>{job.title}</h2>
            <div className={styles.jobDetailsPanels}>
              <div className={styles.jobDetailsPanelLeft}>
                <h3>City:</h3>
                <p className={styles.jobCity}>{job.city}</p>
                <h3>Date posted:</h3>
                <p className={styles.jobDate}>{job.datePosted.toLocaleString('default', { month: 'long' }) + " " + job.datePosted.getDate() + ", " + job.datePosted.getFullYear()}</p>
                <h3>Posted by:</h3>
                <p className={styles.jobPoster}>{job.posterFirstName}</p>
                <h3>Leads Purchased:</h3>
                <p className={styles.leads}>{job.numLeadsPurchased + " out of " + job.numLeadsTotal}</p>
              </div>
              <div className={styles.jobDetailsPanelRight}>
                <h3>Description:</h3>
                <p className={styles.jobDescription}>{job.description}</p>
                <h3>Skills needed:</h3>
                <div className={styles.jobSkills}>
                  {job.skills.map(skill => (
                    <span key={skill} className={styles.skillItem}>{skill}</span>
                  ))}
                </div>
                <h3>Estimated Duration:</h3>
                <p className={styles.jobDuration}>{job.estimatedDuration}</p>
                <h3>Estimated Budget:</h3>
                <p className={styles.jobBudget}>{"$" + job.estimatedBudget}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.moreResultsContainer}>
        {moreResultsVisible && <button className={styles.moreButton} onClick={handleMoreResults}>More Results</button>}
        {!moreResultsVisible && <h2 className={styles.noResults} >{jobsShown.length ? "No More Results" : "No Results"}</h2>}
      </div>
    </div>
  );
};

export default ViewJobs;
