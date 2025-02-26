import Link from 'next/link'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGear } from '@fortawesome/free-solid-svg-icons';

import "../stylesheets/nav.css";
// import { AuthButton } from './Auth';
import { auth } from "../../../auth";
import { SignOut } from "./SignOut";
import NavMonth from "./NavMonth";


export default async function Nav() {
    const session = await auth()

    return (
        <div className="nav">
            <div className='nav-left'>
                <NavMonth />
            </div>
            <Link href="/" className="nav-title">Loose Calendar</Link>
            <div className='nav-right'>
                {/* <div className='nav-link'>
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
                </div> */}
                {session ? <SignOut /> : <Link href={"/login"} className="login-button">Login</Link>}
                <div className='menu-link-wrapper'>
                        <Link href="/menu" className='menu-link'>
                            <FontAwesomeIcon icon={faGear} className="menu-icon" />
                        </Link>
                </div>
            </div>

        </div>
    )
}