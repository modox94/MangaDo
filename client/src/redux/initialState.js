const initialState = () => {
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'vasya67' };

  const initialValue = {
    user,
    url: '',
    marks: [],
    layers: [],
  };

  return initialValue;
};

export default initialState;
