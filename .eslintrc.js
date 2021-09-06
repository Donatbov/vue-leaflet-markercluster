module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-recommended', '@vue/standard'],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: ['src/**/*', 'tests/unit/**/*', 'tests/e2e/**/*'],
      parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
      },
      env: { browser: true }
    },
    {
      files: ['tests/unit/**/*.spec.js'],
      parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
      },
      env: { jest: true },
      globals: {
        mount: false,
        shallowMount: false,
        shallowMountView: false,
        createComponentMocks: false,
        createLocalVue: false,
        createModuleStore: false
      }
    }
  ]
}
