import { useState, useEffect } from 'react';

export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
  isPassed: boolean;
  formattedTarget: string;
}

export function useCountdown(targetDateString: string): CountdownResult {
  const [countdown, setCountdown] = useState<CountdownResult>(() =>
    calculateTimeLeft(targetDateString)
  );

  useEffect(() => {
    // Initial calculation
    setCountdown(calculateTimeLeft(targetDateString));

    const interval = setInterval(() => {
      setCountdown(calculateTimeLeft(targetDateString));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateString]);

  return countdown;
}

function calculateTimeLeft(dateString: string): CountdownResult {
  if (!dateString) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isToday: false,
      isPassed: false,
      formattedTarget: 'Invalid Date',
    };
  }

  // Parse target date YYYY-MM-DD in local time
  const [yearStr, monthStr, dayStr] = dateString.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);

  const now = new Date();
  const currentYear = now.getFullYear();

  // Create target date for the specified year or current year if earlier
  let target = new Date(year || currentYear, month, day, 0, 0, 0, 0);

  // Formatted date string (e.g. October 9, 2026)
  const formattedTarget = target.toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Check if today is the birthday (matching month & day in local time)
  const isToday =
    now.getDate() === target.getDate() &&
    now.getMonth() === target.getMonth();

  if (isToday) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isToday: true,
      isPassed: false,
      formattedTarget,
    };
  }

  // If the target date with original year is in the past, calculate for this year's birthday
  // or next year's if this year already passed
  let nextBirthday = new Date(currentYear, month, day, 0, 0, 0, 0);
  if (nextBirthday.getTime() < now.getTime() && !isToday) {
    nextBirthday = new Date(currentYear + 1, month, day, 0, 0, 0, 0);
  }

  const diffMs = nextBirthday.getTime() - now.getTime();
  const isPassed = diffMs <= 0;

  if (isPassed) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isToday: false,
      isPassed: true,
      formattedTarget,
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return {
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
    isToday: false,
    isPassed: false,
    formattedTarget,
  };
}
