import React from 'react';
import FlipPage from 'react-flip-page';

interface Data {
    title: string;
    parsed_image_description: string[];
    parsed_text_description: string[];
    illustrations: string[];
    total_pages: number;
}

interface FlipBookProps {
    data: Data;
}

const FlipBook: React.FC<FlipBookProps> = ({ data }) => {
    const { title, illustrations, parsed_image_description, parsed_text_description } = data;

    // Combine the illustrations, image descriptions, and text descriptions into a single array
    const pages = illustrations.map((illustration, i) => ({
        illustration,
        imageDescription: parsed_image_description[i],
        textDescription: parsed_text_description[i]
    }));

    return (
        <div>
            <h1>{title}</h1>
            <FlipPage
                className="book"
                uncutPages={true}
                orientation="horizontal"
                height={650}
                width={700}
                pageBackground="#F0E2DF"
                animationDuration="400"
        >
                {pages.map((page, i) => (
                    <article key={i} style={{ width: "600px ", padding: "10px 20px"}}>
                    <img src={`data:image/png;base64,${page.illustration}`} alt={`Illustration ${i + 1}`} />
                        <p>{page.textDescription}</p>
                        <small>{page.imageDescription}</small>
                    </article>
                ))}
            </FlipPage>
        </div>
    );
}

export default FlipBook;