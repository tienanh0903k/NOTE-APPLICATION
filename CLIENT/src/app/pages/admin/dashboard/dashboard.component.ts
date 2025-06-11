import { Component, HostListener, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var Masonry: any; // Khai báo global nếu dùng CDN

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  noteTitle: string = '';
  noteContent: string = '';
  isTitleExpanded: boolean = false;
  isContentExpanded: boolean = false;
  isPinned: boolean = false;
  isFormFocused: boolean = false;

  // Mock data cho các card với thuộc tính priority
  notes = [
    {
      title: 'Nhập tiêu đề...',
      content: 'truncate - Tailwind\nCSS đề hạn chế chiều cao dòng, học...\nhọc\nfunction shorten(str, maxLen = 100) {\n  if (str.length > maxLen) {\n    return str.slice(0, maxLen) + "...str";\n  }\n  return str;\n}',
      tags: ['aws'],
      color: '#1E90FF',
      date: '13/3',
      priority: 1
    },
    {
      title: 'transcript',
      content: 'destructuring assignment:\nconst [ job, jobs ] = state -> Cu\nphap nay su dung de "fruit gon"\ncac thuoc tinh tu mot object\ntrong Javascript.',
      tags: ['task'],
      color: '#2E8B57',
      date: '11/3/2023',
      priority: 2
    },
    {
      title: 'SHOW RA THỜI GIAN CỦN LẠI',
      content: 'Crawler\nCũng nghe: Chạy trên EC2\n(AWS), dùng Python với các thư\nviện như Scrapy, Selenium...\nChức năng:\nThu thập (crawl) dữ liệu từ các\nnền tảng TMDT.\nLưu dữ liệu thu thập được vào\ndang file.\nVai trò: Tự động hóa quá trình\nlấy dữ liệu một cách hiệu quả.',
      tags: ['aws'],
      color: '#DAA520',
      date: '',
      priority: 3
    },
    {
      title: 'Tech',
      content: 'super() là gì ?\nsuper() dùng trong constructor của class con để\ngọi constructor của class\ncha.\nNó giúp kế thừa các thuộc\ntính đã được định nghĩa trong\nconstructor của class cha.\nBắt buộc phải gọi super() trước\nkhi sử dụng this trong\nconstructor của class con.',
      tags: ['@Pham Manh Cuong:McP'],
      color: '#8B0000',
      date: '',
      priority: 4
    },
    {
      title: 'TASK',
      content: 'Sửa notify realtime\ntruy van thong ke\nsua viec lam lien quan o\ntrang post detail\nuser xem don trang thai\nung tuyen\nthem danh muc:phần search\nthem phan blog\nthem phan tim kiem ung\nvien\nthem phan me khoi ung\nvien',
      tags: ['task'],
      color: '#800000',
      date: '',
      priority: 5
    },
    {
      title: 'Vi du:',
      content: 'class Animal {\n  constructor(name: string) { ... }\n}\nclass Dog extends Animal {',
      tags: [],
      color: '#4A2C2A',
      date: '',
      priority: 6
    },
    {
      title: 'Phím tắt Format',
      content: 'Ctrl + k + f: chi format bộ nhớ',
      tags: [],
      color: '#2F4F4F',
      date: '',
      priority: 7
    }
  ];

  @ViewChild('masonryContainer') masonryContainer!: ElementRef;

  ngAfterViewInit() {
    new Masonry(this.masonryContainer.nativeElement, {
      itemSelector: '.note-card',
      columnWidth: 250,
      gutter: 15,
      fitWidth: true
    });
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

  // Đưa card lên đầu khi click
  onCardClick(index: number) {
    const note = this.notes.splice(index, 1)[0];
    this.notes.unshift(note);
    // Cập nhật lại layout Masonry sau khi thay đổi thứ tự
    setTimeout(() => {
      this.masonryContainer.nativeElement.masonry.reloadItems();
      this.masonryContainer.nativeElement.masonry.layout();
    }, 0);
  }
}