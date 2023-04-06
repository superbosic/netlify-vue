const baseAirbnbVariablesRules = require('eslint-config-airbnb-base/rules/variables').rules;
const baseAirbnbStyleRules = require('eslint-config-airbnb-base/rules/style').rules;
const baseAirbnbEs6Rules = require('eslint-config-airbnb-base/rules/es6').rules;

module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-recommended',
        '@vue/airbnb',
        '@vue/typescript/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
        parser: '@typescript-eslint/parser',
    },
    rules: {
        'no-undef': 'off',
        'camelcase': 'off',
        'no-spaced-func': 'off',
        'func-call-spacing': 'off',
        'arrow-body-style': 'off',
        'vuejs-accessibility/click-events-have-key-events': 'off',
        'vuejs-accessibility/no-autofocus': 'off',
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'import/no-unresolved': 'off',
        // TS override
        'lines-between-class-members': 'off',
        'no-use-before-define': [
            'error',
            {
                functions: false,
            },
        ],
        '@typescript-eslint/lines-between-class-members': [
            'error',
            'always',
            {
                exceptAfterSingleLine: true,
            },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': [
            'off',
            {
                ...baseAirbnbVariablesRules['no-unused-vars'][1],
                argsIgnorePattern: '^_|h',
            },
        ],

        'no-plusplus': 'off',
        'implicit-arrow-linebreak': 'off',
        'no-bitwise': 'off',
        'no-shadow': 'off',
        'no-return-assign': 'off',
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true },
        ],
        'import/extensions': 'off',
        //
        'max-len': [
            'error',
            160,
            baseAirbnbStyleRules['max-len'][2],
            baseAirbnbStyleRules['max-len'][3],
        ],
        'array-bracket-newline': [
            'error',
            { multiline: true, minItems: 2 },
        ],
        'array-element-newline': [
            'error',
            { multiline: true, minItems: 2 },
        ],
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsForRegex: ['^mut[A-Z]'],
                ignorePropertyModificationsFor: [
                    'acc',
                    'accumulator',
                    'element',
                    'el',
                    'state',
                    'e',
                ],
            },
        ],
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: [
                    'const',
                    'let',
                    'var',
                ],
                next: '*',
            },
            {
                blankLine: 'any',
                prev: [
                    'const',
                    'let',
                    'var',
                ],
                next: [
                    'const',
                    'let',
                    'var',
                ],
            },
            {
                blankLine: 'always',
                prev: 'expression',
                next: 'multiline-block-like',
            },
        ],
        'prefer-destructuring': [
            'error',
            {
                ...baseAirbnbEs6Rules['prefer-destructuring'][1],
                AssignmentExpression: {
                    array: false,
                    object: false,
                },
            },
        ],
    },
    overrides: [
        {
            files: [
                '*.ts',
                '*.tsx',
            ],
            rules: {
                'no-unused-expressions': 'off',
                'camelcase': 'off',
                'no-useless-constructor': 'off',
                '@typescript-eslint/no-unused-expressions': ['error'],
                '@typescript-eslint/no-useless-constructor': 'error',
                '@typescript-eslint/explicit-member-accessibility': [
                    'error',
                    {
                        accessibility: 'explicit',
                        overrides: {
                            constructors: 'no-public',
                        },
                    },
                ],
                'import/no-unresolved': 'off',
            },
        },
        {
            files: ['*.d.ts'],
            rules: {
                'import/newline-after-import': 0,
                '@typescript-eslint/no-unused-vars': 0,
            },
        },
    ],
};
