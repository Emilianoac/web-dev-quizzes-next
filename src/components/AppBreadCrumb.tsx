import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons/ChevronRight";

interface Section {
  name: string;
  url?: string;
}

interface BreadCrumbProps {
  sections: Section[];
}

export default function BreadCrumb({ sections }: BreadCrumbProps) {
  return (
    <nav className="flex mb-3" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <>
          {sections.length > 0 && sections[0].url && 
            <Link 
              href={sections[0].url} 
              className="text-sm font-medium text-gray-700  hover:text-blue-600">
              {sections[0].name}
            </Link>
          }
          {sections.slice(1).map((item, index) => (
            <li key={index}>
              <div className="flex items-center">
                {index !== sections.length - 2 ? (
                  <>
                    <ChevronRightIcon className="w-5 h-5 text-gray-500" />
                    { item.url ?
                      <Link href={item.url} className="text-sm font-medium text-gray-700 hover:text-blue-600">
                        {item.name}
                      </Link>:
                      <span className="text-sm font-medium text-gray-400">
                        {item.name}
                      </span>
                    }
                  </>
                ) : (
                  <>
                    <ChevronRightIcon className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-400">
                      {item.name}
                    </span>
                  </>
                )}
              </div>
            </li>
          ))}
        </>
      </ol>
    </nav>
  );
}
