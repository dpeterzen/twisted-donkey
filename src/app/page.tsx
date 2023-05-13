import Link from 'next/link'
import './globals.css'


export default function Home() {
  return (
    <main className='bg-cyan-600'>
      <div>
        <h1>Hello World</h1>
        <Link href="/storybook">Go to Storybook</Link>
      </div>
    </main>
  )
}
