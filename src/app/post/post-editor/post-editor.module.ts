// Angular Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// 3rd Party Vendor Modules
import { MaterialModule, NgxMarkdownModule } from 'src/app/shared/lib';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Custom Shared Modules
import { CoreModule } from 'src/app/core/core.module';

// Editor-related Components
import { PostEditorHomeComponent } from 'src/app/post/post-editor/post-editor-home/post-editor-home.component';
import {
  ButtonsComponent,
  EditorComponent,
  ImageUploaderComponent,
  TagsComponent,
  TitleComponent,
  ThumbnailComponent,
  ThumbnailDialogComponent,
  UploadComponent,
} from './widgets';

// State Management
import { postEditorReducer } from './store/post-editor.reducer';
import { PostEditorEffects } from './store/post-editor.effects';

// Routing Module
import { PostEditorRoutingModule } from './post-editor-routing.module';
import { CategoriesModule } from '../category/categories.module';

@NgModule({
  declarations: [
    PostEditorHomeComponent,
    ButtonsComponent,
    EditorComponent,
    ImageUploaderComponent,
    TagsComponent,
    ThumbnailComponent,
    ThumbnailDialogComponent,
    TitleComponent,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    NgxMarkdownModule,
    MaterialModule,
    StoreModule.forFeature('postEditorFeatureKey', postEditorReducer),
    EffectsModule.forFeature([PostEditorEffects]),
    PostEditorRoutingModule,
    CategoriesModule,
  ]
})
export class PostEditorModule {
}
