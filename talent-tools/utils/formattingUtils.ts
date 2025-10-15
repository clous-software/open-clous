// utils/formattingUtils.ts

export const formatTextForHtml = (text: string): string => {
    // Replace headings (**) with <h2> HTML tags
    const formattedText = text
      .replace(/\*\*(.+?)\*\*/g, '<h2>$1</h2>') // Convert double asterisks to <h2>
      .replace(/\n/g, '<br />'); // Convert newlines to <br> for HTML line breaks
    
    return formattedText;
  };
  