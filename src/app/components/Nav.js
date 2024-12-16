import Link from 'next/link'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import "../stylesheets/nav.css";

export default function Nav() {

    return (
        <div className="nav">
            <div className='nav-left'></div>
            <a href="/" className="nav-title">Loose Calendar <span>FTW</span></a>
            <div className='nav-right'>
                <div className='nav-link'>
                    <div className='about-link-wrapper'>
                        <Link href="/about" className='about-link'>
                            <FontAwesomeIcon icon={faCircleInfo} className="about-icon" />
                        </Link>
                    </div>
                </div>
                <div className="nav-link">
                    <div className='github-link-wrapper'>
                        <a href="https://github.com/my12parsecs/loose-calendar" target="_blank" rel="noreferrer" className="github-link">
                            <FontAwesomeIcon icon={faGithub} className="github-icon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}