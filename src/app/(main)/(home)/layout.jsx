import Nav from "../../components/Nav";
import toast, { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
   return (
      <div>
         {/* <Nav /> */}
         {children}
         {/* <Toaster /> */}
      </div>
   );
}
