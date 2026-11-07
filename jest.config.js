module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx|mjs|cjs)$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!.*\\.m?js$)"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/.rollup.cache/"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/src/tests/styleMock.cjs",
    "\\.(gif|ttf|eot|svg|png|jpg|jpeg)$": "<rootDir>/src/tests/fileMock.cjs",
  },
};
