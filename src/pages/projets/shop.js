import styles from '../styles/shop.module.css'
import Card from '../../Components/card'

export default function Shop({ datas }){
    return(
        <section className={ styles.container }>
            <h1 className={ styles.title1}>Boutique</h1>
            <grille className={ styles.grille}>
                {/* {datas.map(({ Title, Content, Date, createdAt, updatedAt }) => (
                    <Card Title={Title} Content={ Content } Date={ Date } createdAt={ createdAt } updatedAt={ updatedAt } ></Card>
                ))} */}
                {/* <Card ></Card>
                <Card ></Card>
                <Card ></Card>
                <Card ></Card>
                <Card ></Card>
                <Card ></Card>
                <Card ></Card> */}
            </grille>
        </section> 
    )
}
