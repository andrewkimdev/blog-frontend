import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownEditorComponent implements OnInit {
  constructor(private fb: FormBuilder) {
  }

  getTags(tags: any) {
    console.log(tags);
  }

  private defaultValidators = [Validators.required, Validators.minLength(6)];

  form = this.fb.group({
    publish: [false],
    title: ['', [...this.defaultValidators, Validators.maxLength(50)]],
    markdown: ['', this.defaultValidators],
  });

  // @ts-ignore
  markdownData$: Observable<string | null> = this.form.get('markdown').valueChanges;

  f(name: string) {
    return this.form.get(name);
  }

  inputControlError(formControlName: string): ValidationErrors | null {
    if (this.f(formControlName)?.touched && this.f(formControlName)?.errors) {
      return this.f(formControlName)?.errors || null;
    }
    return null;
  }

  ngOnInit(): void {
  }
}