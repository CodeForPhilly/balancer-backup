import { ReactNode } from "react";
import Header from "../../components/Header/Header";

interface LayoutProps {
  children: ReactNode;
}

function Layout(props: LayoutProps) {
  console.log('props', props)
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="container">
        <Header />
        {props.children}
      </div>
    </main>
  );
}

export default Layout;
