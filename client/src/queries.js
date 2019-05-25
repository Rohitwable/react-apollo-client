import gql  from 'graphql-tag'

export const GET_ALL_RECIPES = gql`
   query{
  getAllRecipes{
    _id
    name
    category
    description
    instructions
    createdDate
    likes
    username
  }
}
`