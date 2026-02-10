type LiquidGooeyBackgroundProps = {
  className?: string;
};

const blobs = [
  {
    id: 1,
    size: 520,
    top: "-6%",
    left: "2%",
    opacity: 0.88,
    animation: "gooey-float-1",
    duration: "22s",
    delay: "-6s",
  },
  {
    id: 2,
    size: 420,
    top: "8%",
    left: "70%",
    opacity: 0.82,
    animation: "gooey-float-2",
    duration: "18s",
    delay: "-10s",
  },
  {
    id: 3,
    size: 360,
    top: "54%",
    left: "26%",
    opacity: 0.78,
    animation: "gooey-float-3",
    duration: "20s",
    delay: "-4s",
  },
  {
    id: 4,
    size: 300,
    top: "62%",
    left: "74%",
    opacity: 0.8,
    animation: "gooey-float-1",
    duration: "16s",
    delay: "-12s",
  },
  {
    id: 5,
    size: 260,
    top: "28%",
    left: "46%",
    opacity: 0.8,
    animation: "gooey-float-2",
    duration: "14s",
    delay: "-2s",
    mobileHidden: true,
  },
  {
    id: 6,
    size: 240,
    top: "72%",
    left: "8%",
    opacity: 0.75,
    animation: "gooey-float-3",
    duration: "24s",
    delay: "-14s",
    mobileHidden: true,
  },
];

export default function LiquidGooeyBackground({ className = "" }: LiquidGooeyBackgroundProps) {
  return (
    <div
      aria-hidden
      className={`liquid-gooey-bg ${className}`.trim()}
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
          <filter id="gooey-sm">
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="liquid-gooey-base" />

      <div className="liquid-gooey-blobs">
        {blobs.map((blob) => (
          <span
            key={blob.id}
            className={`liquid-gooey-blob${blob.mobileHidden ? " liquid-gooey-blob--mobile-hidden" : ""}`}
            style={{
              width: `calc(${blob.size}px * var(--gooey-scale, 1))`,
              height: `calc(${blob.size}px * var(--gooey-scale, 1))`,
              top: blob.top,
              left: blob.left,
              opacity: blob.opacity,
              animationName: blob.animation,
              animationDuration: blob.duration,
              animationDelay: blob.delay,
            }}
          />
        ))}
      </div>

      <div className="liquid-gooey-grain" />
    </div>
  );
}
