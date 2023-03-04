
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000",
  generates: {
    "src/app/generated/graphql.ts": {
      plugins: ["typescript"]
    }
  }
};

export default config;
