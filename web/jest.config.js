module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
    'ts-jest',
    {
      diagnostics: {
        ignoreCodes: [1343]
      },
      astTransformers: {
        before: [
          {
            path: 'node_modules/ts-jest-mock-import-meta',
            options: {
              metaObjectReplacement: {
                env: {
                    VITE_APP_API_ENTRYPOINT: 'http://localhost:8080/api',
                    VITE_APP_ENV: 'dev',
                    VITE_APP_VERSION: '1.0.0'
                }
              }
            }
          }
        ]
      }
    }]
  },
  moduleNameMapper: {
    '^@/components(.*)$': '<rootDir>/src/components$1',
    '^@/pages(.*)$': '<rootDir>/src/pages$1',
    '^@/services(.*)$': '<rootDir>/src/services$1',
    '^@/lib/utils(.*)$': '<rootDir>/src/lib/utils$1',
    '^@/hooks(.*)$': '<rootDir>/src/hooks$1',
  },
};
