import React from 'react';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <a
        href="/editor"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        rel="noopener noreferrer"
      >
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          IAmDirector
        </p>
      </a>
    </main>
);
}
