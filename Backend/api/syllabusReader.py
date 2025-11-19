import os

import PyPDF2 # still have to add this to requirements
import re
def extract_text_from_pdf(pdf_path):
    text = ""
    with open(pdf_path, 'r') as file:
        reader = PyPDF2.PdfReader(file)
        
        for page in reader.pages:
            page_text += page.extractText() #extract text from each page and add to a single string
            if page_text:
                text += text + "\n" #if there is text in the page add a new line character (skips the empty pages)
        return text

# Example usage:
def find_exam_dates(text): #takes in the text from extraction
    pattern =  r"\b\d{1,2}/\d{1,2}/\d{4}\b"
    months = ("January|February|March|April|May|June|July|August|September|October|November|December")
    pattern2 = rf"\b({months})\s\d{{1,2}},\s\d{{4}}\b"

    pattern3 = rf"\b({months})\s\d{{1,2}}\b"

    # 4. DD Month (no year) pattern (e.g., 15 December)
    pattern4 = rf"\b\d{{1,2}}\s({months})\b"
    combined_pattern = f"({pattern})|({pattern2})|({pattern3})|({pattern4})"
    
    exam_dates = []
    lines = text.split("\n")
    
    for line in lines:
        # check for keywords
        if "exam" in line.lower() or "midterm" in line.lower() or "final" in line.lower():
            found = re.findall(combined_pattern, line)
            
            # re.findall returns tuples when multiple groups
            for match in found:
                # pick the non-empty match
                if match[0]:
                    date = match[0]
                elif match[1]:
                    date = match[1]
                elif match[2]:
                    date = match[2]
                else:
                    date = match[3]
                exam_dates.append(date)
    

    exam_dates = list(set(exam_dates))
    
    return exam_dates






pdf_text = find_exam_dates(extract_text_from_pdf("your_document.pdf"))
print(pdf_text)