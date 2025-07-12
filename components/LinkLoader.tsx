'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function LinkWithLoader({ href, children, className }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <>
      <a onClick={handleClick} href={href} className={className}>
        {children}
      </a>
      {isPending && (
        <div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="text-sm text-gray-700">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}
