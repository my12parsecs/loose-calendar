
import Nav from "../components/Nav";

export default function Layout({ children }) {

  return (
    <div>
      <Nav />
      {children}
    </div>
  );
}
