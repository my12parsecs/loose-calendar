'use client'

import { useEffect } from 'react';
import Link from 'next/link'
import { useDebouncedCallback } from "use-debounce";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import HardBreak from '@tiptap/extension-hard-break'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { upsertPost} from '../_actions/actions';

const Tiptap = ({ selectedDate, setSelectedDate, selectedDay, isToday }) => {
    // console.log(selectedDate);
    
    // const CustomHardBreak = HardBreak.extend({
    //     renderText() {
    //       return '\n'
    //     },
    //   })
  const debouncedContent = useDebouncedCallback((content) => {
    upsertPost({date: selectedDate, content: content})
  }, 1000);
    
  const editor = useEditor({
    extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: 'Write your memo for the day... (Login to save memo)',
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
  }, [editor, selectedDate]);

  return (
    selectedDate ? (
        <div className='editor-container'>
            <div className={`editor-date-container ${isToday ? "editor-date-container-today" : ""}`}>
                <div className='editor-back-button' onClick={() => {
                  upsertPost({date: selectedDate, content: JSON.stringify(editor.getJSON())})
                  setSelectedDate("")
                }}>
                    <FontAwesomeIcon icon={faChevronLeft} className='editor-back-button-icon' />
                </div>
                <div className='editor-date'>{selectedDate.slice(5, 7)}/{selectedDate.slice(8, 10)} {selectedDay}</div>
                <div className='editor-date-spacer'></div>
            </div>
            <EditorContent editor={editor} className='editor-content' />
            <div className='done-button-container'>
                <div className='done-button' onClick={() => {
                  upsertPost({date: selectedDate, content: JSON.stringify(editor.getJSON())})
                  setSelectedDate("")
                }}>Done</div>
                {/* <Link href="/" className='done-button'>Done</Link> */}
            </div>
        </div>
    ) : null
  )
}

export default Tiptap
