import { Component, HostListener, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// 

export interface Note {
  title: string;
  content: string;
  color: string;
  tags: string[];
  date: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  notes: Note[] = [
    { title: 'Note 1', content: 'This is the first note.', color: '#', tags: ['work', 'urgent'], date: '2025-06-10' },
    { title: 'Note 2', content: 'This is the second note.', color: '#', tags: ['personal'], date: '2025-06-12' },
    { title: 'Note 3', content: 'This is the third note.', color: '#f44336', tags: ['study'], date: '2025-06-14' },
    { title: 'Note 4', content: 'This is the fourth note.', color: '#2196f3', tags: ['shopping'], date: '2025-06-15' },
  ];

  expandedNoteIndex: number | null = null; 

  noteTitle: string = '';
  noteContent: string = '';
  isTitleExpanded: boolean = false;
  isContentExpanded: boolean = false;
  isPinned: boolean = false;
  isFormFocused: boolean = false;

  ngOnInit(): void {
    
  }

  toggleNoteDetail(index: number) {
    this.expandedNoteIndex = this.expandedNoteIndex === index ? null : index;
  }


  onTitleFocus() {
    this.isTitleExpanded = true;
    this.isFormFocused = true;
  }

  onTitleBlur() {
    if (!this.noteTitle && !this.isFormFocused) {
      this.isTitleExpanded = false;
    }
  }

  onContentFocus() {
    this.isContentExpanded = true;
    this.isFormFocused = true;
  }

  onContentBlur() {
    if (!this.noteContent && !this.isFormFocused) {
      this.isContentExpanded = false;
    }
  }

  togglePin() {
    this.isPinned = !this.isPinned;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const form = document.querySelector('.note-form');
    if (form && !form.contains(event.target as Node)) {
      this.isFormFocused = false;
      if (!this.noteTitle) this.isTitleExpanded = false;
      if (!this.noteContent) this.isContentExpanded = false;
    }
  }
 

  onDrop(event: CdkDragDrop<Note[]>) {
    console.log(event);
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
    }
  }

  pinNote(note: Note) {
    alert(`Pinned: ${note.title}`);
  }
}
