import { MediaDisplay } from './MediaDisplay'
import { Player } from './Player'

export const NowPlayingBar = ({ imageUrl, episode, artist, trackUrl }) => {
  return (
    <div className='flex justify-between h-full bg-true-gray-900 align-center'>
      <div className='w-1/3'>
        <MediaDisplay
          image='https://content.production.cdn.art19.com/images/93/67/57/91/93675791-abdf-43e9-94a0-4ee572fa0961/0c0d946c488c2a1ed0491dd0b2ea33f7e90a3a738be0e7f1d4c8a1dab379d4829a1c6aafd91ab7d6d61375fd8de8f9d9b11832b0050580f0dc9ed73f110443bb.jpeg'
          episodeName='467 - The San Jose Bees '
          artistName='The Dollop with Dave Anthony and Gareth Reynolds'
        />
      </div>
      <div className='flex-grow'>
        <Player url='https://dts.podtrac.com/redirect.mp3/chtbl.com/track/9EE2G/pdst.fm/e/rss.art19.com/episodes/b6f4b410-a6ab-4b20-90b0-4684614c7e6c.mp3' />
      </div>
    </div>
  )
}
