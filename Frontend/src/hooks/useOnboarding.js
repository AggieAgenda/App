import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "aa:onboardingSeen";

export function useOnboarding({ userId, onboardingSeen }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  const storageKey = useMemo(
    () => `${STORAGE_KEY}:${userId ?? "guest"}`,
    [userId]
  );

  const steps = useMemo(
    () => [
      {
        title: "Welcome to Aggie Agenda",
        body: "This is your personalized dashboard to manage your academic life. Let's take a quick tour!",
      },
      {
        title: "Syllabus Reader",
        body: "Plan out your classes by uploading your syllabus. We'll extract important dates and assignments for you.",
      },
      {
        title: "Calendar",
        body: "Set up and structure your calendar with all your classes, assignments, and events and export it all to google calendar",
      },
    ],
    []
  );

  useEffect(() => {
    // Only trigger when the backend/user flag says to show onboarding
    if (!onboardingSeen) return;
    const alreadySeen = localStorage.getItem(storageKey);
    if (!alreadySeen) {
      setOpen(true);
      setStep(0);
    }
  }, [onboardingSeen, storageKey]);

  const markDone = () => {
    localStorage.setItem(storageKey, "true");
    setOpen(false);
    setStep(0);
  };

  return {
    open,
    step,
    steps,
    next: () => setStep((s) => Math.min(s + 1, steps.length - 1)),
    back: () => setStep((s) => Math.max(s - 1, 0)),
    skip: markDone,
    done: markDone,
    show: () => setOpen(true),
  };
}
