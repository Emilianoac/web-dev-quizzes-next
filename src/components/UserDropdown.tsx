"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";


interface AppDropdownProps {
  image: string;
  email: string;
}

export default function UserDropdown({ image, email }: AppDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <button
          id="dropdownUserAvatarButton"
          data-dropdown-toggle="dropdownAvatar"
          className="
            flex text-sm 
            bg-gray-800 rounded-full md:me-0 
            focus:ring-4 focus:ring-gray-300 
            dark:focus:ring-gray-600"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open user menu</span>
          <Image
            width={100}
            height={100}
            className="w-8 h-8 rounded-full"
            src={image}
            alt="Avatar"
          />
        </button>
        {/* Dropdown menu */}
        <div className={`
            ${!isOpen && "hidden"}
            z-10 right-0 absolute w-max top-[120%]
            bg-white divide-y divide-gray-200
            rounded-lg shadow-xl dark:bg-slate-800
            dark:divide-gray-700`}
        >
          <div>
            {/* User's email */}
            <div className="px-4 py-3">
              <p className="text-xs text-gray-800 dark:text-gray-200">
                {email}
              </p>
            </div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownUserAvatarButton"
          >
          <li>
            <Link 
              href={"/admin"}
              className="
                block px-4 py-2 
                hover:bg-gray-100 dark:hover:bg-slate-700
                dark:hover:text-white"
            >
              Admin
            </Link>
          </li>
          
          </ul>
          <div className="py-2">
            <button
              onClick={() => signOut()}
              className="
                block px-4 py-2 text-sm w-full
                text-start text-red-500
                hover:bg-gray-100 dark:hover:bg-slate-700
                dark:hover:text-red-700"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
