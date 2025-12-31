export default function PostLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-neutral-200 border-t-accent-500 rounded-full animate-spin" />
        <p className="text-body-md text-neutral-600">Loading article...</p>
      </div>
    </div>
  )
}
