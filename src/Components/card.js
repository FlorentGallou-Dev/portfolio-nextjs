import styles from '../styles/card.module.css'
import Link from 'next/link'

export default function Card({ Title, Slug, createdAt, Technologies }){
    return (
      <Link href={`/projets/${Slug}`} className={ styles.link } >
            <card className={ styles.card }>
                <div className={ styles.cartouche }>
                    <div className={ styles.text}>
                        <h3 className={ styles.title}>{Title}</h3>
                        <ul className={ styles.ul}>
                        {Technologies.map(techno => (
                            <li className={ styles.li}>{techno.attributes.title}</li>
                        ))}
                        </ul>
                    </div>
                </div>
            </card>
        </Link>
    )
}