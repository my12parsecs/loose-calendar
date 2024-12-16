'use client'

import { useEffect } from 'react';
// import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = ({ selectedDate, selectedDay }) => {
    // const router = useRouter()
    
    
  const editor = useEditor({
    extensions: [StarterKit],
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
            <div className='editor-date'>{selectedDate.slice(0, 2)}/{selectedDate.slice(3, 5)} {selectedDay}</div>
            <EditorContent editor={editor} className='editor-content' />
            <div className='done-button-container'>
                {/* <div className='done-button' onClick={() => router.push("/")}>Done</div> */}
                <Link href="/" className='done-button'>Done</Link>
            </div>
        </div>
    ) : null
  )
}

export default Tiptap
