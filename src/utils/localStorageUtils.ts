import type { UserPayload } from '@/types/api/authTypes';

export const setUserPayload = (userPayload: UserPayload | undefined) => {
  if (!userPayload) {
    throw new Error('Invalid user data. Please try logging in again.');
  }
  localStorage.setItem('userPayload', JSON.stringify(userPayload));
};

export const getUserPayload = (): UserPayload | null => {
  try {
    const userPayload = localStorage.getItem('userPayload');
    if (!userPayload || userPayload === 'undefined' || userPayload === 'null') {
      return null;
    }
    return JSON.parse(userPayload) as UserPayload;
  } catch {
    return null;
  }
};

export const removeUserPayload = () => {
  localStorage.removeItem('userPayload');
};

export const isAuthenticated = (): boolean => {
  try {
    const userPayload = localStorage.getItem('userPayload');
    return (
      userPayload !== null &&
      userPayload !== 'undefined' &&
      userPayload !== 'null' &&
      userPayload !== ''
    );
  } catch {
    return false;
  }
};
