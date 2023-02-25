import { rest } from "msw";

export const handlers = [
  rest.get("api/users/user", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: {
          id: "애플",
          password: "",
          nickname: "애플2",
          type: "0",
        },
        token: "qqqqq",
      })
    );
  }),
];
