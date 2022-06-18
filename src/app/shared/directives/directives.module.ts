import { NgModule } from '@angular/core';
import { HasAnyAuthorityDirective } from './has-any-autority.directive';
import { DynamicTableHeadDirective} from './dynamic-table-head.directive';
import { DynamicTableBodyDirective } from './dynamic-table-body.directive';

@NgModule({

    declarations: [HasAnyAuthorityDirective,DynamicTableHeadDirective,DynamicTableBodyDirective],
    imports     : [],
    exports     : [HasAnyAuthorityDirective, DynamicTableHeadDirective,DynamicTableBodyDirective]

})

export class DirectivesModule { }
