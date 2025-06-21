

import Link from 'next/link';

export default function RenderMemoLoad() {
  return (
    <div style={{height: '100%', width: '100%'}}>
      {Array.from({ length: 7 }).map((_, index) => {
        return (
          <Link href={`/`} className='day-right' key={index} prefetch={true}>
            <div className="day-right-inner"></div>
          </Link>
        );
      })}
    </div>
  );
}