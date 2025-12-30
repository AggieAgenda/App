import pymupdf as fitz  # PyMuPDF
import re
from datetime import datetime
from typing import List, Dict, Optional


def readPDF(file) -> str:
    """
    Extract text from a PDF file.
    
    Args:
        file: Django uploaded file object or file-like object
        
    Returns:
        str: Extracted text from the PDF
        
    Raises:
        Exception: If PDF cannot be read
    """
    try:
        # Open the PDF file
        pdf_document = fitz.open(stream=file.read(), filetype="pdf")
        
        text = ""
        
        # Iterate through all pages
        for page_num in range(pdf_document.page_count):
            page = pdf_document[page_num]
            text += page.get_text()
        
        pdf_document.close()
        
        return text
    
    except Exception as e:
        raise Exception(f"Error reading PDF: {str(e)}")


def extract_dates(text: str) -> List[Dict[str, any]]:
    """
    Extract dates and associated information from text.
    
    Looks for common date patterns and tries to associate them with
    assignments, exams, or other events mentioned nearby.
    
    Args:
        text: Text to extract dates from
        
    Returns:
        List of dictionaries containing date information:
        [
            {
                'date': 'YYYY-MM-DD',
                'original_text': 'Original date string',
                'event_type': 'assignment/exam/class/other',
                'description': 'Associated event description',
                'context': 'Surrounding text'
            },
            ...
        ]
    """
    dates = []
    
    # Date patterns to match
    # Format: Month Day, Year (e.g., "December 25, 2024" or "Dec 25, 2024")
    pattern1 = r'\b(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s+\d{1,2},?\s+\d{4}\b'
    
    # Format: MM/DD/YYYY or MM-DD-YYYY
    pattern2 = r'\b\d{1,2}[/-]\d{1,2}[/-]\d{4}\b'
    
    # Format: Day Month Year (e.g., "25 December 2024")
    pattern3 = r'\b\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s+\d{4}\b'
    
    # Combine patterns
    combined_pattern = f'({pattern1}|{pattern2}|{pattern3})'
    
    # Find all date matches
    matches = re.finditer(combined_pattern, text, re.IGNORECASE)
    
    for match in matches:
        date_str = match.group(0)
        start_pos = match.start()
        end_pos = match.end()
        
        # Get context around the date (100 chars before and after)
        context_start = max(0, start_pos - 100)
        context_end = min(len(text), end_pos + 100)
        context = text[context_start:context_end].strip()
        
        # Try to parse the date
        parsed_date = parse_date_string(date_str)
        
        # Determine event type based on context
        event_type = determine_event_type(context)
        
        # Extract description from context
        description = extract_description(context, date_str)
        
        date_info = {
            'date': parsed_date.strftime('%Y-%m-%d') if parsed_date else date_str,
            'original_text': date_str,
            'event_type': event_type,
            'description': description,
            'context': context
        }
        
        dates.append(date_info)
    
    # Remove duplicates (same date and description)
    unique_dates = []
    seen = set()
    
    for date_info in dates:
        key = (date_info['date'], date_info['description'])
        if key not in seen:
            seen.add(key)
            unique_dates.append(date_info)
    
    # Sort by date
    unique_dates.sort(key=lambda x: x['date'])
    
    return unique_dates


def parse_date_string(date_str: str) -> Optional[datetime]:
    """
    Parse a date string into a datetime object.
    
    Args:
        date_str: Date string to parse
        
    Returns:
        datetime object or None if parsing fails
    """
    # Common date formats
    formats = [
        '%B %d, %Y',      # December 25, 2024
        '%b %d, %Y',      # Dec 25, 2024
        '%B %d %Y',       # December 25 2024
        '%b %d %Y',       # Dec 25 2024
        '%m/%d/%Y',       # 12/25/2024
        '%m-%d-%Y',       # 12-25-2024
        '%d %B %Y',       # 25 December 2024
        '%d %b %Y',       # 25 Dec 2024
    ]
    
    date_str = date_str.strip()
    
    for fmt in formats:
        try:
            return datetime.strptime(date_str, fmt)
        except ValueError:
            continue
    
    return None


def determine_event_type(context: str) -> str:
    """
    Determine the type of event based on context.
    
    Args:
        context: Text surrounding the date
        
    Returns:
        Event type string
    """
    context_lower = context.lower()
    
    # Keywords for different event types
    assignment_keywords = ['assignment', 'homework', 'hw', 'due', 'submit', 'submission', 'project']
    exam_keywords = ['exam', 'test', 'quiz', 'midterm', 'final']
    class_keywords = ['class', 'lecture', 'lab', 'section', 'meeting']
    holiday_keywords = ['holiday', 'break', 'vacation', 'recess']
    
    # Check for keywords
    if any(keyword in context_lower for keyword in assignment_keywords):
        return 'assignment'
    elif any(keyword in context_lower for keyword in exam_keywords):
        return 'exam'
    elif any(keyword in context_lower for keyword in class_keywords):
        return 'class'
    elif any(keyword in context_lower for keyword in holiday_keywords):
        return 'holiday'
    else:
        return 'other'


def extract_description(context: str, date_str: str) -> str:
    """
    Extract a description of the event from the context.
    
    Args:
        context: Text surrounding the date
        date_str: The date string
        
    Returns:
        Description string
    """
    # Try to find the sentence containing the date
    sentences = context.split('.')
    
    for sentence in sentences:
        if date_str in sentence:
            # Clean up and return the sentence
            description = sentence.strip()
            # Remove the date from description
            description = description.replace(date_str, '').strip()
            # Remove common prefixes
            description = re.sub(r'^[:\-\s]+', '', description)
            return description if description else 'Event'
    
    # If no sentence found, return first few words of context
    words = context.split()[:10]
    return ' '.join(words) + '...' if words else 'Event'


def extract_course_info(text: str) -> Dict[str, any]:
    """
    Extract course information from syllabus text.
    
    Args:
        text: Full syllabus text
        
    Returns:
        Dictionary containing course information
    """
    course_info = {
        'course_code': None,
        'course_name': None,
        'instructor': None,
        'email': None,
        'office_hours': None
    }
    
    # Extract course code (e.g., CS 301, MATH 101)
    course_code_pattern = r'\b([A-Z]{2,4}\s*\d{3,4}[A-Z]?)\b'
    course_code_match = re.search(course_code_pattern, text)
    if course_code_match:
        course_info['course_code'] = course_code_match.group(1)
    
    # Extract instructor name (look for "Instructor:" or "Professor:")
    instructor_pattern = r'(?:Instructor|Professor):\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)'
    instructor_match = re.search(instructor_pattern, text, re.IGNORECASE)
    if instructor_match:
        course_info['instructor'] = instructor_match.group(1).strip()
    
    # Extract email
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    email_match = re.search(email_pattern, text)
    if email_match:
        course_info['email'] = email_match.group(0)
    
    return course_info