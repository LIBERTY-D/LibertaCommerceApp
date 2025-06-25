import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  searchText: string = '';
  @Output() searchProductChange: EventEmitter<string> =
    new EventEmitter<string>();

  onSearchProductChange() {
    this.searchProductChange.emit(this.searchText);
  }
}
