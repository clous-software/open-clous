import pdfjs from 'pdfjs-dist/webpack';   // tiny build, tree-shakable
import mammoth from 'mammoth/browser';    // DOCX → text

export async function fileToPlainText(file: File): Promise<string> {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') {
        const pdf = await pdfjs.getDocument(await file.arrayBuffer()).promise;
        const pages = await Promise.all(
            Array.from({ length: pdf.numPages }, (_, i) => pdf.getPage(i + 1)),
        );
        const text = await Promise.all(
            pages.map(p =>
                p.getTextContent().then(tc => tc.items.map(i => i.str).join(' ')),
            ),
        );
        return text.join('\n');
    }

    if (ext === 'docx') {
        const { value } = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
        return value;
    }

    // txt / md / csv
    return await file.text();
} 