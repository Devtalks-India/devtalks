const base = 'https://api.devtalks.in/';

const endpoints = {
  base,
  speakers: 'speakers',
  events: 'events',
  get(val) {
    return `${this.base}${val}`;
  },
};

export const api = {
  endpoints,
  async get(type) {
    return fetch(endpoints.get(type)).then(res => res.json()).then(res => res?.data || {});
  },
};

export const fetchEvents = async () => api.get('events').then(res => res?.events || {});

export const fetchSpeakers = async () => api.get('speakers').then(res => res?.speakers || []);
