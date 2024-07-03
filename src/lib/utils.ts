import { memo } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const genericMemo: <T>(component: T) => T = memo;

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function range(size: number) {
  return Array.from({ length: size }, (_, i) => i);
}

export function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop;
}

export function youtube_parser(url: string) {
  // https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = regExp.exec(url);
  return match && match[7].length === 11 ? match[7] : '';
}
