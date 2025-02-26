
import Link from "next/link"
import "../stylesheets/footer-nav.css"
import FooterLink from "./FooterLink"

export default function FooterNav() {
    
    return (
        <div className="footer-nav">
            <Link href="/" className="footer-nav-left">
                <FooterLink which="path" />
            </Link>
            <div className="footer-nav-right">
                <FooterLink which="prev" />
                <FooterLink which="next" />
            </div>
        </div>
    )
}