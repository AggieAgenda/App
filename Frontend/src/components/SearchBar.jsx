// src/components/SearchBar.jsx
import React, { useEffect, useRef, useState } from "react";

export default function SearchBar({
  value,
  defaultValue = "",
  onChange,
  onSearch,
  onSuggestSelect,
  placeholder = "Search...",
  debounceMs = 250,
  suggestions = [],
  showClear = true,
  showSearchButton = true,
  className = "",
  inputClassName = "",
  suggestionClassName = ""
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const inputValue = isControlled ? value : internal;

  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const debounceTimer = useRef(null);

  const visibleSuggestions = suggestions.filter(s =>
    s.toLowerCase().includes((inputValue || "").trim().toLowerCase())
  );

  useEffect(() => {
    function onDocClick(e) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) {
        setOpen(false);
        setHighlight(-1);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    if (visibleSuggestions.length > 0) setOpen(true);
    else setOpen(false);
    setHighlight(-1);
  }, [inputValue, suggestions]);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
    if (onChange) {
      if (debounceMs && debounceMs > 0) {
        debounceTimer.current = setTimeout(() => onChange(inputValue), debounceMs);
      } else {
        onChange(inputValue);
      }
    }
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
        debounceTimer.current = null;
      }
    };
  }, [inputValue]); // eslint-disable-line react-hooks/exhaustive-deps

  function setValue(v) {
    if (isControlled) {
      if (onChange) onChange(v);
    } else {
      setInternal(v);
    }
  }

  function handleInput(e) {
    setValue(e.target.value);
  }

  function triggerSearch(v = inputValue) {
    setOpen(false);
    setHighlight(-1);
    if (onSearch) onSearch(v);
  }

  function selectSuggestion(s) {
    if (!isControlled) setInternal(s);
    if (onSuggestSelect) onSuggestSelect(s);
    if (onSearch) onSearch(s);
    setOpen(false);
    setHighlight(-1);
    if (inputRef.current) inputRef.current.focus();
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!visibleSuggestions.length) return;
      setOpen(true);
      setHighlight(h => Math.min(h + 1, visibleSuggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!visibleSuggestions.length) return;
      setOpen(true);
      setHighlight(h => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open && highlight >= 0 && highlight < visibleSuggestions.length) {
        selectSuggestion(visibleSuggestions[highlight]);
      } else {
        triggerSearch();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlight(-1);
    }
  }

  return (
    <div
      className={`searchbar ${className}`}
      ref={containerRef}
      style={{ position: "relative" }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          ref={inputRef}
          type="search"
          aria-label="Search"
          className={`searchbar-input ${inputClassName}`}
          value={inputValue}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          onFocus={() => { if (visibleSuggestions.length > 0) setOpen(true); }}
          style={{ flex: 1, padding: "8px 10px", border: "1px solid #ccc", borderRadius: 4 }}
        />

        {showClear && inputValue && (
          <button
            aria-label="Clear search"
            className="searchbar-clear"
            onClick={() => { setValue(""); if (inputRef.current) inputRef.current.focus(); }}
            type="button"
            style={{ marginLeft: 6, padding: "6px 8px", cursor: "pointer" }}
          >
            ×
          </button>
        )}

        {showSearchButton && (
          <button
            aria-label="Search"
            className="searchbar-button"
            onClick={() => triggerSearch()}
            type="button"
            style={{ marginLeft: 6, padding: "6px 10px", cursor: "pointer" }}
          >
            🔍
          </button>
        )}
      </div>

      {open && visibleSuggestions.length > 0 && (
        <ul
          role="listbox"
          aria-label="Search suggestions"
          className={`searchbar-suggestions ${suggestionClassName}`}
          style={{
            position: "absolute",
            zIndex: 1000,
            left: 0,
            right: 0,
            marginTop: 6,
            background: "white",
            border: "1px solid rgba(0,0,0,0.12)",
            maxHeight: 240,
            overflow: "auto",
            listStyle: "none",
            padding: 0,
            borderRadius: 4
          }}
        >
          {visibleSuggestions.map((s, idx) => (
            <li
              key={`${s}-${idx}`}
              role="option"
              aria-selected={highlight === idx}
              onMouseDown={(ev) => { ev.preventDefault(); selectSuggestion(s); }}
              onMouseEnter={() => setHighlight(idx)}
              style={{
                padding: "8px 12px",
                background: highlight === idx ? "#f0f0f0" : "transparent",
                cursor: "pointer"
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}