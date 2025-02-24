"use client";
import { useHotkeys } from "react-hotkeys-hook";
import { useParams, usePathname, useRouter } from "next/navigation";
import dayjs from "dayjs";

export default function Hotkeys() {
  const router = useRouter();
  const params = useParams();
  const path = usePathname();

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const numberRegex = /^(\d+)$/;

  // Calculate all date values upfront
  const isDatePath = params.slug && dateRegex.test(params.slug);
  const nextDate = isDatePath ? dayjs(params.slug).add(1, "day").format("YYYY-MM-DD") : null;
  const prevDate = isDatePath ? dayjs(params.slug).subtract(1, "day").format("YYYY-MM-DD") : null;
  const nextWeekDate = isDatePath ? dayjs(params.slug).add(7, "day").format("YYYY-MM-DD") : null;
  const prevWeekDate = isDatePath ? dayjs(params.slug).subtract(7, "day").format("YYYY-MM-DD") : null;

  // Parse path parts outside of conditionals
  const pathParts = path.split("/").filter(Boolean);
  const isNextPath = pathParts.length === 2 && pathParts[0] === "next" && numberRegex.test(pathParts[1]);
  const isPrevPath = pathParts.length === 2 && pathParts[0] === "prev" && numberRegex.test(pathParts[1]);
  const currentNumber = isNextPath || isPrevPath ? parseInt(pathParts[1], 10) : 0;
  const isNextOne = isNextPath && currentNumber === 1;
  const isPrevOne = isPrevPath && currentNumber === 1;

  // Define all navigation functions upfront
  const goHome = () => router.push("/");
  const goNext = () => (isDatePath ? router.push(`/${nextDate}`) : null);
  const goPrev = () => (isDatePath ? router.push(`/${prevDate}`) : null);
  const goNextWeek = () => (isDatePath ? router.push(`/${nextWeekDate}`) : null);
  const goPrevWeek = () => (isDatePath ? router.push(`/${prevWeekDate}`) : null);

  const focusTiptapEditor = () => {
    // Tiptap editor typically has a contenteditable div inside a wrapper
    const tiptapEditor = document.querySelector('.ProseMirror');
    if (tiptapEditor) {
        // Create a selection at the end of the content
        const selection = window.getSelection();
        const range = document.createRange();
        
        // Place the cursor at the end of the editor
        range.selectNodeContents(tiptapEditor);
        range.collapse(false); // false means collapse to the end
        
        selection.removeAllRanges();
        selection.addRange(range);
        
        tiptapEditor.focus();
    };
    }


  const goToNextOne = () => router.push("/next/1");
  const goToPrevOne = () => router.push("/prev/1");

  const goToNextHigher = () => router.push(`/next/${currentNumber + 1}`);
  const goToNextLower = () => router.push(`/next/${currentNumber - 1}`);

  const goToPrevHigher = () => router.push(`/prev/${currentNumber + 1}`);
  const goToPrevLower = () => router.push(`/prev/${currentNumber - 1}`);

  // Now call all hooks unconditionally
  useHotkeys(
    "b",
    () => {
      if (isDatePath) goHome();
    },
    { enableOnFormTags: true }
  );

  useHotkeys(
    "k",
    () => {
      if (isDatePath) goNext();
    },
    { enableOnFormTags: true }
  );

  useHotkeys(
    "j",
    () => {
      if (isDatePath) goPrev();
    },
    { enableOnFormTags: true }
  );

  useHotkeys(
    "l",
    () => {
      if (isDatePath) {
        goNextWeek();
      } else if (path === "/") {
        goToNextOne();
      } else if (isNextOne) {
        goToNextHigher();
      } else if (isNextPath) {
        goToNextHigher();
      } else if (isPrevOne) {
        goHome();
      } else if (isPrevPath) {
        goToPrevLower();
      }
    },
    { enableOnFormTags: true }
  );

  useHotkeys(
    "h",
    () => {
      if (isDatePath) {
        goPrevWeek();
      } else if (path === "/") {
        goToPrevOne();
      } else if (isNextOne) {
        goHome();
      } else if (isNextPath) {
        goToNextLower();
      } else if (isPrevOne) {
        goToPrevHigher();
      } else if (isPrevPath) {
        goToPrevHigher();
      }
    },
    { enableOnFormTags: true }
  );

  // Add "i" hotkey to focus on Tiptap editor for date pages
  useHotkeys('i', (event) => {
    if (isDatePath) {
      // Prevent the "i" character from being inserted
      event.preventDefault();
      focusTiptapEditor();
    }
  }, { enableOnFormTags: true });

    // Add "o" hotkey to unfocus the Tiptap editor for date pages
    // useHotkeys('o', (event) => {
    //     console.log("PRESSED");
        
    //     if (isDatePath) {
    //       // Prevent the "o" character from being inserted
    //       event.preventDefault();
    //       blurTiptapEditor();
    //     }
    //   }, { enableOnFormTags: true });

  return null;
}

