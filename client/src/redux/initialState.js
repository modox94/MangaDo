const initialState = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {
    name: '',
    role: '',
  };

  const initialValue = {
    user,
    url: '',
    marks: [],
    layers: [],
    errors: {},
  };

  return initialValue;
};

export default initialState;
