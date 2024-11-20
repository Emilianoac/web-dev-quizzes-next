

interface AppNotifactionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function AppNotifaction({className, children}: AppNotifactionProps) {
  return (
    <div 
      className="
      bg-white dark:bg-blue-gray 
      p-3 rounded-[0px_0px_10px_10px] fixed bottom-20 sm:bottom-3 right-3 shadow-md z-[99099] text-sm
      border-t-4 border-primary-500 
      "
      >
      {children}
    </div>
  )
}
