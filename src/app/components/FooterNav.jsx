
import "../stylesheets/footer-nav.css"
import FooterLink from "./FooterLink"

export default function FooterNav() {
    
    return (
        <div className="footer-nav">
            <div className="footer-nav-left">
                <FooterLink which="path" />
            </div>
            <div className="footer-nav-right">
                <FooterLink which="prev" />
                <FooterLink which="next" />
            </div>
        </div>
    )
}