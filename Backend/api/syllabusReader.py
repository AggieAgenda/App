import os

import PyPDF2 # still have to add this to requirements

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfFileReader(file)
        text = ""
        for page_num in range(reader.numPages):
            page = reader.getPage(page_num)
            text += page.extractText()
        return text

# Example usage:
pdf_text = extract_text_from_pdf("your_document.pdf")
print(pdf_text)