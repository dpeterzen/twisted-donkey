import React, { useEffect, useState } from "react";

interface Progress {
  total: number;
  current: number;
}

interface Data {
  title: string;
  text_description: string;
  image_description: string;
  illustrations: string;
}

interface SSEData {
  status: string;
  progress: Progress;
  data: Data | null;
}

interface TestBookProps {
  taskId: string;
}

const TestBook: React.FC<TestBookProps> = ({ taskId }) => {
  const [sseData, setSSEData] = useState<SSEData | null>(null);

  useEffect(() => {
    const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}get_updates/${taskId}`);

    eventSource.onmessage = (event) => {
      if (event.data.startsWith(':')) {
        // Ignore keep-alive messages
        return;
      }

      try {
        const parsedData: SSEData = JSON.parse(event.data);
        setSSEData(parsedData);

        // Check if status is done and close the connection
        if (parsedData.status === 'done') {
          eventSource.close();
        }
      } catch (error) {
        console.error('Error parsing SSE message:', error);
      }
    };

    eventSource.onerror = (error) => {
      // Handle the error here, you may want to add some retry logic
      console.error("SSE error:", error);
      // Close the connection in case of error
      eventSource.close();
    };

    return () => {
      // It's important to close the connection when the component is unmounted
      eventSource.close();
    };
  }, [taskId]); // Rerun effect when taskId changes

  if (!sseData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>Status: {sseData.status}</div>
      <div>Progress: {sseData.progress.current}/{sseData.progress.total}</div>
      {sseData.data && (
        <>
          <div>Title: {sseData.data.title}</div>
          <div>Text Description: {sseData.data.text_description}</div>
          <div>Image Description: {sseData.data.image_description}</div>
          <div>Illustrations: {sseData.data.illustrations}</div>
        </>
      )}
    </div>
  );
};

export default TestBook;
