import PrimaryButton from "@/components/AppButton";

interface Props {
  title: string;
  buttonUrl: string;
  buttonText: string;
}

export default function SectionsHeader({ title, buttonUrl, buttonText }: Props) {
  return (
    <div className="flex justify-between items-center w-full mb-4">
    <h1 className="text-2xl text-slate-700 font-bold">{title}</h1>
    <PrimaryButton 
      buttonType="link" 
      url={buttonUrl}
      text={buttonText}
      className="text-sm"
    />
  </div>
  )
}
