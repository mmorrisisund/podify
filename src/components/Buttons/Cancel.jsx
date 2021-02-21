export const CancelButton = ({ onClick }) => (
  <button
    type='button'
    className='px-8 py-4 text-gray-700 transition-colors border border-gray-700 rounded-md hover:text-gray-50 hover:border-gray-50'
    onClick={onClick}
  >
    Cancel
  </button>
)
