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
    incorrectCredentials: {
      name: 'incorrectCredentials',
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
    passwordRequired: {
      name: 'passwordRequired',
      body: 'The password is required.',
    },
    fieldRequired: {
      name: 'fieldRequired',
      body: 'Field required: ',
    },
    unauthorized: {
      name: 'unauthorized',
      body: 'You are not authorized.',
    },
    invalidToken: {
      name: 'invalidToken',
      body: 'The provided auth token is not valid.',
    },
    retrieveUser: {
      name: 'retrieveUser',
      body: 'Unable to retrieve the specified user.',
    },
    invalidBudget: {
      name: 'invalidBudget',
      body: 'Invalid value for budget.',
    },
    unableToUpdateBudget: {
      name: 'unableToUpdateBudget',
      body: 'Unable to update budget.',
    },
  },
  success: {
    register: 'User registered successfully.',
    updateBudget: 'Budget set successfully.',
  },
};
