
export const Square = ({idx, value, onClick, className, win}) => {
 
 const win2 = win.includes(idx, 0) // Определение какие кнопки нужно подсветить при победе

 const className1 = win2  ? 'square win' : ''
 const className2 = `${className} ${className1}`
  return (
    <button
      className= {` ${className2} `}  
      onClick={
        () => {      
      onClick();}
      }
    >
      {value}
    </button>
  );
};
