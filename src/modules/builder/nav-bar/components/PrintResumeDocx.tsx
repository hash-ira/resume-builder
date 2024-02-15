import { useEffect } from 'react';
import { saveAs } from 'file-saver';
import { StyledButton } from '../atoms';
import { setup } from 'twind';
import { virtualSheet, getStyleTag } from 'twind/sheets';
// @ts-ignore
import htmlDocx from 'html-docx-js/dist/html-docx';

export const PrintResumeDocx = () => {
  const sheet = virtualSheet();
  console.log(getStyleTag(sheet));
  setup({
    sheet,
  });

  const handleDownload = () => {
    const resumeContentElement = document.getElementById('MainPage');

    // Extract HTML content
    const resumeContent = resumeContentElement?.innerHTML;

    // Convert Tailwind CSS classes to inline styles
    const inlineStyledHTML = `<html><head><title>Resume</title>${getStyleTag(
      sheet
    )}</head><body>${resumeContent}</body></html>`;
    console.log(inlineStyledHTML);

    // Convert to .docx format
    const docx = htmlDocx.asBlob(inlineStyledHTML);
    saveAs(docx, `Resume_Builder_${Date.now()}.docx`);
  };

  useEffect(() => {
    globalThis?.addEventListener('beforeprint', () => {
      globalThis.document.title = `Resume_Builder_${Date.now()}`;
    });

    globalThis?.addEventListener('afterprint', () => {
      globalThis.document.title = 'Single Page Resume Builder';
    });
  }, []);

  return (
    <StyledButton onClick={handleDownload} variant="outlined">
      Download as Docx
    </StyledButton>
  );
};
