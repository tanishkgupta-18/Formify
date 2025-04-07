import Image from 'next/image';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex w-full max-w-sm mx-auto mt-8 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
      <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')" }}
      ></div>

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        {/* Clerk SignIn Component */}
        <div className="mt-6 flex justify-center">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
