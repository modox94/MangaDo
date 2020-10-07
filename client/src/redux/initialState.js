
const initialState = () => {
  const initialValue = {
   
  }


  return JSON.parse(localStorage.getItem('redux')) || initialValue
}



export default initialState
