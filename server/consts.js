module.exports = {
  error: {
    runMigrations: {
      name: 'runMigrations',
      body: 'Something went wrong executing the db migrations',
    },
    dropAllTables: {
      name: 'dropAllTables',
      body: 'Something went wrong dropping all tables',
    },
    userRegister: {
      name: 'userRegister',
      body: 'An error occurred registering the user.',
    },
    userLogin: {
      name: 'userLogin',
      body: 'An error occurred logging in the user.',
    },
    userNotFound: {
      name: 'userNotFound',
      body: 'user email and/or password is incorrect',
    },
    userAlreadyExists: {
      name: 'userAlreadyExists',
      body: 'An user with that email already exists.',
    },
    invalidEmail: {
      name: 'invalidEmail',
      body: 'That email is invalid.',
    },
    invalidPassword: {
      name: 'invalidPassword',
      body: 'That password is not strong enough.',
    },
  },
};
