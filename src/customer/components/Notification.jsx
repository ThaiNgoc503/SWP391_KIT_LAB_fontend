import React from "react";

const Notification = ({ notificationMessage }) => {
  return (
    <div
      id="toast-simple"
      class="absolute right-3 top-4 flex w-full max-w-xs items-center space-x-4 divide-x divide-gray-200 rounded-lg bg-green-300 p-4 font-semibold text-white shadow transition-all ease-in-out rtl:space-x-reverse rtl:divide-x-reverse"
      role="alert"
    >
      <svg
        class="h-5 w-5 rotate-45 text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 18 20"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
        />
      </svg>
      <div class="ps-4 text-sm font-normal">{notificationMessage}</div>
    </div>
  );
};

export default Notification;
