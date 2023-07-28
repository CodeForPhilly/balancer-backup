import "./App.css";
import Summary from "./pages/PatientManager/PatientManager";
import Layout from "./pages/Layout/Layout";
import { DarkModeProvider } from "./contexts/DarkModeContext";

const App = () => {
  return (
    <DarkModeProvider>
      <Layout>
        <Summary />
      </Layout>
    </DarkModeProvider>
  );
};

export default App;
