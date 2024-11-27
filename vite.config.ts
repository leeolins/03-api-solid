import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import prismaEnvironment from 'vitest-environment-prisma';

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        environmentMatchGlobs: [['./src/http/controllers/**', 'prisma']],
        dir: 'src', // this line
    },
})