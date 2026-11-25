const BASE="https://api.themoviedb.org/3";
const TOKEN=import.meta.env.VITE_TMDB_READ_TOKEN;
const headers={accept:"application/json",...(TOKEN?{Authorization:`Bearer ${TOKEN}`}:{})};

async function tmdb(path, params={}){
  if(!TOKEN) throw new Error("TMDB token missing. Add VITE_TMDB_READ_TOKEN to .env");
  const url=new URL(BASE+path);
  Object.entries(params).forEach(([k,v])=>{if(v!==undefined&&v!==null&&v!=="")url.searchParams.set(k,v)});
  const res=await fetch(url,{headers});
  if(!res.ok) throw new Error(`TMDB error ${res.status}`);
  return res.json();
}

export const img=(path,size="w500")=>path?`https://image.tmdb.org/t/p/${size}${path}`:"https://placehold.co/500x750/101011/ffffff?text=CINERA";

export const getTrending=()=>tmdb("/trending/movie/week",{language:"en-US"});
export const getPopular=(page=1)=>tmdb("/movie/popular",{language:"en-US",region:"IN",page});
export const getNowPlaying=(page=1)=>tmdb("/movie/now_playing",{language:"en-US",region:"IN",page});
export const getTopRated=(page=1)=>tmdb("/movie/top_rated",{language:"en-US",page});
export const getGenres=()=>tmdb("/genre/movie/list",{language:"en-US"});
export const discoverMovies=(params={})=>tmdb("/discover/movie",{language:"en-US",include_adult:false,sort_by:"popularity.desc",...params});
export const searchMovies=(query,page=1)=>tmdb("/search/movie",{query,language:"en-US",include_adult:false,region:"IN",page});
export const getMovie=(id)=>tmdb(`/movie/${id}`,{language:"en-US",append_to_response:"credits,videos,similar"});
