### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
Generating an array of promises and then using Promise.all to send them all

- What is a Promise?
An object that is guaranteed to provide information in the future

- What are the differences between an async function and a regular function?
an async function is sent to the browser and completed once the promise is resolved. A regular function is completed immediately

- What is the difference between Node.js and Express.js?
node sits on top of express in order to more easily design api's 

- What is the error-first callback pattern?
an asynchronous function that takes an error as the first parameter and the result of a request as the second. If an error occurs then the error will be used otherwise the data will be used

- What is middleware?
software that runs between a request and response.

- What does the `next` function do?
it allows the middleware to finish and for the response to be sent to the endpoint

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}

// correct output

async function getUsers() {
  promises = []
  users = [elie, joelburton, mmmaaatttttt]

  for (let i = 0; i < users.length; i++){
    promises.push(
      axios.get(`https://api.github.com/users/{users}`));
  }

  return Promise.all(promises).then(
    arr => (arr.forEach(res => res.map(r => {
      r.data.name: r.data
    }))))
    .catch(err => console.log(err))
}
