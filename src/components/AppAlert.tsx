
interface AlertProps {
  text: string;
  type: "error" | "success" | "warning";
}

const alertTypes = {
  error: "text-red-800 bg-red-100 dark:bg-gray-800 dark:text-red-400",
  success: "text-green-800 bg-green-100 dark:bg-gray-800 dark:text-green-400",
  warning: "text-yellow-800 bg-yellow-100 dark:bg-gray-800 dark:text-yellow-400",
}

export default function AppAlert({ text, type }: AlertProps) {
  return (
    <div 
      className={`p-4 mb-4 text-sm rounded-md ${alertTypes[type]}`}
      role="alert"> 
      {text}
    </div>
  )
}
