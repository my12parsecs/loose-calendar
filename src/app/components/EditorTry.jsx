'use client'

import { useEffect, useRef } from 'react';

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import HardBreak from '@tiptap/extension-hard-break'
import ListKeymap from '@tiptap/extension-list-keymap';
import EditorLink from '@tiptap/extension-link';
import TimeRangeExtension from './TimeRangeExtension';
import EditorMenu from './EditorMenu';
import {EditorTryObject} from './EditorTryObject';

// import "../stylesheets/page.css";
import "../stylesheets/editor-menu.css";
import "../stylesheets/editor.css";




const EditorTry = () => {
    const editorRef = useRef(null);

    
  const editor = useEditor({
    extensions: [
        StarterKit,
        Placeholder.configure({
        //   placeholder: 'Write your memo for the day... (Login to save memo)',
            placeholder: ""
        }),
        // CustomHardBreak
        ListKeymap,
        EditorLink.configure({
            autolink: true,
            defaultProtocol: 'https',
            protocols: ['https', 'http'],
        }),
        TimeRangeExtension,
    ],
    content: EditorTryObject,
    onUpdate: ({ editor }) => {
        const content = editor.getJSON();
        console.log(content);
        


      const { state } = editor;
      const { selection, doc } = state;
      const { from } = selection;

      // Get the text before the cursor
      const textBeforeCursor = doc.textBetween(0, from);

       // Check if the last character is a space
  if (textBeforeCursor.endsWith(' ')) {
    // Regex patterns for each case
    const patterns = [
 
      {
        regex: /@(\d{2})(\d{2})-(\d{2})(\d{2})\s/,
        replace: (match, h1, m1, h2, m2) => `@${h1}:${m1}~${h2}:${m2}`,
      },
      {
        regex: /@(\d{2})(\d{2})-\s/,
        replace: (match, h1, m1) => `@${h1}:${m1}~`,
      },
      {
        regex: /@-(\d{2})(\d{2})\s/,
        replace: (match, h1, m1) => `@~${h1}:${m1}`,
      },
    
      // Rule 2: One/Two digits - One/Two digits (e.g., @1-2 => @1:00~2:00)
      {
        regex: /@(\d{1,2})-(\d{1,2})\s/,
        replace: (match, h1, h2) => `@${h1}:00~${h2}:00`,
      },
      {
        regex: /@(\d{1,2})-\s/,
        replace: (match, h1) => `@${h1}:00~`,
      },
      {
        regex: /@-(\d{1,2})\s/,
        replace: (match, h1) => `@~${h1}:00`,
      },
    
      // Rule 3: Dot separator (e.g., @1.2-3.4 => @1:20~3:40)
      {
        regex: /@(\d{1,2})\.(\d{1,2})-(\d{1,2})\.(\d{1,2})\s/,
        replace: (match, h1, m1, h2, m2) => {
          const roundedM1 = m1.length == 2 ? m1 : parseInt(m1, 10) * 10;
          const roundedM2 = m2.length == 2 ? m2 : parseInt(m2, 10) * 10;
          return `@${h1}:${roundedM1}~${h2}:${roundedM2}`;
        },
      },
    
      // Rule 4: Missing left side (e.g., @-3.4 => @~3:40)
      {
        regex: /@-(\d{1,2})\.(\d{1,2})\s/,
        replace: (match, h2, m2) => {
          const roundedM2 = m2.length == 2 ? m2 : parseInt(m2, 10) * 10;
          return `@~${h2}:${roundedM2}`;
        },
      },
      // Rule 5: Missing right side (e.g., @1.2- => @1:20~)
      {
        regex: /@(\d{1,2})\.(\d{1,2})-\s/,
        replace: (match, h1, m1) => {
          const roundedM1 = m1.length == 2 ? m1 : parseInt(m1, 10) * 10;
          return `@${h1}:${roundedM1}~`;
        },
      },


      {
        regex: /@(\d{1,2})\.(\d{1,2})-(\d{1,2})\s/,
        replace: (match, h1, m1, h2, m2) => {
          const roundedM1 = m1.length == 2 ? m1 : parseInt(m1, 10) * 10;
          return `@${h1}:${roundedM1}~${h2}:00`;
        },
      },
      {
        regex: /@(\d{1,2})\-(\d{1,2})\.(\d{1,2})\s/,
        replace: (match, h1, h2, m2) => {
          // const roundedM1 = m1.length == 2 ? m1 : parseInt(m1, 10) * 10;
          const roundedM2 = m2.length == 2 ? m2 : parseInt(m2, 10) * 10;
          return `@${h1}:00~${h2}:${roundedM2}`;
        },
      },


      { regex: /@all\s/, replace: () => '@AllDay' }, // @all => @AllDay
      { regex: /@am\s/, replace: () => '@AM' }, // @am => @AM
      { regex: /@pm\s/, replace: () => '@PM' }, // @pm => @PM
      { regex: /@dl\s/, replace: () => '@Deadline' }, // @dl => @Deadline
    ];

    // Find the first matching pattern
    for (const { regex, replace } of patterns) {
      const match = textBeforeCursor.match(regex);
      if (match) {
        const [fullMatch, ...groups] = match;
        const replacement = replace(fullMatch, ...groups);

        // Calculate the range to replace
        const replaceFrom = from - fullMatch.length;
        const replaceTo = from;

        // Replace the matched text with the custom node
        editor
          .chain()
          .focus()
          .deleteRange({ from: replaceFrom, to: replaceTo })
          .insertContentAt(replaceFrom, {
            type: 'timeRange',
            attrs: {
              timeRange: replacement,
            },
          })
          .run();

        break; // Stop after the first match
      }
    }
  }

      },
  })




      // Add event listener for Mod + Shift + I
      useEffect(() => {
        const handleKeyDown = (event) => {
            // Check for Mod (Cmd/Ctrl) + Shift + I
            // if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'i') {
            if (event.key === 'Escape') {
                event.preventDefault(); // Prevent default behavior (e.g., opening browser dev tools)
                editor.commands.blur(); // Blur the editor
            }
        };

        // Attach the event listener to the editor's DOM element
        const editorElement = editorRef.current;
        if (editorElement) {
            editorElement.addEventListener('keydown', handleKeyDown);
        }

        // Cleanup the event listener on unmount
        return () => {
            if (editorElement) {
                editorElement.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [editor]);



      

  return (
    <div className='editor-try-container'>
        <EditorContent editor={editor} className='editor-try' ref={editorRef} />
        {/* <EditorMenu /> */}
    </div>
  )
}

export default EditorTry
