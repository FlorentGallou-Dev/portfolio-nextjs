import Layout from '../../layout/layout'

export default function Post({ post }){
    return (
        <Layout>
            <section>
                <h1>{post.attributes.Title}</h1>
                <p>{post.attributes.Content}</p>
            </section>
        </Layout>
    )
  }

export async function getStaticProps(context) {

    const slug = context.params.slug;

    const query = `query {
                        blogArticles(filters: {Slug: {eq: "${slug}"}}) {
                        data {
                            id
                            attributes {
                            Title,
                            Date,
                            Slug,
                            createdAt,
                            updatedAt,
                            Content
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

    return {
        props: { post: reponse.data?.blogArticles.data[0] || [] }
    }
}

export async function getStaticPaths() {
    const query = `query{
                        blogArticles{
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

    const paths = reponse.data.blogArticles.data.map((slug) => { return `/blog/${slug.attributes.Slug}`});

    return {
            paths,
            fallback: false,
        }
}