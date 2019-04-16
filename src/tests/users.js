export const getUsers = () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  fetch(url)
    .then(data => data.json())
    .then(console.log)
    .catch(console.error);
};