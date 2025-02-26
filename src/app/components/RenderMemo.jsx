
"use client"
import { generateHTML } from '@tiptap/core'
import StarterKit from "@tiptap/starter-kit";
import DOMPurify from "dompurify";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function RenderMemo({ clientWeek, which, number, index }) {
  const [isLoading, setIsLoading] = useState(true);
  const [weekData, setWeekData] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
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
        const generatedHTML = dayContent ? generateHTML(dayContent, [StarterKit]) : null;
        const sanitizedHTML = generatedHTML ? DOMPurify.sanitize(generatedHTML) : null;
        
        return (
          <Link href={`/${dateKey}`} className='day-right' key={idx} prefetch={true}>
            <div className="day-right-inner" dangerouslySetInnerHTML={{ __html: sanitizedHTML }}></div>
          </Link>
        );
      })}
    </div>
  );
}