'use client'
import {useState} from "react";
import {BellIcon} from "@heroicons/react/24/outline";

const UserDropdown = (props) => {
    const [showUserDropdown, setUserDropdown] = useState(false);
    return (
        <div className="flex flex-1 items-center justify-end gap-x-8">
            <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
            >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true"/>
            </button>
            <button type="button"
                    className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown"
                    onClick={() => setUserDropdown(!showUserDropdown)}
            >
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full"
                     src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                     alt="user photo"/>
            </button>
            {showUserDropdown &&
                <div
                className="absolute float-right top-20 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown">
                <div className="px-4 py-3">
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{props.auth.user.email}</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                        <a href="/logout"
                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        Sign out
                        </a>
                    </li>
                </ul>
            </div>}
        </div>
    );
}

export default UserDropdown;
