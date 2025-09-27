import { ProgressiveLoader } from "@/components/ProgressiveLoader";

export default function Loading() {
  // This component will be automatically streamed and swapped in by Next.js
  // while the page content is being generated on the server.
  return (
    <div className="flex items-center justify-center h-full">
      <ProgressiveLoader text="Loading Games..." />
    </div>
  );
}
