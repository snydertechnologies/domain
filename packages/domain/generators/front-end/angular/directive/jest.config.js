module.exports = {
  displayName: 'domain-front-end-angular-directive',
  preset: '../../../../../../jest.preset.js',
  coverageDirectory: '../../../../../../coverage/packages/domain/generators/front-end/angular/directive',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  testEnvironment: 'node',
};
