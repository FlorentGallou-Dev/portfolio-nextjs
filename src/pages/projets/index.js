import Layout from '../../layout/layout'
import styles from '../../styles/project.module.css'
import Card from '../../Components/card'

export default function Home( datas ){
    return(
        <Layout>
          <section className={ styles.container }>
            <h1 className={ styles.title1}>Projets</h1>
            <grille className={ styles.grille}>
                {datas.datas.map(data => (
                  <Card Title={ data.attributes.Title } Slug={ data.attributes.Slug } createdAt={ data.attributes.createdAt } Technologies={ data.attributes.technologies.data } ></Card>
                ))}
            </grille>
        </section> 
        </Layout>
        )
}

export async function getStaticProps(){

    const query = `query {
                      projects{
                        data{
                          id,
                          attributes{
                            Title,
                            Slug,
                            createdAt,
                            technologies { data{id,attributes{title,icon}} }
                          }
                        }
                      }
                    }`;

    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({query})  
    }

    // Call an external API endpoint to get posts
    const results = await fetch('http://localhost:1337/graphql', options)
    const reponse = await results.json();

    // By returning { props : datas }, the Blog Sho component will receive 'datas' as a prop as buid time
    return {
      props: {
        datas: reponse.data?.projects.data || [],
      }
    }
}