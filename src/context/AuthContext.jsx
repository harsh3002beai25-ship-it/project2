import {createContext,useContext,useEffect,useState} from "react";
const AuthContext=createContext(null);
export function AuthProvider({children}){
  const [user,setUser]=useState(()=>JSON.parse(localStorage.getItem("cinera-user")||"null"));
  useEffect(()=>user?localStorage.setItem("cinera-user",JSON.stringify(user)):localStorage.removeItem("cinera-user"),[user]);
  const signup=(name,email,password)=>{
    const users=JSON.parse(localStorage.getItem("cinera-users")||"[]");
    if(users.some(u=>u.email===email)) throw new Error("An account with this email already exists.");
    const u={id:crypto.randomUUID(),name,email,password};
    localStorage.setItem("cinera-users",JSON.stringify([...users,u]));
    setUser({id:u.id,name:u.name,email:u.email});
  };
  const login=(email,password)=>{
    const users=JSON.parse(localStorage.getItem("cinera-users")||"[]");
    const u=users.find(x=>x.email===email&&x.password===password);
    if(!u) throw new Error("Invalid email or password.");
    setUser({id:u.id,name:u.name,email:u.email});
  };
  const logout=()=>setUser(null);
  return <AuthContext.Provider value={{user,signup,login,logout}}>{children}</AuthContext.Provider>;
}
export const useAuth=()=>useContext(AuthContext);
