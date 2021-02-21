export const FollowButton = ({ isFollowing, onClick, ...props }) => (
  <button
    {...props}
    onClick={onClick}
    className='px-6 py-2 text-xs font-bold tracking-wider uppercase transition border rounded border-true-gray-600 text-true-gray-50 hover:border-white'
  >
    {isFollowing ? 'Following' : 'Follow'}
  </button>
)
