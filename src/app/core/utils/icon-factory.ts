import { NzIconService } from 'ng-zorro-antd/icon';
import { EMPTY, Observable } from 'rxjs';
import { SVG_ICONS } from 'src/app/constants';

export function iconFactory( 
    iconService: NzIconService
): () => Observable<void> {
    const path: string = 'assets/icons/';

    Object.values(SVG_ICONS).forEach((name) => {
        iconService.addIcon(
            { 
                name, 
                icon: `${path}${name}.svg` 
            }
        );
    });

    return () => EMPTY;
}