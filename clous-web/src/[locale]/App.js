import { BrowserRouter as Router } from "react-router-dom";
import store from "../store";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import AnimatedRoutes from "Routes";
import ReactGA from "react-ga4";
import mixpanel from "mixpanel-browser";

function App() {
  mixpanel.init('4477d9caa0e54978f32649f86571907f', { debug: true, persistence: 'localStorage' });


  // Show a 404 error if the user requests an unknown locale
  
  return (

    <HelmetProvider>
      <Provider store={store}>
        <Router>
          <AnimatedRoutes />
        </Router>
      </Provider>
    </HelmetProvider>
  );
}

export default App;