export default {
    name: {
        trim: true,
        notEmpty: {
            errorMessage: 'Please enter a category name'
        },

        isLength: {
            options: { min: 5 },
            errorMessage: 'The category name must have at least 5 characters!'
        },
        escape: true
    }
}