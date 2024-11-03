
"use client";

import AppButton from "../AppButton";
import AppLinkButton from "../AppLinkButton";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

interface TechCardActionsProps  extends React.HTMLProps<HTMLDivElement> {
  cardType: string
  itemId: string
  itemSlug: string
}


export default function TechCardActions({ 
  cardType,
  itemId,
  itemSlug,
  className, 
  ...props
  }: TechCardActionsProps) {

  function handleDelete() {
    console.log(`Eliminar item ${itemId}`);
  }

  return (
    <div 
      className={`flex items-center justify-end gap-3 w-full ${className || ''}`}
      {...props}>
      <AppLinkButton
        title="Editar tecología"
        className="!bg-blue-500 hover:!bg-blue-600 text-[0.85em]  h-[30px] flex items-center justify-center"
        href={`/admin/${cardType}/editar/${itemSlug}`}
      >
        <FaEdit/>
      </AppLinkButton>
      <AppButton
        className="!bg-gray-500 hover:!bg-gray-600 text-[0.85em]  h-[30px] flex items-center justify-center"
        type="button"
        title="Eliminar tecnología"
        onClick={() => handleDelete()}
      >
        <FaTrashAlt/>
      </AppButton >
    </div>
  )
}
