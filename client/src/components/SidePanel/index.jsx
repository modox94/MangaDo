import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Draggable, { DraggableCore } from 'react-draggable';
import styles from './style.module.css'
const SidePanel = () => {


  const [controlledPosition, setControlledPosition] = useState()


  const  onControlledDragStop = (e, position) => {
    onControlledDrag(e, position);
    // console.log(controlledPosition); 
  };

  const  onControlledDrag = (e, position) => {
    const {x, y} = position;
   setControlledPosition({x, y});
 

  };

  return (



    <div className={styles.sideContainer}>

     
      <div className={styles.task}>
        <p>Some text</p>
        <Draggable   onStop={onControlledDragStop} position={controlledPosition}>
          <div className={styles.markTranslate}>
            <div>П</div>
          </div>
        </Draggable>

       

        
      </div>
      <div className={styles.task}>
        <p>Some text</p>
        <Draggable   onStop={onControlledDragStop} position={controlledPosition}>
          <div className={styles.markTranslate}>
            <div>П</div>
          </div>
        </Draggable>

       

        
      </div>


    </div>

  )
}
export default SidePanel



