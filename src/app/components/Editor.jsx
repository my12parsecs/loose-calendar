'use client'

import { useEffect, useRef } from 'react';
import { useDebouncedCallback } from "use-debounce";
import dayjs from 'dayjs';

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import HardBreak from '@tiptap/extension-hard-break'
import ListKeymap from '@tiptap/extension-list-keymap';
import EditorLink from '@tiptap/extension-link';
import TimeRangeExtension from './TimeRangeExtension';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { upsertPost} from '../_actions/actions';
import { useRouter } from 'next/navigation';
import ClientToday from './ClientToday';
import EditorMenu from './EditorMenu';


const Editor = ({ selectedDate, setSelectedDate, clientWeek, session }) => {
  const router = useRouter()
  const editorRef = useRef(null);

  let isToday = false
  if(ClientToday().today.slice(0, 10) === selectedDate){
    isToday = true
  }

  let selectedDay = dayjs(selectedDate).format("ddd")

  

  const debouncedContent = useDebouncedCallback((content) => {
    if(session != null){
      upsertPost({date: selectedDate, content: content})
    }else{
      localStorage.setItem(selectedDate, content);
    }
  }, 500);
    
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
        TimeRangeExtension
    ],
    content: '',
    onUpdate: ({ editor }) => {


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

        const content = editor.getJSON();
        // localStorage.setItem(`looseCal-${selectedDate}`, JSON.stringify(content));
        debouncedContent(JSON.stringify(content));
      },
  })

  useEffect(() => {
    // const savedContent = localStorage.getItem(`looseCal-${selectedDate}`);
    // if (savedContent) {
    //   editor?.commands.setContent(JSON.parse(savedContent));
    // }else{
    //     editor?.commands.setContent("")
    // }
    if (!selectedDate || !editor) return;


    // const fetchContent = async () => {
    //     try {
    //         const clientWeekData = clientWeek();
    //         const res = await clientWeekData.fetchWeekData();             
    //         const data = res[selectedDate]
            
    //         if (data) {
    //             editor.commands.setContent(data);
    //         } else {
    //             editor.commands.setContent("");
    //         }
    //     }catch(error){
    //         console.error("Error fetching content:", error);
    //     }}

    const fetchContent = async () => {
      if(session != null){
        try {
          const res = await fetch(`/api/getPost?date=${selectedDate}`);
          const data = await res.json();        
          
          if (data.content) {
            editor.commands.setContent(JSON.parse(data.content));
          } else {
            editor.commands.setContent("");
          }
        } catch (error) {
          console.error("Error fetching memo:", error);
        }
      }else{
        const savedContent = localStorage.getItem(`${selectedDate}`);
        if (savedContent) {
          editor?.commands.setContent(JSON.parse(savedContent));
        }
      }

    };

    fetchContent();
  }, [editor]);



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
    }, [editor]); // Depend on the editor instance


    // Handle navigation with background save
    const handleNavigateBack = () => {
        window.history.back();
        const content = JSON.stringify(editor.getJSON());
        if(session != null){
          upsertPost({
            date: selectedDate,
            content: content
          }).catch(error => {
            console.error("Background save error:", error);
          });
        }else{
          localStorage.setItem(selectedDate, content);
        }

      };
      

  return (
    <div className='editor-container'>
        <div className={`editor-date-container ${isToday ? "editor-date-container-today" : ""}`}>
            {/* <div className='editor-back-button' 
            // onClick={() => {
            //     router.push("/")
            //     upsertPost({date: selectedDate, content: JSON.stringify(editor.getJSON())})
            // }}
            onClick={handleNavigateBack}
            >
                <FontAwesomeIcon icon={faChevronLeft} className='editor-back-button-icon' />
            </div> */}
            <div className='editor-back-button'>
              <div onClick={handleNavigateBack} className='editor-back-button-inner'>
                <FontAwesomeIcon icon={faChevronLeft} className='editor-back-button-icon' />
              </div>
            </div>
            <div className='editor-date'>{selectedDate.slice(5, 7)}/{selectedDate.slice(8, 10)} {selectedDay}</div>
            <div className='editor-date-spacer'>
              <div onClick={handleNavigateBack} className='editor-top-done'>Done</div>
            </div>
        </div>
        <EditorContent editor={editor} className='editor-content' ref={editorRef} />
        <div className='done-button-container'>
            {/* <div className='done-button' onClick={() => {
                upsertPost({date: selectedDate, content: JSON.stringify(editor.getJSON())})
            //   setSelectedDate("")
                router.push("/")
            }}>Done</div> */}
            <div onClick={handleNavigateBack} className='done-button'>Done</div>
        </div>

        <EditorMenu />
    </div>
  )
}

export default Editor
