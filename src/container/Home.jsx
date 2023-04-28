import React, {useEffect ,useState, useRef} from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import {Login} from '../components/';
import Sidebar from '../components/Sidebar';
import UserProfile from '../components/UserProfile';
import frame from "../assets/logowhite.png";
import Pins from './Pins'; 
import {Link,Routes,Router, Route} from 'react-router-dom';
import {userQuery} from '../utils/data';
import {client} from '../client';


const Home = () => {
   const [toggelSidebar,setToggelSidebar] = useState
   (false); 
   const [user, setUser] = useState(null);
   const scrollRef=useRef(null);
   const userInfo=localStorage.getItem('user') !=='undefined' ? JSON.parse(localStorage.getItem('user')):localStorage.clear();
  //  console.log(userInfo);
   useEffect(() => {
       const query=userQuery(userInfo?.sub)
      //  console.log(query);
       client.fetch(query)
       .then((data)=>{
        setUser(data[0]);
       })
   }, []);
   useEffect(() => {
      scrollRef.current.scrollTo(0,0)
   }, []);

  return (
    
        <div className='flex bg-blue-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
        <div className='hidden md:flex h-screen flex-initial'> 
          <Sidebar user={user && user}  />
        </div>
        <div className='flex md:hidden flex-row'>
          <div className='p-2 w-full flex flex-row justify-between items-center shadow-md bg-black'>
          <HiMenu fontSize={40} className='cursor-pointer text-white' onClick={()=>{
            setToggelSidebar(true)
          }}/>
          <Link to="/">
            <img src={frame} alt="logo" className='w-28' />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className='w-10 rounded-full' />
          </Link>
          </div>
          {toggelSidebar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
             <div className='absolute w-full flex  justify-end items-center p-2'>
               <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={()=> setToggelSidebar(false)} />
             </div>
             <Sidebar user={user && user} closeToggle={setToggelSidebar}/>
          </div>
        )}

        </div>
        
          <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
              <Routes>
                 <Route path="/user-profile/:userId" element={<UserProfile/>}/>
                 <Route path="/*" element={<Pins user={user && user}/>}/>
              </Routes>
          </div>
       

        </div>
          

  )
}

export default Home
