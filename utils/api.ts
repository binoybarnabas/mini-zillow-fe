// utils/api.ts
import httpClient from './httpClient';

export const get = <T>(url: string, config = {}) => {
  return httpClient.get<T>(url, config).then(res => res.data);
};

export const post = <T>(url: string, data: any, config = {}) => {
  return httpClient.post<T>(url, data, config).then(res => res.data);
};

export const put = <T>(url: string, data: any, config = {}) => {
  return httpClient.put<T>(url, data, config).then(res => res.data);
};

export const del = <T>(url: string, config = {}) => {
  return httpClient.delete<T>(url, config).then(res => res.data);
};
