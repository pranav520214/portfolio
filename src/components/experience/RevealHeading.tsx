export function RevealHeading({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <h2 className={`reveal-heading ${className}`} aria-label={children}>
      {children.split(" ").map((word, i) => (
        <span className="word-clip" aria-hidden="true" key={`${word}-${i}`}>
          <span className="word-reveal">{word}</span>{" "}
        </span>
      ))}
    </h2>
  );
}
