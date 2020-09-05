import React from 'react'
import PhaContainer from './redux/container/phaContainer';
import HomeBar from './components/NavBar';
import YTDContainer from './redux/container/ytdContainer'
import CustomContainer from './redux/container/customContainer';
import TrackerContainer from './redux/container/trackerContainer';
import {Alert} from 'react-bootstrap';
const App = () => {
  return (
    <div>
      <div>
      <HomeBar />
      </div>
      <div>
      <YTDContainer />
      </div>
      <div>
      < PhaContainer />
      </div>
      <div>
      <TrackerContainer />
      </div>
      <div>
      <Alert variant={'info'}>
      Date to Date Search
    </Alert>
      < CustomContainer />
      </div>
    </div>
  )  
}

export default App;