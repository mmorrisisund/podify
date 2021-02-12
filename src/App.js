import SplitPane from './components/SplitPane/SplitPane'

function App () {
  return (
    <div className='flex flex-col min-h-screen'>
      <SplitPane className='flex-1'>
        <SplitPane.Left className='grid-in-nav'>
          <nav className='h-full bg-blue-500' />
        </SplitPane.Left>
        <SplitPane.Right className='grid-in-main'>
          <header className='h-24 bg-red-500 grid-in-header' />
          <main className='h-full bg-green-500'></main>
        </SplitPane.Right>
      </SplitPane>
      <footer className='h-24 bg-yellow-500' />
    </div>
  )
}

export default App
