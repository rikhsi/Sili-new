import {
  AfterViewInit,
  ChangeDetectorRef,
  DestroyRef,
  Directive,
  ElementRef,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { map, tap, withLatestFrom } from 'rxjs';
import { UserService } from 'src/app/core/services';

@Directive({
  selector: '[siliPermission]',
  standalone: true,
})
export class PermissionDirective<T> implements AfterViewInit {
  siliPermission = input<number[]>();
  permissions$ = toObservable(this.siliPermission);

  constructor(
    private tpl: TemplateRef<ElementRef<T>>,
    private vcr: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private destroyRef: DestroyRef,
  ) {}

  ngAfterViewInit(): void {
    this.permissions$
      .pipe(
        withLatestFrom(this.userService.user$),
        map(() => true),
        tap((isAlloved) => {
          if (isAlloved) {
            this.vcr.createEmbeddedView(this.tpl);
          } else {
            this.vcr.clear();
          }

          this.cdr.markForCheck();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
