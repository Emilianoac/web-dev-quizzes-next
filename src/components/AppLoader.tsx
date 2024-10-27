import "./AppLoader.css";

interface AppLoaderProps {
  isLoading: boolean;
}

export default function AppLoader({ isLoading }: AppLoaderProps) {
  return (
    isLoading &&
    <div className="loader" role="status">
      <div className="loader__spinner"></div>
    </div>
  )
}
