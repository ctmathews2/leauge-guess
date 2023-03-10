import '../App.css';
import { Link, useLocation } from 'react-router-dom';

function StartScreen() {
  const {state} = useLocation();

  if(state?.points == null) {
    return (
      <div className='start-screen'>
          <p>
              Welcome to "Who Won?"!<br></br>
              Your goal is to guess which team won based on the info given<br></br>
              You can spend gold to reveal key info to help inform your decision<br></br>
              You will earn more points the less gold you spend<br></br>
              The game will continue until you guess incorrectly<br></br>
              Good Luck!
          </p>
          <Link
              to='/matches'
              className='btn btn-outline-warning'
          >
              Start!
          </Link>
      </div>
    );
  }
  return (
    <div className='start-screen'>
      <p>
        Oops! Wrong choice<br></br>
        You scored: { state.points } points!
      </p>
      <Link
          to='/matches'
          className='btn btn-outline-warning'
      >
          Start Again
      </Link>
    </div>
  )
}

export default StartScreen;