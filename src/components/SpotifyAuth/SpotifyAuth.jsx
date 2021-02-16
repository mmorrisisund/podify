export const SpotifyAuth = () => {
  const link =
    'https://accounts.spotify.com/authorize?client_id=6e2838543c824936abe0db7069a36ebb&response_type=token&redirect_uri=http:%2f%2flocalhost:3000&state=testState'

  return (
    <a
      className='px-8 py-1 font-medium tracking-wider uppercase transition transform rounded-full pointer-events-auto bg-true-gray-50 text-true-gray-900 hover:scale-105'
      href={link}
    >
      log in
    </a>
  )
}
