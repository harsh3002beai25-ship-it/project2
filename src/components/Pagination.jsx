import {ChevronLeft,ChevronRight} from "lucide-react";
export default function Pagination({page,total,onChange}){return <div className="mt-12 flex items-center justify-center gap-3">
 <button disabled={page<=1} className="page-btn" onClick={()=>onChange(page-1)}><ChevronLeft/></button>
 <span className="rounded-full border border-white/10 px-5 py-2 text-sm text-white/60">Page {page} of {Math.min(total,500)}</span>
 <button disabled={page>=Math.min(total,500)} className="page-btn" onClick={()=>onChange(page+1)}><ChevronRight/></button>
</div>}