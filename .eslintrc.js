module.exports = {
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/airbnb'],
    parserOptions: {
        parser: '@babel/eslint-parser',
    },
    rules: {
        'css-propertyvalueexpected': false,
    },
};
