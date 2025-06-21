


import "../../stylesheets/menu.css";
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCalendarDays, faCircleInfo, faKeyboard, faPenNib } from "@fortawesome/free-solid-svg-icons";

export default function Menu() {

  return (
    <div className="menu-page" style={{height: '100%'}}>
        <h1>Menu</h1>
         <Link className="menu-link-item" href="/account">
         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu1QBqmHIjMfwB8F2UlnTPVJfQo88pkf3Dhg&s" alt="" className="menu-avatar" />
         <div className="menu-link-text">Account</div>
         </Link>
        <Link className="menu-link-item" href="/about" prefetch={true}>
          <FontAwesomeIcon icon={faCircleInfo} className="menu-icon" />
          <div className="menu-link-text">About</div>
        </Link>
        <Link className="menu-link-item" href="/editor" prefetch={true}>
          <FontAwesomeIcon icon={faPenNib} className="menu-icon-key" />
          <div className="menu-link-text">Editor Tips</div>
        </Link>
        <Link className="menu-link-item" href="/hotkeys" prefetch={true}>
          <FontAwesomeIcon icon={faKeyboard} className="menu-icon-key" />
          <div className="menu-link-text">Hotkeys</div>
        </Link>
        <Link className="menu-link-item" href="/calendar" prefetch={true}>
          <FontAwesomeIcon icon={faCalendarDays} className="menu-icon-cal" />
          <div className="menu-link-text">Calendar</div>
        </Link>
        <Link className="menu-link-item" href="https://github.com/my12parsecs/loose-calendar" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faGithub} className="menu-icon" />
          <div className="menu-link-text">GitHub</div>
        </Link>
    </div>
  );
}