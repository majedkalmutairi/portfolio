"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export function ResumeButton({ className }: { className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);

  if (site.resume) {
    return (
      <Button href={site.resume} arrow="external" className={className}>
        View Resume
      </Button>
    );
  }

  if (!site.resumeNote) return null;

  return (
    <>
      <Button className={className} onClick={() => dialog.current?.showModal()}>
        View Resume
      </Button>
      <dialog
        ref={dialog}
        aria-labelledby="resume-note"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
        className="m-auto w-[min(90vw,24rem)] rounded-xl border border-line bg-bg p-6 text-fg shadow-lg backdrop:bg-black/50"
      >
        <p id="resume-note" className="text-body-lg">
          {site.resumeNote}
        </p>
        <div className="mt-5 flex justify-end">
          <Button arrow="none" onClick={() => dialog.current?.close()}>
            Close
          </Button>
        </div>
      </dialog>
    </>
  );
}
