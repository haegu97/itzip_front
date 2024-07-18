'use client';

import React, { useEffect, useState } from 'react';
import { fetchJobs, Job } from '../../api/saramin/route';


// const dummyJobs: Job[] = [
//   {
//     id: '1',
//     title: '[글로벌 AI SaaS][스타트업] 백엔드 서버개발자 채용',
//     industry: { code: '301', name: '솔루션·SI·ERP·CRM' },
//     location: { code: '101240', name: '서울 > 중구' },
//     jobType: { code: '1,10,2', name: '정규직,계약직 (정규직 전환가능),계약직' },
//     jobMidCode: { code: '2', name: 'IT개발·데이터' },
//     jobCode: { code: '201,236,258,302,89,92,118,127,136,142,201,202,221,258,284,284', name: '소프트웨어개발,AWS,Javascript,Node.js,TypeScript,유지보수,프론트엔드,솔루션,인프라,클라우드,API,Azure,GCP,SaaS' },
//     experienceLevel: { code: 3, min: 3, max: 0, name: '신입/경력' },
//     requiredEducationLevel: { code: '8', name: '대학교졸업(4년)이상' },
//     postedDate: '2023-07-01',
//     recommendations: 5,
//     views: 150,
//     companyImage: 'https://via.placeholder.com/100',
//     url: 'https://example.com/job/1',
//   },
//   {
//     id: '2',
//     title: '[글로벌 AI SaaS][스타트업] 프론트엔드 개발자 채용',
//     industry: { code: '301', name: '솔루션·SI·ERP·CRM' },
//     location: { code: '101240', name: '서울 > 중구' },
//     jobType: { code: '1,10,2', name: '정규직,계약직 (정규직 전환가능),계약직' },
//     jobMidCode: { code: '2', name: 'IT개발·데이터' },
//     jobCode: { code: '201,236,258,302,89,92,118,127,136,142,201,202,221,258,284,284', name: '소프트웨어개발,AWS,Javascript,Node.js,TypeScript,유지보수,프론트엔드,솔루션,인프라,클라우드,API,Azure,GCP,SaaS' },
//     experienceLevel: { code: 3, min: 3, max: 0, name: '신입/경력' },
//     requiredEducationLevel: { code: '8', name: '대학교졸업(4년)이상' },
//     postedDate: '2023-06-25',
//     recommendations: 8,
//     views: 200,
//     companyImage: 'https://via.placeholder.com/100',
//     url: 'https://example.com/job/2',
//   },
//   // 추가적인 더미 데이터...
// ];

const RecruitPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    education: '',
    experience: '',
    search: '',
    sort: 'latest',
  });
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const jobsData = await fetchJobs();
      setJobs(jobsData);
      setFilteredJobs(jobsData);
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    let tempJobs: Job[] = [...jobs];

    if (filters.technology) {
      tempJobs = tempJobs.filter(job => job.jobCode.code.includes(filters.technology));
    }
    if (filters.location) {
      tempJobs = tempJobs.filter(job => job.location.code.includes(filters.location));
    }
    if (filters.education) {
      tempJobs = tempJobs.filter(job => job.requiredEducationLevel.code.includes(filters.education));
    }
    if (filters.experience) {
      tempJobs = tempJobs.filter(job => job.experienceLevel.code.toString().includes(filters.experience));
    }
    if (filters.search) {
      tempJobs = tempJobs.filter(
        job =>
          job.industry.name.includes(filters.search) || job.title.includes(filters.search)
      );
    }

    if (filters.sort === 'latest') {
      tempJobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    } else if (filters.sort === 'recommendation') {
      tempJobs.sort((a, b) => b.recommendations - a.recommendations);
    } else if (filters.sort === 'views') {
      tempJobs.sort((a, b) => b.views - a.views);
    }

    setFilteredJobs(tempJobs);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookmark = (jobId: string) => {
    // Bookmark functionality
  };

  const toggleFilter = (filterName: string) => {
    if (activeFilter === filterName) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filterName);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-center text-2xl font-bold mb-6">채용 정보 목록</h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          className="w-1/3 p-2 border border-gray-300 rounded"
          placeholder="검색어 입력"
        />
      </div>
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => toggleFilter('technology')}
        >
          기술
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => toggleFilter('location')}
        >
          지역
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => toggleFilter('education')}
        >
          학력
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => toggleFilter('experience')}
        >
          경력
        </button>
      </div>
      <div className="mb-6">
        {activeFilter === 'technology' && (
          <div className="flex justify-center mb-2">
            <input
              type="text"
              name="technology"
              value={filters.technology}
              onChange={handleFilterChange}
              className="w-1/3 p-2 border border-gray-300 rounded"
              placeholder="기술 입력"
            />
          </div>
        )}
        {activeFilter === 'location' && (
          <div className="flex justify-center mb-2">
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-1/3 p-2 border border-gray-300 rounded"
              placeholder="지역 입력"
            />
          </div>
        )}
        {activeFilter === 'education' && (
          <div className="flex justify-center mb-2">
            <select
              name="education"
              value={filters.education}
              onChange={handleFilterChange}
              className="w-1/3 p-2 border border-gray-300 rounded"
            >
              <option value="">학력 선택</option>
              <option value="highschool">고졸</option>
              <option value="college">대졸</option>
              <option value="graduate">대학원</option>
            </select>
          </div>
        )}
        {activeFilter === 'experience' && (
          <div className="flex justify-center mb-2">
            <input
              type="text"
              name="experience"
              value={filters.experience}
              onChange={handleFilterChange}
              className="w-1/3 p-2 border border-gray-300 rounded"
              placeholder="경력 입력"
            />
          </div>
        )}
      </div>
      <button
        className="block mx-auto mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={applyFilters}
      >
        필터 적용
      </button>
      <div className="text-center text-lg mb-6">필터링된 공고 개수: {filteredJobs.length}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="p-6 border border-gray-500 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-center mb-2">{job.company}</h3>
            <p className="text-lg text-center mb-2">{job.title}</p>
            <p className="text-center text-gray-600 mb-4">{job.industry.name}</p>
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => window.open(job.url, '_blank')}
              >
                이동
              </button>
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                onClick={() => handleBookmark(job.id)}
              >
                북마크
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruitPage;
