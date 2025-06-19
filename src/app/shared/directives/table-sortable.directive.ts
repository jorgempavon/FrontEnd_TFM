import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { SortColumn, SortDirection, SortEvent } from '../dtos/shortDto';

@Directive({	
  selector: 'th[sortable]',
  standalone: true,
  host: {
  	'[class.asc]': 'direction === "asc"',
  	'[class.desc]': 'direction === "desc"',
  	'(click)': 'rotate()',
  }
})
export class TableSortableDirective {

	@Input() sortable: SortColumn = '';
	@Input() direction: SortDirection = '';
	@Output() sort = new EventEmitter<SortEvent>();
  
	rotate() {
		const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };
			this.direction = rotate[this.direction];
			this.sort.emit({ column: this.sortable, direction: this.direction });
	}
}
