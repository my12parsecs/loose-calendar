
import "../stylesheets/not-found.css"
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='page'>
      <div className='not-found-container'>
        <h1 className="not-found-title">404 Not Found</h1>
        <Link href="/" className="not-found-return">Return Home</Link>
      </div>
    </div>
  )
}