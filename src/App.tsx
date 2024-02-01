import useWindowSize from './utils/useWindowSize';
import { getEventLayout } from './utils/getEventPosition';
import { EVENTS2 } from './utils/constants';

import './App.css';

function App() {
  const windowSize = useWindowSize();

  const eventLayout = getEventLayout(EVENTS2, windowSize.height, windowSize.width);

  return (
    <div className="eventContainer">
      {eventLayout.map((layout) => {
        return (
          <div
            key={layout.id}
            className="event"
            style={{ top: layout.top, height: layout.height, left: layout.left, width: layout.width }}
          >
            {layout.id}
          </div>
        );
      })}
    </div>
  );
}

export default App;
