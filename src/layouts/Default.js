import './Default.css';
function Default({ children }) {
   return (
      <div className="a-wrapper">
         <div className="a-content" style={{marginLeft:"250px"}}>
            <div>{children}</div>
         </div>
      </div>
   );
}

export default Default;
