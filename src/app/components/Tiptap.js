'use client'

import { useEffect } from 'react';
import Link from 'next/link'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Tiptap = ({ selectedDate, setSelectedDate, selectedDay, isToday }) => {
    console.log(selectedDate);
    
    
    
  const editor = useEditor({
    extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: 'Write your memo for the day...',
        }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
        const content = editor.getJSON();
        // localStorage.setItem(`looseCal-${selectedDate}`, content);
        localStorage.setItem(`looseCal-${selectedDate}`, JSON.stringify(content));
      },
  })

  useEffect(() => {
    const savedContent = localStorage.getItem(`looseCal-${selectedDate}`);
    if (savedContent) {
      editor?.commands.setContent(JSON.parse(savedContent));
    }else{
        editor?.commands.setContent("")
    }
  }, [editor, selectedDate]);

  return (
    selectedDate ? (
        <div className='editor-container'>
            <div className={`editor-date-container ${isToday ? "editor-date-container-today" : ""}`}>
                <div className='editor-back-button' onClick={() => setSelectedDate("")}>
                    <FontAwesomeIcon icon={faChevronLeft} className='editor-back-button-icon' />
                </div>
                <div className='editor-date'>{selectedDate.slice(5, 7)}/{selectedDate.slice(8, 10)} {selectedDay}</div>
                <div className='editor-date-spacer'></div>
            </div>
            <EditorContent editor={editor} className='editor-content' />
            <div className='done-button-container'>
                <div className='done-button' onClick={() => setSelectedDate("")}>Done</div>
                {/* <Link href="/" className='done-button'>Done</Link> */}
            </div>
        </div>
    ) : null
  )
}

export default Tiptap
