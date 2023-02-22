import styles from './header.module.css'

import Link from 'next/link'

export default function Navbar(){
    return (
        <header className={ styles.header }>
            <nav className={ styles.nav }>
                <div  className={ styles.logo }>Florent Gallou</div>
                <div  className={ styles.linklist }>
                    <Link className={ styles.link } href="/">Accueil</Link>
                    <Link className={ styles.link } href="/projets">Projets</Link>
                </div>
            </nav>
        </header>
    )
}