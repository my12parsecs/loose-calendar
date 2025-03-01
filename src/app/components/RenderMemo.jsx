
"use client"

import { generateHTML } from '@tiptap/core'
import StarterKit from "@tiptap/starter-kit";
import EditorLink from '@tiptap/extension-link';
import DOMPurify from "dompurify";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import TimeRangeExtension from './TimeRangeExtension';
import { DemoMemoObject } from './DemoMemoObject';

export default function RenderMemo({ clientWeek, which, number, index, session }) {
  const [isLoading, setIsLoading] = useState(true);
  const [weekData, setWeekData] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
      if(session != null){
        try {
          // Get static week data and fetch function
          const clientWeekData = clientWeek(which, number);
          setWeekData(clientWeekData.thisWeek);
          
          // Fetch API data
          const response = await clientWeekData.fetchWeekData();        
          setApiResponse(response);
        } catch (error) {
          console.error("Error loading data:", error);
        } finally {
          setIsLoading(false);
        }
      }else{
        const isNotFirstVisit = localStorage.getItem("isNotFirstVisit");
        if(isNotFirstVisit){
          const clientWeekData = clientWeek(which, number);
          setWeekData(clientWeekData.thisWeek);
          let tempApiResponse = {}
          for(let i = 0; i < 7; i++){
            const date = clientWeekData.thisWeek[i].date.slice(0, 10);
            const eachContent =localStorage.getItem(date);
            console.log(typeof eachContent);
            const parsedContent = JSON.parse(eachContent);
            tempApiResponse[date] = parsedContent;
          }
          setApiResponse(tempApiResponse);
          setIsLoading(false);
        }else{
          localStorage.setItem("isNotFirstVisit", true);
          const clientWeekData = clientWeek(which, number);
          setWeekData(clientWeekData.thisWeek);
          let tempApiResponse = {}
          for(let i = 0; i < 7; i++){
            const date = clientWeekData.thisWeek[i].date.slice(0, 10);
            const eachContent = DemoMemoObject[i];
            tempApiResponse[date] = eachContent;
            localStorage.setItem(date, JSON.stringify(eachContent));
          }
          setApiResponse(tempApiResponse);
          setIsLoading(false);
        }
      }
    };
    
    loadData();
  }, []);
  
  // Loading UI
  if (isLoading) {
    return (
        <div style={{height: '100%', width: '100%'}}>
            {Array.from({ length: 7 }).map((_, index) => (
                <div className='day-right' key={index}>
                    <div className="day-right-inner"></div>
                </div>
            ))}
        </div>
    );
  }
  
  // No data yet
  if (!weekData) {
    return <div>No data available</div>;
  }  
  
  return (
    <div style={{height: '100%', width: '100%'}}>
      {weekData.map((day, idx) => {
        const dateKey = day?.date.slice(0, 10);
        
        const dayContent = apiResponse?.[dateKey];
        const generatedHTML = dayContent ? generateHTML(dayContent, [StarterKit, TimeRangeExtension, EditorLink.configure({
          defaultProtocol: 'https',
          protocols: ['https', 'http'],
          // HTMLAttributes: {
          //     target: '_blank',
          // }
        })]) : null;
        DOMPurify.setConfig({
          ALLOWED_ATTR: ['href', 'title', 'target', 'rel']
        });

        const sanitizedHTML = generatedHTML ? DOMPurify.sanitize(generatedHTML) : null;
        
        return (
          <Link href={`/${dateKey}`} className='day-right' key={idx} prefetch={true}>
            <div className="day-right-inner" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} onClick={(e) => {
              if (e.target.tagName === "A") {
                e.stopPropagation(); // Prevent Link from triggering
              }
            }}
            onKeyDown={(e) => {
              if (e.target.tagName === "A" && e.key === "Enter") {
                e.stopPropagation(); // Prevent Link activation on Enter key
              }
            }}></div>
          </Link>
        );
      })}
    </div>
  );
}