// Angular Core Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// 3rd Party Vendor Modules
import { ClarityDesignSystemModule, NgxMarkdownModule } from '../lib';

// Custom Shared Modules
import { CoreModule } from 'src/app/core/core.module';

// Application Components
import { DashboardComponent } from './dashboard/dashboard.component';

// Editor-related Components
import { PostEditorComponent } from './post-editor/post-editor.component';
import { TagsComponent } from './post-editor/tags/tags.component';
import { TitleComponent } from './post-editor/title/title.component';
import { EditorComponent } from './post-editor/editor/editor.component';
import { ButtonsComponent } from 'src/app/admin/post-editor/buttons/buttons.component';
import { CategoriesComponent } from './post-editor/categories/categories.component';
import { ImageUploaderComponent } from './post-editor/image-uploader/image-uploader.component';
import { UploadComponent } from './post-editor/image-uploader/upload/upload.component';
import { ThumbnailComponent } from './post-editor/image-uploader/thumbnail/thumbnail.component';

// Routing Module
import { AdminRoutingModule } from './admin-routing.module';
import { ThumbnailModalComponent } from './post-editor/image-uploader/thumbnail-modal/thumbnail-modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PostEditorComponent,
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
    ClarityDesignSystemModule,

    AdminRoutingModule,
  ]
})
export class AdminModule { }
