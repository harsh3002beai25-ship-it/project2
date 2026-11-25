import {useEffect,useState} from "react";
export function useFetch(fn,deps=[]){
  const [state,setState]=useState({data:null,loading:true,error:null});
  useEffect(()=>{
    let alive=true;
    setState({data:null,loading:true,error:null});
    fn().then(data=>alive&&setState({data,loading:false,error:null}))
      .catch(error=>alive&&setState({data:null,loading:false,error}));
    return()=>{alive=false};
  },deps);
  return state;
}