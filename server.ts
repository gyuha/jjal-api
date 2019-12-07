import { ApolloServer } from 'apollo-server';
import "reflect-metadata";
import { buildSchema, Field, ObjectType, Query, Resolver, Int, Arg } from 'type-graphql';
import {image_search_generator} from 'duckduckgo-images-api'


@ObjectType()
class Images {
  @Field(type => Int)
  height: number;

  @Field(type => Int)
  width: number;

  @Field()
  thumbnail: string;

  @Field()
  source: string;

  @Field()
  title: string;

  @Field()
  image: string;

  @Field()
  url: string;
}


@Resolver()
class ImagesResolver {
  @Query(() => [Images])
  async jjal(
    @Arg('q') q: string,
  ): Promise<Images[]> {
    const images:Images[] = [];
    const query  = "짤 " + q;
    for await (let resultSet of await image_search_generator({ query, moderate: true ,iterations :1})){
        // @ts-ignore
        resultSet.forEach((element: Images) => {
          images.push(element);
        });
    }
    return images;
  }
}

async function main() {
  const schema = await buildSchema({
    resolvers: [ImagesResolver]
  })

  const server = new ApolloServer({ schema, playground: true });

  const { url } = await server.listen(80);
  console.log(`Server is running : ${url}`);
}

main();