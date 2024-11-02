interface LevelBadgeProps {
  level: "basico" | "intermedio"| "avanzado"; 
  className?: string;
}

const levelStyles = {
  basico: {
    label: "Básico",
    bgClass: "bg-green-600",
  },
  intermedio: {
    label: "Intermedio",
    bgClass: "bg-yellow-600",
  },
  avanzado: {
    label: "Avanzado",
    bgClass: "bg-red-600",
  },
};

export default function LevelBadge({ level, className = "" }: LevelBadgeProps) {
  const { label, bgClass } = levelStyles[level] || {};

  if (!label) return null;

  return (
    <span className={`${bgClass} block font-semibold text-white text-[0.8em] px-2 py-[0.1em] rounded-full ${className}`}>
      {label}
    </span>
  );
}
