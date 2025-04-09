import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate(); // Initialize the navigate function
 
  return (
    <header
      className="shadow-md  h-16 text-lg font-bold w-full px-6 fixed top-0 left-0 flex items-center justify-between" style={{zIndex:'2', backgroundColor:'#547980', color:'white'}}
    >
      
      <span className="text-xl mx-auto" >DASE Dashboard</span> 
    </header>
  );
};
 
export default Header;