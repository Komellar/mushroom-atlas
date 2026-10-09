import type { EdibilityFilter } from '@/utils/atlas-query';
// Retain browsing state during route/tab remounts within this application session.
export const atlasState: { query: string; filter: EdibilityFilter; offset: number } = {
  query: '',
  filter: 'all',
  offset: 0,
};
