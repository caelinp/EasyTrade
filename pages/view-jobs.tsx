// pages/view-jobs.tsx
import React, { useState, useEffect } from 'react';

const PROFESSIONS = ['Electrician', 'Carpenter', 'Locksmith', 'Plumber', 'Landscaper', 'Tiler', 'HVAC Technician', 'Painter', 'Flooring Specialist', 'Roofer'];

const JOBS = [
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


const ViewJobsPage = () => {
  const [filters, setFilters] = useState({ city: '', skills: [], keywords: '' });
  const [filteredJobs, setFilteredJobs] = useState(JOBS);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  useEffect(() => {
    const results = JOBS.filter(job => 
      job.city.includes(filters.city) && 
      (selectedSkills.length === 0 || selectedSkills.some(skill => job.skills.includes(skill))) &&
      (job.title.includes(filters.keywords) || job.description.includes(filters.keywords))
    );
    setFilteredJobs(results);
  }, [filters, selectedSkills]);

  return (
    <div>
      <div>
        <input placeholder="City" onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))} />
        
        <div>
          <select 
            onChange={(e) => {
              if (!selectedSkills.includes(e.target.value)) {
                setSelectedSkills([...selectedSkills, e.target.value]);
              }
            }}>
            {PROFESSIONS.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
          <ul>
            {selectedSkills.map(skill => (
              <li key={skill}>
                {skill}
                <button onClick={() => setSelectedSkills(prev => prev.filter(s => s !== skill))}>X</button>
              </li>
            ))}
          </ul>
        </div>

        <input placeholder="Keywords" onChange={(e) => setFilters(prev => ({ ...prev, keywords: e.target.value }))} />
      </div>

      <div>
        {filteredJobs.map(job => (
          <div key={job.id}>
            <h2>{job.title}</h2>
            <p>{job.city}</p>
            <p>{job.description}</p>
            <p>{job.datePosted}</p>
            <p>Posted by: {job.posterFirstName}</p>
            <p>Skills: {job.skills.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewJobsPage;
