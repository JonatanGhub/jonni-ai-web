'use client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let done = false;
export function registerGsap() {
  if (done || typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  done = true;
}
