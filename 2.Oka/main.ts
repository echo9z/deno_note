import { Application } from "./deps.ts";

const app = new Application();

app.use((ctx: any) => {
  // console.log(ctx);
  ctx.response.body = [
    { id: 1, name: 'tom1', age: 15 },
    { id: 2, name: 'tom2', age: 14 },
    { id: 3, name: 'tom3', age: 16 },
  ]
});

await app.listen({ port: 8080 });