exports.resolvers = {
    Query: {
        getAllRecipes: async (root, args, { Recipe }) => {
            const allRecipes = await Recipe.find()
            return allRecipes
        }
    },
    Mutation: {
        addRecipe: async (root, args, { Recipe }) => {
            const newRecipe = await new Recipe({
                name: args.name,
                category: args.category,
                description: args.description,
                instructions: args.instructions,
                username: args.username
            }).save()
            return newRecipe
        }
    }
}