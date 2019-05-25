const jwt = require('jsonwebtoken') 

const createToken = (user, secret, expiresIn) => {
    const { username, email } = user
    return jwt.sign({ username, email }, secret, { expiresIn })
}
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
        },
        signupUser: async (root, { username, email, password }, { User }) => {
            const user = await User.findOne({ username })
            if (user) {
                throw new Error('User Exist')
            }
            const newUser = await new User({
                username,
                email,
                password
            }).save()
            return { token: createToken(newUser, process.env.SECRET, '1hr')}
        }
    }
}