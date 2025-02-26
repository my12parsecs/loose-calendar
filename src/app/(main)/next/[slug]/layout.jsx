import FooterNav from "../../../components/FooterNav";


export default function Layout({ children }) {

  return (
    <div className="main-page">
      {children}
      <FooterNav />
    </div>
  );
}
