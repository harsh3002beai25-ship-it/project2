import {useEffect,useState} from "react";
import {Bookmark,Menu,Search,X,Sparkles,LogIn} from "lucide-react";
import {useLocation,useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
export default function Navbar({count}){
 const nav=useNavigate(),loc=useLocation(),{user,logout}=useAuth(); const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false);
 useEffect(()=>{const f=()=>setScrolled(scrollY>25);addEventListener("scroll",f);return()=>removeEventListener("scroll",f)},[]);
 const links=[["/","Home"],["/movies","Movies"],["/trending","Trending"],["/categories","Genres"]];
 return <header className={`fixed z-50 w-full transition-all ${scrolled?"border-b border-white/10 bg-[#070708]/90 backdrop-blur-xl":"bg-gradient-to-b from-black/80 to-transparent"}`}>
  <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
   <button onClick={()=>nav("/")} className="flex items-center gap-3"><span className="logo"><Sparkles size={16}/></span><b className="font-display tracking-[.16em]">CINÉRA</b></button>
   <nav className="hidden gap-7 md:flex">{links.map(([p,l])=><button key={p} onClick={()=>nav(p)} className={loc.pathname===p?"text-white":"text-white/50 hover:text-white"}>{l}</button>)}</nav>
   <div className="flex items-center gap-2">
    <button className="icon-btn" onClick={()=>nav("/search")}><Search size={18}/></button>
    <button className="relative icon-btn" onClick={()=>nav("/watchlist")}><Bookmark size={17}/>{count>0&&<span className="badge">{count}</span>}</button>
    {user?<button className="profile-chip hidden sm:flex" onClick={logout}>{user.name?.slice(0,1).toUpperCase()}</button>:<button className="icon-btn hidden sm:grid" onClick={()=>nav("/auth")}><LogIn size={17}/></button>}
    <button className="icon-btn md:hidden" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
   </div>
  </div>
  {open&&<div className="mobile-menu md:hidden">{links.map(([p,l])=><button key={p} onClick={()=>{nav(p);setOpen(false)}}>{l}</button>)}<button onClick={()=>{nav(user?"/watchlist":"/auth");setOpen(false)}}>{user?"Watchlist":"Login / Sign up"}</button></div>}
 </header>
}