// Angular Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// 3rd Party Vendor Modules
import { NgxMarkdownModule } from '../../lib';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Custom Shared Modules
import { CoreModule } from 'src/app/core/core.module';

// Editor-related Components
import { PostEditorHomeComponent } from 'src/app/post/post-editor/post-editor-home/post-editor-home.component';
import { TagsComponent } from './widgets/tags/tags.component';
import { TitleComponent } from './widgets/title/title.component';
import { EditorComponent } from './widgets/editor/editor.component';
import { ButtonsComponent } from './widgets/buttons/buttons.component';
import { CategoriesComponent } from './widgets/categories/categories.component';
import { ImageUploaderComponent } from './widgets/image-uploader/image-uploader.component';
import { UploadComponent } from './widgets/image-uploader/upload/upload.component';
import { ThumbnailComponent } from './widgets/thumbnail/thumbnail.component';
import { ThumbnailModalComponent } from './widgets/thumbnail-modal/thumbnail-modal.component';

// State Management
import { postEditorReducer } from './store/post-editor.reducer';
import { PostEditorEffects } from './store/post-editor.effects';

// Routing Module
import { PostEditorRoutingModule } from './post-editor-routing.module';

@NgModule({
  declarations: [
    PostEditorHomeComponent,
    TagsComponent,
    TitleComponent,
    EditorComponent,
    ButtonsComponent,
    CategoriesComponent,
    UploadComponent,
    ThumbnailComponent,
    ImageUploaderComponent,
    ThumbnailModalComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    NgxMarkdownModule,
    StoreModule.forFeature('postEditorFeatureKey', postEditorReducer),
    EffectsModule.forFeature([PostEditorEffects]),
    PostEditorRoutingModule,
  ]
})
export class PostEditorModule {
}