// 'use client';

// import { useHotkeys } from 'react-hotkeys-hook';
// import { useParams, usePathname, useRouter } from 'next/navigation';
// import dayjs from 'dayjs';

// export default function Hotkeys() {
//     const router = useRouter();
//     const params = useParams()
//     const path = usePathname()

//     const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
//     const numberRegex = /^(\d+)$/;

//     const nextDate = dayjs(params.slug).add(1, 'day').format("YYYY-MM-DD");
//     const prevDate = dayjs(params.slug).subtract(1, 'day').format("YYYY-MM-DD");
//     const nextWeekDate = dayjs(params.slug).add(7, 'day').format("YYYY-MM-DD");
//     const prevWeekDate = dayjs(params.slug).subtract(7, 'day').format("YYYY-MM-DD");

//     useHotkeys('b', () => {if (dateRegex.test(params.slug)) router.push('/')}, { enableOnFormTags: true });

//     useHotkeys('k', () => {if (dateRegex.test(params.slug)) router.push(`/${nextDate}`)}, { enableOnFormTags: true });
//     useHotkeys('j', () => {if (dateRegex.test(params.slug)) router.push(`/${prevDate}`)}, { enableOnFormTags: true });
//     useHotkeys('l', () => {if (dateRegex.test(params.slug)) router.push(`/${nextWeekDate}`)}, { enableOnFormTags: true });
//     useHotkeys('h', () => {if (dateRegex.test(params.slug)) router.push(`/${prevWeekDate}`)}, { enableOnFormTags: true });

//     useHotkeys('l', () => {if (path === "/") router.push(`/next/1`)}, { enableOnFormTags: true });
//     useHotkeys('h', () => {if (path === "/") router.push(`/prev/1`)}, { enableOnFormTags: true });

//     const pathParts = path.split('/').filter(Boolean); // Remove empty parts
//     if (pathParts.length === 2 && numberRegex.test(pathParts[1])) {
//         const currentNumber = parseInt(pathParts[1], 10);
//         if (pathParts[0] === 'next') {
//             if(currentNumber === 1){
//                 useHotkeys('l', () => router.push(`/next/${currentNumber + 1}`), { enableOnFormTags: true });
//                 useHotkeys('h', () => router.push("/"), { enableOnFormTags: true });
//             }else {
//                 useHotkeys('l', () => router.push(`/next/${currentNumber + 1}`), { enableOnFormTags: true });
//                 useHotkeys('h', () => router.push(`/next/${currentNumber - 1}`), { enableOnFormTags: true });
//             }
//         } else if (pathParts[0] === 'prev') {
//             if(currentNumber === 1){
//                 useHotkeys('l', () => router.push(`/`), { enableOnFormTags: true });
//                 useHotkeys('h', () => router.push(`/prev/${currentNumber + 1}`), { enableOnFormTags: true });
//             }else {
//                 useHotkeys('l', () => router.push(`/prev/${currentNumber - 1}`), { enableOnFormTags: true });
//                 useHotkeys('h', () => router.push(`/prev/${currentNumber + 1}`), { enableOnFormTags: true });
//             }
//         }
//     }

//   return null;
// }
