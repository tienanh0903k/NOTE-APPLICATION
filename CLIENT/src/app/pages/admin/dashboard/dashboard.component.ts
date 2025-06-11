import { Component, HostListener, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, CdkDragMove, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';

declare var Masonry: any;  // Khai báo global nếu dùng CDN

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, OnInit {
  noteTitle: string = '';
  noteContent: string = '';
  isTitleExpanded: boolean = false;
  isContentExpanded: boolean = false;
  isPinned: boolean = false;
  isFormFocused: boolean = false;

  private dragIndex: number | null = null;
  private masonry: any;

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

  ngOnInit() {
    // Khởi tạo dữ liệu nếu cần
  }

  ngAfterViewInit() {
    // Khởi tạo Masonry sau khi DOM đã sẵn sàng
    this.masonry = new Masonry(this.masonryContainer.nativeElement, {
      itemSelector: '.note-card',
      columnWidth: 250,
      gutter: 15,
      fitWidth: true
    });
  }

  // Mở rộng trường tiêu đề khi focus
  onTitleFocus() {
    this.isTitleExpanded = true;
    this.isFormFocused = true;
  }

  // Thu nhỏ trường tiêu đề khi mất focus nếu không có tiêu đề
  onTitleBlur() {
    if (!this.noteTitle && !this.isFormFocused) {
      this.isTitleExpanded = false;
    }
  }

  // Mở rộng trường nội dung khi focus
  onContentFocus() {
    this.isContentExpanded = true;
    this.isFormFocused = true;
  }

  // Thu nhỏ trường nội dung khi mất focus nếu không có nội dung
  onContentBlur() {
    if (!this.noteContent && !this.isFormFocused) {
      this.isContentExpanded = false;
    }
  }

  togglePin() {
    this.isPinned = !this.isPinned;
  }

  // Đóng form khi click ngoài
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const form = document.querySelector('.note-form');
    if (form && !form.contains(event.target as Node)) {
      this.isFormFocused = false;
      if (!this.noteTitle) this.isTitleExpanded = false;
      if (!this.noteContent) this.isContentExpanded = false;
    }
  }

  // Xử lý kéo thả
  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);

    // Cập nhật lại layout của Masonry sau khi kéo thả
    setTimeout(() => {
      if (this.masonry) {
        // Yêu cầu Masonry reload lại các phần tử và tính toán lại vị trí
        this.masonry.reloadItems();
        this.masonry.layout();
      }
    }, 200);  // Điều chỉnh thời gian chờ nếu cần thiết
  }

  onDragStart(index: number) {
    // Ẩn hoặc thay đổi trạng thái của phần tử khi bắt đầu kéo
    const noteCard = document.querySelectorAll('.note-card')[index];
    if (noteCard) {
      noteCard.classList.add('dragging');
    }
  }

  // Xử lý sự kiện khi kết thúc kéo
  onDragEnd(index: number) {
    // Khôi phục lại trạng thái của phần tử khi kết thúc kéo
    const noteCard = document.querySelectorAll('.note-card')[index];
    if (noteCard) {
      noteCard.classList.remove('dragging');
    }
  }

  onDragMoved(event: CdkDragMove, index: number) {
    if (this.dragIndex !== null && this.dragIndex !== index) {
      const currentIndex = this.dragIndex;
      const distance = event.pointerPosition.y - event.source.getFreeDragPosition().y;

      // Kiểm tra xem phần tử có đi qua vị trí mới không
      if (distance > 50) { // Điều chỉnh khoảng cách khi cần thiết
        moveItemInArray(this.notes, currentIndex, index); // Swap vị trí nếu đi qua
        this.dragIndex = index; // Cập nhật chỉ mục sau khi swap
      }
    }
  }
}
