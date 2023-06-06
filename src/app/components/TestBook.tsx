import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CircularProgress, CardMedia, Box } from "@mui/material";

interface Progress {
  total: number;
  current: number;
}

interface Data {
  title: string;
  text_description?: string[];
  image_description?: string[];
  illustrations?: string[];
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
        console.log(parsedData); // log the parsed data
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

  const { data } = sseData;
  const maxLength = Math.max(
    data?.text_description?.length || 0,
    data?.image_description?.length || 0,
    data?.illustrations?.length || 0
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <Card sx={{ marginBottom: 2, padding: 2 }}>
        <Typography variant="body1">Status: {sseData.status}</Typography>
        <div className="flex items-center">
          <Typography variant="body1">Progress: </Typography>
          <CircularProgress
            variant="determinate"
            value={(sseData.progress.current / sseData.progress.total) * 100}
            style={{ marginLeft: '8px' }}
          />
        </div>
      </Card>

      {data && (
      <>
        <Card sx={{ maxWidth: 500 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center' }}>
              {data.title}
            </Typography>
          </CardContent>
          {[...Array(maxLength)].map((_, index) => (
            <React.Fragment key={index}>
              <Box my={1} display="flex" justifyContent="center">
                <Typography variant="caption" color="text.secondary">
                  {`Page ${index + 1}`}
                </Typography>
              </Box>
              {data.text_description && data.text_description[index] && (
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {data.text_description[index]}
                  </Typography>
                </CardContent>
              )}
              {data.illustrations && data.illustrations[index] && (
                <>
                  <CardMedia
                    component="img"
                    height="140"
                    image={data.illustrations[index]}
                    alt="Illustration"
                  />
                  {data.image_description && data.image_description[index] && (
                    <CardContent>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        style={{ fontSize: "0.5rem" }}
                      >
                        {data.image_description[index]}
                      </Typography>
                    </CardContent>
                  )}
                </>
              )}
            </React.Fragment>
          ))}
        </Card>

        {sseData.status === 'done' && (
          <Card sx={{ maxWidth: 500, minWidth: 150, marginTop: 2, paddingTop: 2 }}>
            <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{ textAlign: 'center' }}>
              The End
            </Typography>
            </CardContent>
          </Card>
        )}
      </>
    )}
  </div>
);


};

export default TestBook;
