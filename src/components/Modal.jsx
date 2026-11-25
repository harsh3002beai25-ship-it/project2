import {AnimatePresence,motion} from "framer-motion";import {X,Star} from "lucide-react";
export function Trailer({movie,onClose}){
 if(!movie)return null; const key=movie.videos?.results?.find(v=>v.site==="YouTube"&&(v.type==="Trailer"||v.type==="Teaser"))?.key;
 return <AnimatePresence><motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[90] grid place-items-center bg-black/85 p-4 backdrop-blur-md" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
  <motion.div initial={{scale:.94,y:15}} animate={{scale:1,y:0}} className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#101011]">
   <button className="close-btn" onClick={onClose}><X/></button>
   <div className="aspect-video bg-black">{key?<iframe className="h-full w-full" src={`https://www.youtube.com/embed/${key}?autoplay=1`} title="Trailer" allow="autoplay; encrypted-media" allowFullScreen/>:<div className="grid h-full place-items-center text-white/40">Trailer unavailable</div>}</div>
   <div className="flex justify-between p-5"><h3 className="font-display text-xl font-bold">{movie.title}</h3><span className="rating"><Star size={13} fill="currentColor"/>{movie.vote_average?.toFixed(1)}</span></div>
  </motion.div>
 </motion.div></AnimatePresence>
}