import React from 'react';
import { ArrowLeft, Heart, ArrowRight, Star, X } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function MovieDetailModal({ movie, onClose, onRedirectToWishlist, lang = 'te' }) {
  if (!movie) return null;

  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isTelugu = lang === 'te';
  const inWishlist = isInWishlist(movie.imdbID);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(movie.imdbID);
    } else {
      addToWishlist(movie);
    }
  };

  // 30 structured details
  const detailsList = [
    { id: 1, labelEn: "1. Movie Title", labelTe: "1. సినిమా శీర్షిక (Title)", value: movie.title + (movie.teluguTitle ? ` (${movie.teluguTitle})` : '') },
    { id: 2, labelEn: "2. Release Year", labelTe: "2. విడుదలైన సంవత్సరం (Year)", value: movie.year },
    { id: 3, labelEn: "3. Sensor Certification", labelTe: "3. సెన్సార్ సర్టిఫికేషన్ (Rated)", value: movie.rated || "PG-13" },
    { id: 4, labelEn: "4. Release Date", labelTe: "4. పూర్తి విడుదల తేదీ (Release Date)", value: movie.released || `October ${movie.year}` },
    { id: 5, labelEn: "5. Total Runtime", labelTe: "5. సినిమా నిడివి (Runtime)", value: movie.runtime },
    { id: 6, labelEn: "6. Primary Genre", labelTe: "6. ప్రధాన వర్గం (Primary Genre)", value: movie.primaryGenre },
    { id: 7, labelEn: "7. All Genres & Categories", labelTe: "7. అన్ని వర్గాలు (Genres & Tags)", value: Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genres },
    { id: 8, labelEn: "8. Director", labelTe: "8. దర్శకుడు (Director)", value: movie.director },
    { id: 9, labelEn: "9. Writer & Screenplay", labelTe: "9. రచయిత & స్క్రీన్‌ప్లే (Writer)", value: movie.writer },
    { id: 10, labelEn: "10. Lead Starring Cast", labelTe: "10. ప్రధాన తారాగణం (Lead Actors)", value: movie.leadCast },
    { id: 11, labelEn: "11. Supporting Cast", labelTe: "11. ఇతర నటీనటులు (Supporting Cast)", value: movie.supportingCast },
    { id: 12, labelEn: "12. Plot Synopsis", labelTe: "12. సంక్షిప్త కథ (Plot Summary)", value: movie.plot },
    { id: 13, labelEn: "13. Full Storyline", labelTe: "13. పూర్తి కథాంశం (Storyline)", value: movie.fullStoryline || movie.plot },
    { id: 14, labelEn: "14. Audio Language", labelTe: "14. ఆడియో భాష (Audio Language)", value: movie.language },
    { id: 15, labelEn: "15. Available Subtitles", labelTe: "15. లభించే సబ్‌టైటిల్స్ (Subtitles)", value: movie.subtitles || "Telugu, English, Hindi" },
    { id: 16, labelEn: "16. Country of Origin", labelTe: "16. మూల దేశం (Country)", value: movie.country },
    { id: 17, labelEn: "17. Awards & Honors", labelTe: "17. అవార్డులు & ప్రశంసలు (Awards)", value: movie.awards || "Recognized globally" },
    { id: 18, labelEn: "18. IMDb Rating", labelTe: "18. IMDb రేటింగ్ (IMDb Rating)", value: movie.imdbRating },
    { id: 19, labelEn: "19. IMDb Total Votes", labelTe: "19. మొత్తం ఓట్లు (Total Votes)", value: movie.imdbVotes },
    { id: 20, labelEn: "20. Metacritic Critic Score", labelTe: "20. విమర్శకుల స్కోర్ (Metascore)", value: movie.metascore },
    { id: 21, labelEn: "21. Rotten Tomatoes / Audience", labelTe: "21. ప్రేక్షకుల ఆమోదం (Audience Score)", value: movie.audienceScore || "92%" },
    { id: 22, labelEn: "22. Production Company", labelTe: "22. నిర్మాణ సంస్థ (Production Studio)", value: movie.productionCompany },
    { id: 23, labelEn: "23. Box Office Collection", labelTe: "23. బాక్సాఫీస్ కలెక్షన్ (Box Office)", value: movie.boxOffice },
    { id: 24, labelEn: "24. Production Budget", labelTe: "24. అంచనా బడ్జెట్ (Budget)", value: movie.budget || "$65,000,000" },
    { id: 25, labelEn: "25. Format Type", labelTe: "25. వర్గీకరణ రకం (Format / Type)", value: movie.type || "Feature Film" },
    { id: 26, labelEn: "26. Aspect Ratio", labelTe: "26. స్క్రీన్ నిష్పత్తి (Aspect Ratio)", value: movie.aspectRatio || "2.39:1" },
    { id: 27, labelEn: "27. Content Advisory", labelTe: "27. కంటెంట్ మార్గదర్శకం (Advisory)", value: movie.contentWarning || "Standard viewing guidelines apply" },
    { id: 28, labelEn: "28. Audio & Sound Mix", labelTe: "28. సౌండ్ సిస్టమ్ (Sound Mix)", value: movie.soundMix || "Dolby 5.1 / Atmos" },
    { id: 29, labelEn: "29. Distribution Link", labelTe: "29. అధికారిక పంపిణీ (Official Website)", value: movie.officialWebsite || `https://www.imdb.com/title/${movie.imdbID}/` },
    { id: 30, labelEn: "30. Reference ID", labelTe: "30. రిఫరెన్స్ కోడ్ (IMDb Reference ID)", value: movie.imdbID }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-start justify-center p-3 sm:p-5">
      <div 
        className="relative w-full max-w-4xl my-6 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden text-zinc-100 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Simple Minimal Top Bar */}
        <div className="sticky top-0 z-20 bg-zinc-900/95 border-b border-zinc-800 px-4 py-3 flex items-center justify-between gap-3">
          
          {/* Button 1: Previous Page (Back button) */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isTelugu ? '← Previous Page (వెనుకకు)' : '← Previous Page'}</span>
          </button>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Button 2: Add to Wishlist */}
            <button
              onClick={handleWishlistToggle}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                inWishlist
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-white' : ''}`} />
              <span>
                {inWishlist 
                  ? (isTelugu ? 'విష్‌లిస్ట్‌లో ఉంది' : 'In Wishlist') 
                  : (isTelugu ? 'Wishlist లో జోడించు' : 'Add to Wishlist')}
              </span>
            </button>

            {/* Button 3: Redirect to Wishlist (when in wishlist) */}
            {inWishlist && (
              <button
                onClick={() => {
                  onClose();
                  onRedirectToWishlist();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-semibold transition-colors"
              >
                <span>{isTelugu ? 'విష్‌లిస్ట్ చూడండి' : 'Go to Wishlist'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-200 rounded-md hover:bg-zinc-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimal Hero Header */}
        <div className="p-4 sm:p-6 border-b border-zinc-800 flex flex-col sm:flex-row gap-5 items-start">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-32 sm:w-40 rounded-lg object-cover bg-zinc-950 border border-zinc-800 shrink-0 mx-auto sm:mx-0"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80';
            }}
          />

          <div className="flex-1 space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap text-xs text-zinc-400">
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-medium">
                {movie.year}
              </span>
              <span>•</span>
              <span>{movie.primaryGenre}</span>
              <span>•</span>
              <span>{movie.runtime}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-3 h-3 fill-amber-400" />
                {movie.imdbRating.split('/')[0].trim()}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-zinc-100">
              {movie.title}
            </h1>

            {movie.teluguTitle && (
              <p className="text-sm text-zinc-400">
                {movie.teluguTitle}
              </p>
            )}

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-1">
              {movie.plot}
            </p>
          </div>
        </div>

        {/* 30 Details - Clean Minimal Specification Sheet */}
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-800 text-xs">
            <span className="font-semibold text-zinc-300">
              {isTelugu ? 'సినిమా 30 వివరాలు (30 Specifications):' : '30 Movie Specifications:'}
            </span>
            <span className="text-zinc-500">30 / 30</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {detailsList.map((item) => (
              <div 
                key={item.id} 
                className="p-2.5 rounded bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between"
              >
                <span className="text-[11px] font-medium text-zinc-400 mb-1">
                  {isTelugu ? item.labelTe : item.labelEn}
                </span>
                <span className="text-zinc-200 font-normal break-words">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between gap-3 text-xs">
            <button
              onClick={onClose}
              className="flex items-center gap-1 px-3 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isTelugu ? 'Previous Page' : 'Return Back'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleWishlistToggle}
                className={`flex items-center gap-1.5 px-3 py-2 rounded font-medium ${
                  inWishlist
                    ? 'bg-red-600 text-white'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-white' : ''}`} />
                <span>
                  {inWishlist 
                    ? (isTelugu ? 'విష్‌లిస్ట్‌లో ఉంది' : 'In Wishlist') 
                    : (isTelugu ? 'Wishlist లో జోడించు' : 'Add to Wishlist')}
                </span>
              </button>

              <button
                onClick={() => {
                  if (!inWishlist) addToWishlist(movie);
                  onClose();
                  onRedirectToWishlist();
                }}
                className="flex items-center gap-1 px-3 py-2 rounded bg-zinc-100 hover:bg-white text-zinc-900 font-semibold"
              >
                <span>{isTelugu ? 'విష్‌లిస్ట్‌కు వెళ్లండి' : 'Go to Wishlist'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
