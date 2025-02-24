'use client'

import { useEffect, useRef } from 'react';
import Link from 'next/link'
import { useDebouncedCallback } from "use-debounce";
import dayjs from 'dayjs';

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import HardBreak from '@tiptap/extension-hard-break'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { upsertPost} from '../_actions/actions';
import { useRouter } from 'next/navigation';
import ClientToday from './ClientToday';

const Editor = ({ selectedDate, setSelectedDate, clientWeek }) => {
    const router = useRouter()
    const editorRef = useRef(null);

    let isToday = false
    if(ClientToday().today.slice(0, 10) === selectedDate){
        isToday = true
    }

    let selectedDay = dayjs(selectedDate).format("ddd")

  const debouncedContent = useDebouncedCallback((content) => {
    upsertPost({date: selectedDate, content: content})
  }, 500);
    
  const editor = useEditor({
    extensions: [
        StarterKit,
        Placeholder.configure({
        //   placeholder: 'Write your memo for the day... (Login to save memo)',
            placeholder: ""
        }),
        // CustomHardBreak
    ],
    content: '',
    onUpdate: ({ editor }) => {
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
    };

    fetchContent();
  }, [editor]);





      // Add event listener for Mod + Shift + I
      useEffect(() => {
        const handleKeyDown = (event) => {
            // Check for Mod (Cmd/Ctrl) + Shift + I
            // if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'i') {
            if (event.key === 'Escape' || event.metaKey) {
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
        const content = JSON.stringify(editor.getJSON());
          upsertPost({
            date: selectedDate,
            content: content
          }).catch(error => {
            console.error("Background save error:", error);
          });
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
            <Link href="/" onClick={handleNavigateBack} className='editor-back-button'>
                <FontAwesomeIcon icon={faChevronLeft} style={{ width: '20px', height: '20px' }} className='editor-back-button-icon' />
            </Link>
            <div className='editor-date'>{selectedDate.slice(5, 7)}/{selectedDate.slice(8, 10)} {selectedDay}</div>
            <div className='editor-date-spacer'></div>
        </div>
        <EditorContent editor={editor} className='editor-content' ref={editorRef} />
        <div className='done-button-container'>
            {/* <div className='done-button' onClick={() => {
                upsertPost({date: selectedDate, content: JSON.stringify(editor.getJSON())})
            //   setSelectedDate("")
                router.push("/")
            }}>Done</div> */}
            <Link href="/" onClick={handleNavigateBack} className='done-button'>Done</Link>
        </div>
    </div>
  )
}

export default Editor
