import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';

@Component({ imports: [RouterLink], templateUrl: './placeholder.page.html', styleUrl: './placeholder.page.scss' })
export class PlaceholderPage {
  private readonly route = inject(ActivatedRoute);
  readonly title = toSignal(this.route.data.pipe(map((data) => data['title'] as string)), { initialValue: '' });
  readonly description = toSignal(this.route.data.pipe(map((data) => data['description'] as string)), { initialValue: '' });
}
