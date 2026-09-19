export function NamasteMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 44" fill="none" aria-hidden="true">
      <path d="M19.8 5.5c-2.1-1-3.4.8-3.6 3.3l-1.6 13-4.7 7.1 6.6 5.2 3.5-7.9V6.5m.2-1c2.1-1 3.4.8 3.6 3.3l1.6 13 4.7 7.1-6.6 5.2-3.5-7.9V6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m10 27-6 7 8 6 6-8m12-5 6 7-8 6-6-8" fill="currentColor" fillOpacity=".16" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7 12 4 9m29 3 3-3M20 1v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IndianFlag() {
  return (
    <svg viewBox="0 0 30 20" width="27" height="18" role="img" aria-label="Flag of India">
      <path fill="#ff9933" d="M0 0h30v7H0z" /><path fill="#fff" d="M0 7h30v6H0z" /><path fill="#138808" d="M0 13h30v7H0z" />
      <circle cx="15" cy="10" r="2.5" fill="none" stroke="#000080" strokeWidth=".6" />
      {Array.from({ length: 24 }, (_, i) => <path key={i} d="M15 10v-2.5" stroke="#000080" strokeWidth=".18" transform={`rotate(${i * 15} 15 10)`} />)}
    </svg>
  );
}
