import AppLinkButton from "../AppLinkButton";

interface Props {
  title: string;
  buttonUrl: string;
  buttonText: string;
}

export default function SectionsHeader({ title, buttonUrl, buttonText }: Props) {
  return (
    <div className="flex justify-between items-center w-full mb-4">
    <h1 className="
      text-2xl 
      text-slate-700 font-bold
      dark:text-slate-200
      ">
        {title}
    </h1>
    <AppLinkButton
      href={buttonUrl}
      className="text-sm"
    >
      {buttonText}
    </AppLinkButton>

  </div>
  )
}
