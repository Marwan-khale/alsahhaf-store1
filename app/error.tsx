"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-sm text-muted">حدث خطأ غير متوقع.</p>
      <button
        onClick={reset}
        className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white"
      >
        إعادة المحاولة
      </button>
    </div>
  );
}
