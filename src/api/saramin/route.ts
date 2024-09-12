import axios from 'axios';
import { Job, JobResponse } from '@/components/recruit/job';

const baseUrl = 'http://3.39.78.0:8080/api/job-info?page=10&size=10&sort=%5B%22string%22%5D';

export async function fetchJobs(params: {
  search?: string;
  techName?: string;
  experienceMin?: number;
  experienceMax?: number;
  page?: number;
  size?: number;
}): Promise<Job[]> {
  try {
    const response = await axios.get<JobResponse>(`${baseUrl}/job-info`, { params });
    return response.data.data.content;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}