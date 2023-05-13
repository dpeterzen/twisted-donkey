import Link from 'next/link'
import './globals.css'


export default function Home() {
  return (
    <main className='bg-cyan-600'>
      <div>
        <h1>Picturebook web app</h1>
        <Link href="/picturebook">Create book</Link>
      </div>
    </main>
  )
}
