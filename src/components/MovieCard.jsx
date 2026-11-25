import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck, Play, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { img } from "../api/tmdb";
export default function MovieCard({ movie, watchlist, toggleWatchlist, onTrailer, index = 0 }) {
    const nav = useNavigate(), saved = watchlist.includes(movie.id);
    return <motion.article initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: index * .035 }} className="movie-card group">
        <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-white/5">
            <img src={img(movie.poster_path)} alt={movie.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
            <div className="absolute left-3 right-3 top-3 flex justify-between opacity-0 transition group-hover:opacity-100">
                <button className="mini-btn" onClick={() => toggleWatchlist(movie.id)}>{saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}</button>
                <button className="mini-btn" onClick={() => onTrailer(movie)}><Play size={15} fill="currentColor" /></button>
            </div>
            <button onClick={() => nav(`/movie/${movie.id}`)} className="absolute inset-0 grid place-items-center opacity-0 transition group-hover:opacity-100"><span className="play-orb"><Play size={19} fill="currentColor" /></span></button>
            <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[11px] text-white/70"><span className="rating"><Star size={11} fill="currentColor" />{movie.vote_average?.toFixed(1)}</span><span>{movie.release_date?.slice(0, 4)}</span></div>
        </div>
        <button onClick={() => nav(`/movie/${movie.id}`)} className="mt-3 block w-full truncate text-left font-semibold">{movie.title}</button>
        <div className="mt-1 truncate text-xs text-white/35">{movie.original_language?.toUpperCase()} · {movie.vote_count?.toLocaleString()} votes</div>
    </motion.article>
}