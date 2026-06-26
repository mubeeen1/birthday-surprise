import { easeOut, motion } from "framer-motion";
import * as React from "react";

export function FlipCard({ data }) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;

  const handleClick = () => {
    if (isTouchDevice) setIsFlipped(!isFlipped);
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) setIsFlipped(false);
  };

  const cardVariants = {
    front: { rotateY: 0, transition: { duration: 0.5, ease: easeOut } },
    back: { rotateY: 180, transition: { duration: 0.5, ease: easeOut } },
  };

  return (
    <div
      className="mt-2 relative w-40 h-60 md:w-60 md:h-80 cursor-pointer mx-auto"
      style={{ perspective: "1000px" }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* FRONT: Profile */}
      <motion.div
        className="absolute inset-0 rounded-md border-2 border-foreground/20 px-4 py-6 flex flex-col items-center justify-center bg-gradient-to-br from-muted via-background to-muted text-center"
        animate={isFlipped ? "back" : "front"}
        variants={cardVariants}
        style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
      >
        {data.image ? (
          <img
            src={data.image}
            alt={data.name}
            className="size-20 md:size-24 rounded-full object-cover mb-4 border-2"
          />
        ) : (
          <div className="size-20 md:size-24 rounded-full mb-4 border-2 border-foreground/20 flex items-center justify-center bg-muted text-3xl font-display text-foreground">
            {data.name?.[0] ?? "✦"}
          </div>
        )}
        <h2 className="text-lg font-bold text-foreground">{data.name}</h2>
        {data.username && (
          <p className="text-sm text-muted-foreground">@{data.username}</p>
        )}
      </motion.div>

      {/* BACK: Bio + Stats + Socials */}
      <motion.div
        className="absolute inset-0 rounded-md border-2 border-foreground/20 px-4 py-6 flex flex-col justify-between items-center gap-y-4 bg-gradient-to-tr from-muted via-background to-muted"
        initial={{ rotateY: 180 }}
        animate={isFlipped ? "front" : "back"}
        variants={cardVariants}
        style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden", rotateY: 180 }}
      >
        <p className="text-xs md:text-sm text-muted-foreground text-center">
          {data.bio}
        </p>

        {(data.stats?.following > 0 || data.stats?.followers > 0) && (
          <div className="px-6 flex items-center justify-between w-full">
            <div>
              <p className="text-base font-bold">{data.stats.following}</p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
            <div>
              <p className="text-base font-bold">{data.stats.followers}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            {data.stats?.posts > 0 && (
              <div>
                <p className="text-base font-bold">{data.stats.posts}</p>
                <p className="text-xs text-muted-foreground">Posts</p>
              </div>
            )}
          </div>
        )}

        {/* Social links if provided */}
        {data.socialLinks && Object.values(data.socialLinks).some(Boolean) && (
          <div className="flex items-center justify-center gap-4">
            {data.socialLinks.linkedin && (
              <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform text-foreground">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            )}
            {data.socialLinks.github && (
              <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform text-foreground">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </a>
            )}
            {data.socialLinks.twitter && (
              <a href={data.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform text-foreground">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
