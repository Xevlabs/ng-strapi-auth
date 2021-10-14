import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [],
    imports: [
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
    ],
    exports: [
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
    ]
})
export class AuthMaterialModule { }
