const initialState = () => {
  // const user = JSON.parse(localStorage.getItem('user')) || {
  //   name: 'vasya67',
  //   role: 'admin',
  // };

  const user = {
    name: 'vasya',
    role: 'worker',
  };

  const initialValue = {
    user,
    url: '',
    marks: [],
    layers: [],
  };

  return initialValue;
};

export default initialState;
