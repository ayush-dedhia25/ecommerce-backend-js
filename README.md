# Ecommerce Backend JS

This is a backend api written in node.js using express.js framework. Note this api is still in development and may not be stable.

### Authors

-  Ayush Dedhia <ayushdedhia25@gmail.com>

```
ecommerce-backend
├─ .gitignore
├─ .prettierrc
├─ jsconfig.json
├─ package.json
├─ README.md
└─ src
   ├─ app.js
   ├─ controllers
   │  ├─ auth.controller.js
   │  └─ user.controller.js
   ├─ error-handlers
   │  ├─ global.handler.js
   │  ├─ index.js
   │  └─ jwt.handler.js
   ├─ index.js
   ├─ lib
   │  ├─ ApiError.js
   │  ├─ ApiResponse.js
   │  ├─ asyncHandler.js
   │  ├─ config.js
   │  ├─ connect.js
   │  ├─ index.js
   │  └─ jwt.js
   ├─ middlewares
   │  ├─ auth.middleware.js
   │  ├─ index.js
   │  └─ validateRequestData.middleware.js
   ├─ models
   │  └─ User.model.js
   ├─ utils
   │  ├─ index.js
   │  └─ zod.util.js
   └─ validators
      ├─ auth.validator.js
      └─ user.validator.js
```
