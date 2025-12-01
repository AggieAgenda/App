import os
#import fitz
import re

# putting all this code straight into the views.py


def readPDF(pdf):
            doc = fitz.open(stream = pdf.read(), filetype="pdf")
            text = "" 
            for page in doc:
                text+= page.get_text()
            return text
def extract_dates(text):
    """
    Extract common class date formats like:
    - 08/21/2024
    - Aug 21, 2024
    - Monday, August 21
    - 8/21
    """

    patterns = [
        r"\b\d{1,2}/\d{1,2}/\d{2,4}\b",                 # 12/05/24 or 12/05/2024
        r"\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2}, \d{4}\b",
        r"\b(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),? [A-Za-z]+ \d{1,2}\b"
    ]

    found = []
    for pattern in patterns:
        found += re.findall(pattern, text)

    return found

