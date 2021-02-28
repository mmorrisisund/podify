import { useAuth } from '../../providers/auth'

export const TopbarAuthLinks = () => {
  const { login } = useAuth()

  return (
    <div>
      <div className='flex pointer-events-auto'>
        <button className='mr-10 text-xs font-bold tracking-widest uppercase transition transform text-true-gray-50 hover:scale-105'>
          sign up
        </button>
        <button
          className='px-10 py-3 text-xs font-bold tracking-widest uppercase transition transform rounded-full bg-true-gray-50 hover:scale-105'
          onClick={login}
        >
          log in
        </button>
      </div>
    </div>
  )
}
