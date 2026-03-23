export default function YouTubeEmbed({
  videoId,
  title = 'YouTube video',
}: {
  videoId: string
  title?: string
}) {
  return (
    <div className="aspect-video w-full overflow-hidden bg-os-charcoal">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="h-full w-full border-0"
      />
    </div>
  )
}
