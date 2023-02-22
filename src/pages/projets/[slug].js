import Layout from '../../layout/layout'
import styles from '../../styles/project.module.css'

export default function Post({ post }){
    return (
        <Layout>
            <section className={ styles.container }>
                <h1 className={ styles.title1}>{post.attributes.Title}</h1>
                <p className={ styles.text}>{post.attributes.Description}</p>
                <ul className={ styles.ul}>
                    {post.attributes.technologies.data.map(techno => (
                        <li className={ styles.li}>{techno.attributes.title}</li>
                    ))}
                </ul>
            </section> 

        </Layout>
    )
  }

export async function getStaticProps(context) {

    const slug = context.params.slug;

    const query = `query {
                        projects(filters: {Slug: {eq: "${slug}"}}){
                        data{
                            id,
                            attributes{
                                Title,
                                Slug,
                                Description,
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
        body: JSON.stringify({
            query, 
            variables: {
                slug: slug
            }})  
    }

    const results = await fetch('http://localhost:1337/graphql', options)
    const reponse = await results.json();

    console.log(reponse.data?.projects.data[0].attributes.technologies.data)

    return {
        props: { post: reponse.data?.projects.data[0] || [] }
    }
}

export async function getStaticPaths() {
    const query = `query {
                        projects{
                        data{
                            id,
                            attributes{
                            Slug
                            }
                        }
                        }
                    }`;

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query})
    }

    const results = await fetch('http://localhost:1337/graphql', options)
    const reponse = await results.json();

    const paths = reponse.data.projects.data.map((slug) => { return `/projets/${slug.attributes.Slug}`});

    return {
            paths,
            fallback: false,
        }
}