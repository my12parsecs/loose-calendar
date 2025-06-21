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
            <Link href="/" className="nav-title-short">LC</Link>
            <div className='nav-right'>
                {session ? <SignOut /> : <Link href="/login" className="login-button" prefetch={true}>Login</Link>}
                <div className='menu-link-wrapper'>
                        <Link href="/menu" className='menu-link' prefetch={true}>
                            <FontAwesomeIcon icon={faGear} className="menu-icon" />
                        </Link>
                </div>
            </div>



        </div>
    )
}