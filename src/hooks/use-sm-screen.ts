import { useMediaQuery } from '@mantine/hooks';

export function useSmScreen() {
  return typeof window !== 'undefined' && window.innerWidth < 768; // or your md breakpoint
}