// jest.config.ts
import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  automock: true,
  testMatch: ["<rootDir>/e2e/**/*.spec.{ts,tsx,js,jsx}"],
  moduleDirectories: ['node_modules', 'src'],
}
export default config