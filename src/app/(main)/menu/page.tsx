

import "../../stylesheets/menu.css";
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../../../auth";

export default async function Menu() {
  const session = await auth()

  return (
    <div className="menu-page" style={{height: '100%', minHeight: 'calc(100dvh - 35px)'}}>
        <h1>Menu</h1>
        {!session?.user ? <div></div> : (
          <Link className="menu-link-item" href="/account">
            <img src={session.user.image} alt="User Avatar" className="menu-avatar" />
            <div className="menu-link-text">Account</div>
          </Link>
        )}
        <Link className="menu-link-item" href="/about">
          <FontAwesomeIcon icon={faCircleInfo} className="menu-icon" />
          <div className="menu-link-text">About</div>
        </Link>
        <Link className="menu-link-item" href="https://github.com/my12parsecs/loose-calendar" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faGithub} className="menu-icon" />
          <div className="menu-link-text">GitHub</div>
        </Link>
    </div>
  );
}