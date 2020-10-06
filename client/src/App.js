import React, { useState } from 'react';
import m116o from './images/116.jpg';
import m116t from './images/116.png';
import k003o from './images/003.jpg';
import k003t from './images/003.png';

function App() {
  const [img1, setImg1] = useState(false);
  const [img2, setImg2] = useState(false);

  return (
    <div className='container'>
      <div className='form-check'>
        <input
          onChange={(event) => setImg1(!event.target.checked)}
          className='form-check-input'
          type='checkbox'
          defaultChecked
        />
        <label className='form-check-label'>Image 1</label>
      </div>
      <div className='form-check'>
        <input
          onChange={(event) => setImg2(!event.target.checked)}
          className='form-check-input'
          type='checkbox'
          defaultChecked
        />
        <label className='form-check-label'>Image 2</label>
      </div>

      <div style={{ position: 'relative' }}>
        <img
          src={m116o}
          style={{ position: 'absolute' }}
          hidden={img1}
          alt='pic'
        ></img>
        <img
          src={m116t}
          style={{ position: 'absolute' }}
          hidden={img2}
          alt='pic'
        ></img>
        <img
          src={process.env.PUBLIC_URL + '/imges/113-5.png'}
          style={{ position: 'absolute' }}
          alt='pic'
        ></img>
      </div>
    </div>
  );

  // return (
  //   <div className='container-fluid'>
  //     <div style={{ position: 'relative' }}>
  //       <img
  //         src={m116o}
  //         style={{ position: 'absolute', display: img1 }}
  //         alt='pic'
  //       ></img>
  //       <img
  //         src={m116t}
  //         style={{ position: 'absolute', display: img2 }}
  //         alt='pic'
  //       ></img>
  //     </div>

  //     <div className='form-check'>
  //       <input className='form-check-input' type='checkbox' value='' />
  //       <label className='form-check-label'>Default checkbox</label>
  //     </div>
  //     <div className='form-check'>
  //       <input className='form-check-input' type='checkbox' value='' />
  //       <label className='form-check-label'>Disabled checkbox</label>
  //     </div>
  //   </div>
  // );
}

export default App;

/*
<div class="position-static">...</div>
<div class="position-relative">...</div>
<div class="position-absolute">...</div>
<div class="position-fixed">...</div>
<div class="position-sticky">...</div>
*/
